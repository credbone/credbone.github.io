import React, { useState, useEffect } from "react";
import CustomSlider from "../../components/inputs/slider";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";
import { ArrowDown, Copy } from "lucide-react";
import MenuItem from "../../components/MenuItem";
import { SvgPattern_1 } from "../../components/icon/svgRes";

const generator = ({ size = 100, growth = 6, edges = 6, seed = null } = {}) => {
  var { destPoints, seedValue } = _createPoints(size, growth, edges, seed);
  var path = _createSvgPath(destPoints);
  return { path, seedValue };
};

const _toRad = (deg: number) => deg * (Math.PI / 180.0);

const _divide = (count: number) => {
  var deg = 360 / count;
  return Array(count)
    .fill("a")
    .map((_, i) => i * deg);
};

const _randomDoubleGenerator = (s: number) => {
  var mask = 0xffffffff;
  var m_w = (123456789 + s) & mask;
  var m_z = (987654321 - s) & mask;
  return function () {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
};

const _magicPoint = (value: number, min: number, max: number) => {
  let radius = min + value * (max - min);
  if (radius > max) {
    radius = radius - min;
  } else if (radius < min) {
    radius = radius + min;
  }
  return radius;
};

const _point = (origin: number, radius: number, degree: number) => {
  var x = origin + radius * Math.cos(_toRad(degree));
  var y = origin + radius * Math.sin(_toRad(degree));
  return [Math.round(x), Math.round(y)];
};

const _shuffle = (array: any[]) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

const _createPoints = (
  size: number,
  minGrowth: number,
  edgesCount: number,
  seed: number | null,
) => {
  let outerRad = size / 2;
  let innerRad = minGrowth * (outerRad / 10);
  let center = size / 2;
  let slices = _divide(edgesCount);
  let maxRandomValue = _shuffle([99, 999, 9999, 99999, 999999])[0];
  let id = Math.floor(Math.random() * maxRandomValue);
  let seedValue = seed || id;
  let randVal = _randomDoubleGenerator(seedValue);
  let destPoints: number[][] = [];
  slices.forEach((degree) => {
    let O = _magicPoint(randVal(), innerRad, outerRad);
    let end = _point(center, O, degree);
    destPoints.push(end);
  });
  return { destPoints, seedValue };
};

const _createSvgPath = (points: string | any[]) => {
  let svgPath = "";
  var mid = [
    (points[0][0] + points[1][0]) / 2,
    (points[0][1] + points[1][1]) / 2,
  ];
  svgPath += "M" + mid[0] + "," + mid[1];
  for (var i = 0; i < points.length; i++) {
    var p1 = points[(i + 1) % points.length];
    var p2 = points[(i + 2) % points.length];
    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    svgPath += "Q" + p1[0] + "," + p1[1] + "," + mid[0] + "," + mid[1];
  }
  svgPath += "Z";
  return svgPath;
};






const BlobGenerator: React.FC = () => {
  const [mode, setMode] = useState<"fill" | "stroke">("stroke");
  const [strokeWidth, setStrokeWidth] = useState(10);
  const [blobCount, setBlobCount] = useState(10);

  const [points, setPoints] = useState(12);
  const [growth, setGrowth] = useState(3);
  const [paths, setPaths] = useState<string[]>([""]);




useEffect(() => {
  let current = 3;
  const interval = setInterval(() => {
    current += 1;
    setGrowth(current);
    if (current >= 7) clearInterval(interval);
  }, 120);
  return () => clearInterval(interval);
}, []);

  const generatePaths = (count: number, edges: number, growthVal: number) =>
    Array.from({ length: count }, () => generator({ edges, growth: growthVal }).path);

  useEffect(() => {
    setPaths(generatePaths(blobCount, points, growth));
  }, [points, growth]);

  // Keep path count in sync when blobCount changes without regenerating existing paths
  useEffect(() => {
    setPaths((prev) => {
      if (blobCount > prev.length) {
        const extra = generatePaths(blobCount - prev.length, points, growth);
        return [...prev, ...extra];
      }
      return prev.slice(0, blobCount);
    });
  }, [blobCount]);

  const regenerateBlob = () => {
    setPaths(generatePaths(blobCount, points, growth));
  };

const getPathAttrs = (i: number) => {
  const opacity = mode === "fill" ? 1 - (i / paths.length) * 0.75 : 1;
  const opacityAttr = opacity < 1 ? ` opacity='${opacity.toFixed(2)}'` : "";

  return mode === "fill"
    ? `fill='currentColor'${opacityAttr}`
    : `fill='none' stroke='currentColor' stroke-width='${strokeWidth / 10}'`;
};



  const exportSVG = () => {
    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);
const pathElements = paths
  .map((p, i) => `  <path d='${p}' ${getPathAttrs(i)}/>`)
  .join("\n");

    const svgBlob = new Blob(
      [
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>\n${pathElements}\n</svg>`,
      ],
      { type: "image/svg+xml" },
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(svgBlob);
    link.download = `blob-${currentDateTime}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { addSnackbar } = useSnackbar();

  const copySVGToClipboard = async () => {
const pathElements = paths
  .map((p, i) => `  <path d='${p}' ${getPathAttrs(i)}/>`)
  .join("\n");

    const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>\n${pathElements}\n</svg>`;

    try {
      await navigator.clipboard.writeText(svgContent);
      addSnackbar("SVG copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

const menuItems = [
  { icon: <ArrowDown strokeWidth={1.5} size={20} />, title: "Download", description: "Save blob for later", onClick: exportSVG, },
  { icon: <Copy strokeWidth={1.5} size={20} />, title: "Copy", description: "Paste in Figma or code ...", onClick: copySVGToClipboard, },
];


  return (
    <group
      data-type="grid"
      data-grid-template="280"
      data-gap="30"
      data-align="start"
    >
      <group
        data-border=""
        data-direction="column"
        data-radius="40"
        data-contain=""
        data-elevation="2"
        data-space="30"
        data-gap="30"
      >
<SvgPattern_1/>

        <group>
          <text
            data-weight="700"
            data-wrap="preline"
            data-text-size="large"
            data-ellipsis=""
            data-font-type="hero"
            data-line="1"
          >
            Don't skip your<br></br> soul-blob.
          </text>
        </group>

        <group
      //  data-cast-shadow="2"
          data-justify="center"
          data-animation-name="appear-bottom"
          data-animation-duration="2"
          data-ratio="1:1"
          data-align="center"
        >
          <svg width="256" height="256" viewBox="0 0 100 100">
{paths.map((p, i) => {
const opacity =
  mode === "fill" && paths.length > 1
    ? 1 - ((i + 1) / (paths.length + 1)) * 0.8
    : 1;
  return (
    <path
      key={i}
      data-duration="2.25"
      data-transition-prop="d"
      d={p}
      fill={mode === "fill" ? "currentColor" : "none"}
      stroke={mode === "stroke" ? "currentColor" : "none"}
      strokeWidth={mode === "stroke" ? strokeWidth / 10 : 0}
      opacity={opacity}
    />
  );
})}
          </svg>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="4"
        >
          <text
            data-wrap="wrap"
            data-line="1.3"
            data-length="280"
            data-opacity="50"
          >
            Keep pressing the button until you find a blob you like and export
            it.
          </text>
        </group>

        <group
          data-radius="20"
          data-gap="10"
          data-wrap="no"
          data-animation-name="appear-bottom"
          data-animation-duration="2"
        >
          <Ripple>
            <group
              data-ink-color="main-deep"
              data-space="15"
              data-align="center"
              data-justify="center"
              data-background="main"
              data-color="main-text"
              data-contain=""
              data-interactive=""
              data-radius="15"
              data-cursor="pointer"
              onClick={regenerateBlob}
              data-animation-name="appear-bottom"
              data-animation-duration="3"
            >
              <text>Randomize</text>
            </group>
          </Ripple>

          <Popover
          bottomsheet
            data-space="5"
            data-radius="20"
           
            content={(closePopover, isBottomSheet) => (
              <group
                data-direction="column"
                data-length={isBottomSheet ? undefined : "240"}
                onClick={closePopover}
                data-contain=""
              >


                    {menuItems.map((item, index) => (
                      <group
                       key={item.title}
                        data-name="autoseparation"
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration={2 + index * 0.5}
                      >
                        <separator
                          data-horizontal=""
                          data-margin-horizontal="10"
                          data-opacity="5"
                        ></separator>

                        <MenuItem
                         
                          icon={item.icon}
                          title={item.title}
                          description={item.description}
                          onClick={item.onClick}
                          data-space={isBottomSheet ? "20" : "15"}
                          data-gap={isBottomSheet ? "20" : "15"}
                        />
                      </group>
                    ))}



              </group>
            )}
          >
            <group data-width="auto">
              <Ripple>
                <group
                  data-contain=""
                  data-space="15"
                  data-space-horizontal="25"
                  data-align="center"
                  data-justify="center"
                  data-background="adaptive-gray"
                  data-color="adaptive-gray"
                  data-width="auto"
                  data-interactive=""
                  data-over-color="neutral"
                  data-radius="15"
                  data-cursor="pointer"
                  data-animation-name="appear-bottom"
                  data-animation-duration="4"
                >
                  <text>Export</text>
                </group>
              </Ripple>
            </group>
          </Popover>
        </group>
      </group>

      <group data-direcion="column">
        <group data-space-vertical="30" data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-wrap="preline"
            data-text-size="large"
            data-ellipsis=""
            data-font-type="hero"
            data-line="1"
          >
            Customize
          </text>

          <text data-wrap="wrap" data-length="200" data-opacity="40">
            Configure shape smoothness and edge count.
          </text>
        </group>

        <group data-gap="15">
          <group
            
            data-elevation="2"
            data-radius="25"
            data-contain=""
          >
            <group data-align="center" data-gap="15" data-space="25">
              <group data-width="auto">
                <text>Edges</text>
              </group>
              <separator data-vertical=""></separator>
              <group data-fit="1">
                <CustomSlider
                  start={3}
                  end={12}
                  value={points}
                  onValueChange={(value) => setPoints(value)}
                  trackLeftProps={{ "data-margin-right": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-margin-left": "5", "data-height": "1" }}
                />
              </group>
            </group>

<separator data-horizontal="dotted" data-opacity="20"></separator>

            <group data-align="center" data-gap="15" data-space="25">
              <group data-width="auto">
                <text>Smoothness</text>
              </group>
              <separator data-vertical=""></separator>
              <group data-fit="1">
                <CustomSlider
                  start={2}
                  end={9}
                  value={growth}
                  onValueChange={(value) => setGrowth(value)}
                  trackLeftProps={{ "data-margin-right": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-margin-left": "5", "data-height": "1" }}
                />
              </group>
            </group>

          </group>



              <group
                data-radius="25"
                data-contain=""
                data-elevation="2"
                data-justify="center"

              >
                <group data-align="center" data-gap="15" data-space="25">
                  <group data-width="auto">
                    <text>Amount</text>
                  </group>
                  <separator data-vertical=""></separator>
                  <group data-fit="1">
                    <CustomSlider
                      start={1}
                      end={10}
                      value={blobCount}
                      onValueChange={(value) => setBlobCount(value)}
                      trackLeftProps={{ "data-height": "1" }}
                      trackRightProps={{ "data-opacity": "10", "data-margin-left": "5", "data-height": "1" }}
                    />
                  </group>
                </group>
              </group>

          {/* Mode toggle */}
          <group
            data-radius="25"
            data-contain=""
          
            data-justify="center"

          >
            <group data-align="center" data-gap="15" data-space="20" data-wrap="no">
              <group data-width="auto" data-space="5">
                <text>Blob Style</text>
              </group>
              <separator data-vertical=""></separator>
              <group data-fit="1" data-gap="5" data-background="adaptive-gray" data-space="5" data-radius="20"  data-wrap="no">
                {(["fill", "stroke"] as const).map((m) => (
<Ripple   key={m}>
                    <group
                    data-ink-color="neutral"
                    data-over-color="neutral"
                    key={m}
                   // data-width="auto"
                    data-contain=""
                    data-space="15"
                    data-space-horizontal="20"
                    data-align="center"
                    data-justify="center"
                    data-background={mode === m ? "text" : ""}
                    data-color={mode === m ? "main-background" : ""}
                    data-radius="15"
                    data-cursor="pointer"
                    data-interactive=""
                    onClick={() => setMode(m)}
                  >
                   <text>{m === "fill" ? "Solid" : "Outline"}</text>
                  </group>
</Ripple>
                ))}
              </group>
            </group>
          </group>


              <group


data-opacity={mode === "stroke" ? undefined : "0"}

data-translate-vertical={mode === "stroke" ? undefined : "50%"}

data-pointer-event={mode === "stroke" ? undefined : "none"}

data-duration=".125"

              data-transition-behavior="allow-discrete"
                data-radius="25"
                data-contain=""
                data-elevation="2"
                data-justify="center"

              >
                <group data-align="center" data-gap="15" data-space="25">
                  <group data-width="auto">
                    <text>Stroke Width</text>
                  </group>
                  <separator data-vertical=""></separator>
                  <group data-fit="1">
                    <CustomSlider
                      start={1}
                      end={20}
                      value={strokeWidth}
                      onValueChange={(value) => setStrokeWidth(value)}
                      trackLeftProps={{ "data-height": "1" }}
                      trackRightProps={{ "data-opacity": "10", "data-margin-left": "5", "data-height": "1" }}
                    />
                  </group>
                </group>
              </group>




        </group>
      </group>
    </group>
  );
};

export default BlobGenerator;