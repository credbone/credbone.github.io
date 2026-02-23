import React, { useState, useEffect } from "react";
import CustomSlider from "../../components/inputs/slider";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";

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
  const [points, setPoints] = useState(6);
  const [growth, setGrowth] = useState(6);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(generator({ edges: points, growth }).path);
  }, [points, growth]);

  const regenerateBlob = () => {
    setPath(generator({ edges: points, growth }).path);
  };

// const regenerateBlob = () => {
//   const newPoints = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
//   const newGrowth = Math.floor(Math.random() * (9 - 2 + 1)) + 2;
//   setPoints(newPoints);
//   setGrowth(newGrowth);
//   setPath(generator({ edges: newPoints, growth: newGrowth }).path);
// };


  const exportSVG = () => {
    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);
    const svgBlob = new Blob(
      [
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <path d='${path}' fill='currentColor'/>
      </svg>`,
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
    const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <path d='${path}' fill='currentColor'/>
  </svg>`;

    try {
      await navigator.clipboard.writeText(svgContent);
      addSnackbar("SVG copied to clipboard", 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

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
        //  data-space="10"
        data-contain=""
        data-elevation="2"
    
        data-space="30"
        data-gap="30"
      >
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
          data-justify="center"
          data-animation-name="appear-bottom"
          data-animation-duration="2"
        >
          <svg width="256" height="256" viewBox="0 0 100 100">
            <path
              data-duration="2.25"
              data-transition-prop="d"
              d={path}
              fill="currentColor"
            />
          </svg>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="4"
        >
          <text
            data-wrap="wrap"
            //data-space="20"
            data-line="1.3"
            data-length="280"
            data-opacity="50"
          >
            Keep pressing the button until you find a blob you like and export
            it.
          </text>
        </group>

        <group
        //  data-background="main-background"
          data-radius="20"
          data-gap="10"
          data-wrap="no"
          data-animation-name="appear-bottom"
          data-animation-duration="2"
        >
          <Ripple>
            <group
              data-ink-color="main-dark"
              data-space="15"
              data-align="center"
              data-justify="center"
              data-background="main"
              data-color="main-text"
              data-contain=""
              data-interactive=""
              //   data-over-color="neutral"
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
            data-space="5"
            data-radius="20"
            content={(closePopover) => (
              <group
                data-direction="column"
                data-length="240"
                onClick={closePopover}
              >
                {/* <group
                  data-space="15"
                  data-width="auto"
                  data-interactive=""
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={exportSVG}
                  data-weight="700"
                  
                >
                  <text>Download</text>
                </group>

                <group
                  data-space="15"
                  data-width="auto"
                  data-interactive=""
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={copySVGToClipboard}
                >
                  <text>Copy</text>
                </group> */}

                <group
                  onClick={exportSVG}
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="2.75"
                  data-name="autoseparation"
                >
                  <group
                    data-space="15"
                    data-align="center"
                    data-gap="15"
                    data-interactive=""
                    data-radius="15"
                    data-cursor="pointer"
                  >
                    <group data-direction="column" data-width="auto">
                      <text data-weight="700">Download</text>
                      <text data-opacity="30">Save blob for later</text>
                    </group>
                  </group>
                </group>
                <group
                  onClick={copySVGToClipboard}
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="3.25"
                  data-name="autoseparation"
                >
                  <separator
                    data-horizontal=""
                    data-margin-horizontal="10"
                    data-opacity="5"
                  ></separator>
                  <group
                    data-space="15"
                    data-align="center"
                    data-gap="15"
                    data-interactive=""
                    data-radius="15"
                    data-cursor="pointer"
                  >
                    <group data-direction="column" data-width="auto">
                      <text data-weight="700">Copy</text>
                      <text data-opacity="30">Paste in Figma or code ...</text>
                    </group>
                  </group>
                </group>
              </group>
            )}
          >
            <group data-width="auto">
              <Ripple>
                <group
                  data-contain=""
                  data-space="15"
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
                  //  data-position="right"
                >
                  <text>Export</text>
                </group>
              </Ripple>
            </group>
          </Popover>
        </group>
      </group>

      <group data-direcion="column" >
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

          <text
            data-wrap="wrap"

            data-length="200"
            data-opacity="40"
          >
           Configure shape smoothness and edge count.
          </text>
        </group>

        <group data-gap="15">
          <group
            data-border="outline"
            data-elevation="2"
            data-radius="25"
            data-contain=""


          >
            <group data-align="center" data-gap="15" data-space="25">
              <group data-width="auto">
                <group data-width="auto">
                  <text>Edges</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  start={3}
                  end={12}
                  value={points}
                  onValueChange={(value) => setPoints(value)}

                  trackLeftProps={{
                    "data-margin-right": "0",
                    "data-height": "1",
                  }}
                  trackRightProps={{
                    "data-opacity": "10",
                    "data-margin-left": "5",
                    "data-height": "1",
                  }}
                />
              </group>
            </group>
          </group>

          <group
            data-border="outline"
            data-elevation="2"
            data-radius="25"
            data-contain=""




          >
            <group data-align="center" data-gap="15" data-space="25">
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group>
                  <text>Smoothness</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  start={2}
                  end={9}
         
                  value={growth}
                  onValueChange={(value) => setGrowth(value)}
                  trackLeftProps={{
                    "data-margin-right": "0",
                    "data-height": "1",
                  }}
                  trackRightProps={{
                    "data-opacity": "10",
                    "data-margin-left": "5",
                    "data-height": "1",
                  }}
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
