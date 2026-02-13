import React, { useEffect, useState } from "react";
import Tooltip from "../../components/tooltip";
import { HexColorPicker } from "react-colorful";
import Popover from "../../components/popover";
import { isMobile } from "react-device-detect";
import Ripple from "../../components/Ripple";
import { Minus, Plus, Trash, X } from "lucide-react";
import CustomSlider from "../../components/inputs/slider";

type InterpolationMethod = "rgb" | "lrgb" | "lab" | "via";
type DisplayMode = "gradient" | "steps";



const defaultColors = ["#401cce", "#ffbb00"];
const defaultSteps = 8;
const defaultMethod = "lab";
const defaultDisplayMode = "steps";





const ColorMixer: React.FC = () => {
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [steps, setSteps] = useState(defaultSteps);
  const [method, setMethod] = useState<InterpolationMethod>(defaultMethod);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(defaultDisplayMode);

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
    );
  };

  const srgbToLinear = (c: number): number => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const linearToSrgb = (c: number): number => {
    const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return v * 255;
  };

  const rgbToLab = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    let rLinear = srgbToLinear(r);
    let gLinear = srgbToLinear(g);
    let bLinear = srgbToLinear(b);

    let x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
    let y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175;
    let z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041;

    x = x / 0.95047;
    y = y / 1.0;
    z = z / 1.08883;

    const f = (t: number) =>
      t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;

    const fx = f(x);
    const fy = f(y);
    const fz = f(z);

    const L = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bVal = 200 * (fy - fz);

    return [L, a, bVal];
  };

  const labToRgb = (
    L: number,
    a: number,
    b: number,
  ): [number, number, number] => {
    const fy = (L + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;

    const finv = (t: number) =>
      t > 0.206897 ? Math.pow(t, 3) : (t - 16 / 116) / 7.787;

    let x = finv(fx) * 0.95047;
    let y = finv(fy) * 1.0;
    let z = finv(fz) * 1.08883;

    let rLinear = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    let gLinear = x * -0.969266 + y * 1.8760108 + z * 0.041556;
    let bLinear = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

    const rSrgb = linearToSrgb(rLinear);
    const gSrgb = linearToSrgb(gLinear);
    const bSrgb = linearToSrgb(bLinear);

    return [
      Math.max(0, Math.min(255, rSrgb)),
      Math.max(0, Math.min(255, gSrgb)),
      Math.max(0, Math.min(255, bSrgb)),
    ];
  };

  const interpolateRgb = (c1: string, c2: string, steps: number): string[] => {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);
    const colors: string[] = [];

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const r = r1 + (r2 - r1) * t;
      const g = g1 + (g2 - g1) * t;
      const b = b1 + (b2 - b1) * t;
      colors.push(rgbToHex(r, g, b));
    }

    return colors;
  };

  const interpolateLrgb = (c1: string, c2: string, steps: number): string[] => {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);

    const lr1 = srgbToLinear(r1);
    const lg1 = srgbToLinear(g1);
    const lb1 = srgbToLinear(b1);

    const lr2 = srgbToLinear(r2);
    const lg2 = srgbToLinear(g2);
    const lb2 = srgbToLinear(b2);

    const colors: string[] = [];

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const lr = lr1 + (lr2 - lr1) * t;
      const lg = lg1 + (lg2 - lg1) * t;
      const lb = lb1 + (lb2 - lb1) * t;

      const r = linearToSrgb(lr);
      const g = linearToSrgb(lg);
      const b = linearToSrgb(lb);

      colors.push(rgbToHex(r, g, b));
    }

    return colors;
  };

  const interpolateLab = (c1: string, c2: string, steps: number): string[] => {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);

    const [L1, a1, b1Lab] = rgbToLab(r1, g1, b1);
    const [L2, a2, b2Lab] = rgbToLab(r2, g2, b2);

    const colors: string[] = [];

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const L = L1 + (L2 - L1) * t;
      const a = a1 + (a2 - a1) * t;
      const bLab = b1Lab + (b2Lab - b1Lab) * t;

      const [r, g, b] = labToRgb(L, a, bLab);
      colors.push(rgbToHex(r, g, b));
    }

    return colors;
  };


  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
  setHasInteracted(true);
}, [colors, steps, method, displayMode]);

  const hasChanged = 
  JSON.stringify(colors) !== JSON.stringify(defaultColors) ||
  steps !== defaultSteps ||
  method !== defaultMethod ||
  displayMode !== defaultDisplayMode;


const resetValues = () => {
  setColors(defaultColors);
  setSteps(defaultSteps);
  setDisplayMode(defaultDisplayMode);
  setMethod(defaultMethod);
};



  const interpolateVia = (c1: string, c2: string, steps: number): string[] => {
    const midColor = "#808080";
    const half = Math.ceil(steps / 2);
    const firstHalf = interpolateLab(c1, midColor, half);
    const secondHalf = interpolateLab(midColor, c2, steps - half + 1).slice(1);
    return [...firstHalf, ...secondHalf];
  };

  const interpolatePair = (c1: string, c2: string, steps: number): string[] => {
    switch (method) {
      case "rgb":
        return interpolateRgb(c1, c2, steps);
      case "lrgb":
        return interpolateLrgb(c1, c2, steps);
      case "lab":
        return interpolateLab(c1, c2, steps);
      case "via":
        return interpolateVia(c1, c2, steps);
      default:
        return [];
    }
  };

  const getGradient = (): string[] => {
    if (colors.length < 2) return [];

    const segments = colors.length - 1;
    const stepsPerSegment = Math.floor(steps / segments);
    const remainder = steps % segments;

    const allColors: string[] = [];

    for (let i = 0; i < segments; i++) {
      const segmentSteps = stepsPerSegment + (i < remainder ? 1 : 0);
      const segmentColors = interpolatePair(
        colors[i],
        colors[i + 1],
        segmentSteps + 1,
      );

      if (i === 0) {
        allColors.push(...segmentColors);
      } else {
        allColors.push(...segmentColors.slice(1));
      }
    }

    return allColors.slice(0, steps);
  };

  const getCssGradient = (): string => {
    if (colors.length < 2) return "";
    
    // Use the same steps value from the slider
    const segments = colors.length - 1;
    const stepsPerSegment = Math.floor(steps / segments);
    const remainder = steps % segments;

    const allColors: string[] = [];

    for (let i = 0; i < segments; i++) {
      const segmentSteps = stepsPerSegment + (i < remainder ? 1 : 0);
      const segmentColors = interpolatePair(
        colors[i],
        colors[i + 1],
        segmentSteps + 1,
      );

      if (i === 0) {
        allColors.push(...segmentColors);
      } else {
        allColors.push(...segmentColors.slice(1));
      }
    }

    const gradientColors = allColors.slice(0, steps);
    return `linear-gradient(to right, ${gradientColors.join(", ")})`;
  };

  const addColor = () => {
    if (colors.length < 4) {
      const lastColor = colors[colors.length - 1];
      const [r, g, b] = hexToRgb(lastColor);
      const [L, a, bLab] = rgbToLab(r, g, b);

      // Rotate hue by ~30 degrees in LAB space
      const angle = Math.PI / 4; // 30 degrees
      const aNew = a * Math.cos(angle) - bLab * Math.sin(angle);
      const bLabNew = a * Math.sin(angle) + bLab * Math.cos(angle);

      const [rNew, gNew, bNewRgb] = labToRgb(L, aNew, bLabNew);
      const newColor = rgbToHex(rNew, gNew, bNewRgb);
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const incrementSteps = () => {
    if (steps < 12) {
      setSteps(steps + 1);
    }
  };

  const decrementSteps = () => {
    if (steps > 3) {
      setSteps(steps - 1);
    }
  };

  const gradient = getGradient();

  return (
    <group data-gap="20" data-align="start" data-direction="column">




      <group
        data-elevation="2"
        data-radius="40"
        data-direction="column"
        data-contain=""
        data-length="600"
      >
        <group
          data-space="30"
          data-width="auto"
          data-gap="30"
          data-direction="column"
          data-align="start"
        >
<group data-align="start" data-wrap="no">


          <group data-gap="10" >
            <group>
              <text
                data-weight="700"
                data-wrap="preline"
                data-text-size="large"
                data-ellipsis=""
                data-font-type="hero"
                data-line="1"
              >
                Interpolation Method
              </text>
            </group>

            <text data-wrap="wrap" data-length="240" data-opacity="40">
            Choose a method to control how colors blend between points.
            </text>
          </group>

          {hasChanged && (
  <group 
  data-space="15"
    data-width="auto"
    data-interactive=""
    data-over-color="neutral"
    data-radius="15"
    data-cursor="pointer"
    data-animation-name="appear-top"
    data-fill-mode="forwards"
    data-animation-duration="2.25"
    onClick={resetValues}
  >
    <text>Reset</text>
  </group>
)}

</group>

          <group
            data-width="auto"
            data-gap="5"
          >
            {(["rgb", "lrgb", "lab", "via"] as InterpolationMethod[]).map(
              (m) => (
                <group
                  key={m}
                  data-width="auto"
                  data-name="autoseparation"
                  data-align="center"
                  data-wrap="no"
                  data-selected={method === m ? "true" : ""}
                >
                  <group
                    data-width="auto"
                    data-interactive=""
                    data-radius="15"
                    data-space="15"
                    data-duration=".225"
                    data-transition-prop="padding"
                    data-space-horizontal={method === m ? "30" : "20"}
                    data-cursor="pointer"
                    data-over-color="neutral"
                    onClick={() => setMethod(m)}
                    data-background={method === m ? "text" : "adaptive-gray"}
                    data-color={method === m ? "main-background" : ""}
                  >
                    <text
                      data-text-transform="uppercase"
                      data-opacity={method === m ? "100" : "60"}
                    >
                      {m}
                    </text>
                  </group>
                </group>
              ),
            )}
          </group>
        </group>

        <separator data-horizontal="dotted"></separator>
        <group
          data-space="30"
          data-width="auto"
          data-wrap="no"
          data-gap="10"
          data-align="center"
        >
          {colors.map((color, index) => (
            <group
              key={index}
              data-align="center"
              data-width="auto"
              data-wrap="no"
              data-gap="5"
              data-animation-name="zoom-in"
              data-animation-duration="2"
            >
              <group data-width="auto" data-align="center">
                <Popover
                  data-space="5"
                  data-radius="0"
                  data-elevation="0"
                  data-contain="visible"
                  data-background="none"
                  content={(closePopover) => (
                    <group
                      data-width="auto"
                      data-direction="column"
                      data-gap="5"
                    >
                      <group
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="2.25"
                        data-elevation="2"
                        data-index="2"
                        data-background="context"
                        data-space="5"
                        data-radius="20"
                        data-direction="column"
                        data-name="cred-react-colorful"
                        data-width="auto"
                        data-gap="5"
                      >
                        <HexColorPicker
                          color={color}
                          onChange={(newColor) => updateColor(index, newColor)}
                        />
                      </group>

                      {colors.length > 2 && (
                        <group
                          data-elevation="2"
                          data-background="context"
                          data-space="5"
                          data-radius="20"
                          data-animation-name="appear-top"
                          data-fill-mode="backwards"
                          data-animation-duration="3.25"
                        >
                          <Ripple>
                            <group
                              data-contain=""
                              data-ink-color="neutral"
                              data-space="15"
                              data-interactive=""
                              data-over-color="neutral"
                              data-cursor="pointer"
                              data-radius="15"
                              data-align="center"
                              data-wrap="no"
                              data-justify="center"
                              data-gap="10"
                              onClick={() => {
                                removeColor(index);
                                closePopover();
                              }}
                            >
                              <group data-width="auto">
                                <text>Remove</text>
                              </group>
                            </group>
                          </Ripple>
                        </group>
                      )}
                    </group>
                  )}
                >
<group>
  <Ripple>
                      <group
                      data-ink-color="neutral"
                      data-contain=""
                    data-width="auto"
                    data-over-color="neutral"
                    data-space="10"
                    data-interactive=""
                    data-cursor="pointer"
                    data-align="center"
                    data-wrap="no"
                    data-radius="30"
                  >
                    <group
                      data-interact=""
                      data-length="30"
                      data-height="30"
                      data-radius="30"
                      data-border="outline-soft"
                      style={{ backgroundColor: color }}
                    ></group>
                  </group>
  </Ripple>
</group>
                </Popover>
              </group>
            </group>
          ))}
          {colors.length < 4 && (
<>

<Ripple>
              <group
              data-ink-color="neutral"
              data-contain=""
              data-width="auto"
              data-over-color="neutral"
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="30"
              onClick={addColor}
              data-animation-name="zoom-in"
              data-animation-duration="3"
            >
              <group data-interact="" data-width="auto">
                <Plus size={20} />
              </group>
            </group>
</Ripple>
</>
          )}
        </group>

        <separator data-horizontal="dotted"></separator>
        <group
          data-background="context"
          data-width="auto"
          data-space="30"
          data-gap="30"
          data-direction="column"
          data-align="start"
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
                Preview your
                <br /> perfect mix
              </text>
            </group>

          <group data-wrap="no">


            <group
            //  data-width="auto"
            
              data-wrap="no"
              data-gap="10"
              data-align="start"
            >



<Ripple>
                <group
                data-contain=""

               
               
                // data-animation-name="appear-top-small"
                // data-fill-mode="backwards"
                // data-animation-duration="3"
                data-space-vertical="15"
                data-space-horizontal="20"
                data-align="center"
                data-justify="center"
                data-background="adaptive-gray"
                data-color="adaptive-gray"
                data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="15"
               // data-cursor="pointer"
              >
                <text data-opacity="30">Export</text>
              </group>
</Ripple>


          <Ripple>
                <group
                data-gap="15"
                data-wrap="no"
                data-width="auto"
                data-contain=""
                data-space="15"
                data-radius="15"
                data-background="adaptive-gray"
                data-interactive=""
                data-over-color="neutral"
                data-cursor="pointer"
                onClick={() => setDisplayMode(displayMode === "steps" ? "gradient" : "steps")}
              >
                <group data-width="auto">
                  <text data-ellipsis="" data-opacity="40">
                    Mode
                  </text>
                </group>
                <separator data-vertical="" data-height="autofit"></separator>
                <group
                  data-align="center"
                  data-justify="center"
                  data-width="auto"
                  data-contain=""
                >
                  <text
                    data-ellipsis=""
                    data-transition-prop="font-size"
                    data-duration="2"
                    data-text-size={displayMode === "gradient" ? "" : "0"}
                  >
                    Gradient
                  </text>
                  <text
                    data-ellipsis=""
                    data-transition-prop="font-size"
                    data-duration="2"
                    data-text-size={displayMode === "steps" ? "" : "0"}
                  >
                    Steps
                  </text>
                </group>
              </group>
          </Ripple>

  
            </group>
          </group>

          {displayMode === "steps" ? (
            <group
              data-wrap="no"
             
              data-contain=""
              data-width="auto"
            
               data-radius="15"
            >
              {gradient.map((color, index) => (
                <group key={index} data-length="45" data-fit="1">
                  <Tooltip distance={-10} delay={300} content={color}>
                    <group
                  
                      data-interactive=""
                      data-over-color="neutral"
                      data-contain=""
                      data-height="100"
                      data-shrink="no"
                      data-direction="column"
                      data-justify="end"
                      data-wrap="no"
                      data-origin="left"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </Tooltip>
                </group>
              ))}
            </group>
          ) : (
            <group
              data-radius="15"
              data-contain=""
              data-height="100"
              style={{
                background: getCssGradient(),
              }}
            />
          )}

          <group data-align="center" data-gap="15">
            <group data-width="auto">
              <group data-width="auto">
                <text>Step Count</text>
              </group>
            </group>

            <separator data-vertical=""></separator>

            <group data-fit="1">
              <CustomSlider
                start={3}
                end={12}
                value={steps}
                onValueChange={(value) => setSteps(value)}
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
  );
};

export default ColorMixer;