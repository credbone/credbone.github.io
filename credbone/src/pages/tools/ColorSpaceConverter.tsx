import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";
import { Copy, Download } from "lucide-react";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";

const ColorSpaceConverter: React.FC = () => {
  const [color, setColor] = useState("#401cce");
  const { addSnackbar } = useSnackbar();

  // Conversion functions
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

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [h * 360, s, l];
  };

  const rgbToHsv = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [h * 360, s, v];
  };

  const rgbToHsi = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const intensity = (r + g + b) / 3;
    const min = Math.min(r, g, b);
    const s = intensity === 0 ? 0 : 1 - min / intensity;

    let h = 0;
    if (s !== 0) {
      const numerator = 0.5 * (r - g + (r - b));
      const denominator = Math.sqrt((r - g) ** 2 + (r - b) * (g - b));
      if (denominator !== 0) {
        h = Math.acos(numerator / denominator);
        if (b > g) {
          h = 2 * Math.PI - h;
        }
      }
    }

    return [(h * 180) / Math.PI, s, intensity];
  };

  const srgbToLinear = (c: number): number => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  const rgbToLch = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    const [L, a, bLab] = rgbToLab(r, g, b);
    const c = Math.sqrt(a * a + bLab * bLab);
    let h = (Math.atan2(bLab, a) * 180) / Math.PI;
    if (h < 0) h += 360;
    return [L, c, h];
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

  const rgbToTemperature = (r: number, g: number, b: number): number => {
    // McCamy's approximation
    const n =
      (0.23881 * r + 0.25499 * g - 0.58291 * b) /
      (0.11109 * r - 0.85406 * g + 0.52289 * b);
    return 449 * n * n * n + 3525 * n * n + 6823.3 * n + 5520.33;
  };

  const rgbToGl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number, number] => {
    return [r / 255, g / 255, b / 255, 1.0];
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addSnackbar(`${label} copied`, 1000);
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  const hslToRgb = (
    h: number,
    s: number,
    l: number,
  ): [number, number, number] => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return (
      "#" +
      [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
    );
  };

  const generateAnalogous = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [];
    for (let i = 0; i < 6; i++) {
      const newH = (h + i * 10) % 360;
      const [newR, newG, newB] = hslToRgb(newH, s, l);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const generateMonochromatic = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [];
    const satVariations = [s, s * 0.7, s * 0.4, s * 0.2, s * 0.5, s * 0.9];

    for (let i = 0; i < 6; i++) {
      const newL = 0.2 + i * 0.15;
      const [newR, newG, newB] = hslToRgb(h, satVariations[i], newL);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const generateSplitComplementary = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [baseColor];
    const comp1 = (h + 150) % 360;
    const comp2 = (h + 210) % 360;

    const [r1, g1, b1] = hslToRgb(comp1, s, l);
    colors.push(rgbToHex(r1, g1, b1));

    const [r2, g2, b2] = hslToRgb(comp2, s, l);
    colors.push(rgbToHex(r2, g2, b2));

    return colors;
  };

  const generateTriad = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [];
    for (let i = 0; i < 4; i++) {
      const newH = (h + i * 120) % 360;
      const newS = i === 0 ? s : s * (0.7 + i * 0.1);
      const [newR, newG, newB] = hslToRgb(newH, newS, l);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const generateTetrad = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [];
    const offsets = [0, 90, 180, 270];

    for (let i = 0; i < 4; i++) {
      const newH = (h + offsets[i]) % 360;
      const newL = i < 2 ? l : Math.min(l + 0.1, 0.9);
      const [newR, newG, newB] = hslToRgb(newH, s, newL);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const generatePolyad = (baseColor: string): string[] => {
    const [r, g, b] = hexToRgb(baseColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    const colors = [];
    for (let i = 0; i < 6; i++) {
      const newH = (h + i * 60) % 360;
      const newL = 0.3 + i * 0.1;
      const [newR, newG, newB] = hslToRgb(newH, s, newL);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const exportHarmonySVG = (harmonyName: string, colors: string[]) => {
    const width = 100;
    const height = 100;
    const rectWidth = width;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * colors.length}" height="${height}" viewBox="0 0 ${width * colors.length} ${height}">\n`;

    colors.forEach((color, index) => {
      svgContent += `  <rect x="${index * width}" y="0" width="${rectWidth}" height="${height}" fill="${color}"/>\n`;
    });

    svgContent += `</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${harmonyName.toLowerCase()}-harmony.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addSnackbar(`${harmonyName} SVG downloaded`, 1000);
  };

  // Get all conversions
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [hHsv, sHsv, v] = rgbToHsv(r, g, b);
  const [hHsi, sHsi, i] = rgbToHsi(r, g, b);
  const [lch_L, lch_C, lch_H] = rgbToLch(r, g, b);
  const [lab_L, lab_a, lab_b] = rgbToLab(r, g, b);
  const temp = rgbToTemperature(r, g, b);
  const [gl_r, gl_g, gl_b, gl_a] = rgbToGl(r, g, b);
  const numericRgb = (r << 16) | (g << 8) | b;

  const getAdaptiveTextColor = (hexColor: string): string => {
    const [r, g, b] = hexToRgb(hexColor);
    const [h, s, l] = rgbToHsl(r, g, b);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return monochromatic dark or light based on luminance
    if (luminance > 0.5) {
      // Background is light, return dark monochromatic
      const [darkR, darkG, darkB] = hslToRgb(h, s * 0.3, 0.15);
      return rgbToHex(darkR, darkG, darkB);
    } else {
      // Background is dark, return light monochromatic
      const [lightR, lightG, lightB] = hslToRgb(h, s * 0.2, 0.92);
      return rgbToHex(lightR, lightG, lightB);
    }
  };

  const colorSpaces = [
    {
      label: "HEX",
      value: color.toUpperCase(),
      copyValue: color.toUpperCase(),
    },
    {
      label: "RGB",
      value: `${r}, ${g}, ${b}`,
      copyValue: `${r}, ${g}, ${b}`,
    },
    {
      label: "HSL",
      value: `${h.toFixed(2)}, ${(s * 100).toFixed(0)}, ${(l * 100).toFixed(2)}, ${(l * 100).toFixed(0)}`,
      copyValue: `${h.toFixed(2)}, ${(s * 100).toFixed(0)}, ${(l * 100).toFixed(2)}, ${(l * 100).toFixed(0)}`,
    },
    {
      label: "HSV",
      value: `${hHsv.toFixed(2)}, ${(sHsv * 100).toFixed(0)}, ${(v * 100).toFixed(2)}, ${(v * 100).toFixed(0)}`,
      copyValue: `${hHsv.toFixed(2)}, ${(sHsv * 100).toFixed(0)}, ${(v * 100).toFixed(2)}, ${(v * 100).toFixed(0)}`,
    },
    {
      label: "HSI",
      value: `${hHsi.toFixed(2)}, ${(sHsi * 100).toFixed(0)}, ${(i * 100).toFixed(2)}`,
      copyValue: `${hHsi.toFixed(2)}, ${(sHsi * 100).toFixed(0)}, ${(i * 100).toFixed(2)}`,
    },
    {
      label: "LCH",
      value: `${lch_L.toFixed(2)}, ${lch_C.toFixed(2)}, ${lch_H.toFixed(2)}`,
      copyValue: `${lch_L.toFixed(2)}, ${lch_C.toFixed(2)}, ${lch_H.toFixed(2)}`,
    },
    {
      label: "LAB",
      value: `${lab_L.toFixed(2)}, ${lab_a.toFixed(2)}, ${lab_b.toFixed(2)}`,
      copyValue: `${lab_L.toFixed(2)}, ${lab_a.toFixed(2)}, ${lab_b.toFixed(2)}`,
    },
    {
      label: "Numeric RGB",
      value: numericRgb.toString(),
      copyValue: numericRgb.toString(),
    },
    {
      label: "Temperature",
      value: Math.round(temp).toString(),
      copyValue: Math.round(temp).toString(),
    },
    {
      label: "GL",
      value: `${gl_r.toFixed(2)}, ${gl_g.toFixed(2)}, ${gl_b.toFixed(2)}, ${gl_a.toFixed(2)}`,
      copyValue: `${gl_r.toFixed(2)}, ${gl_g.toFixed(2)}, ${gl_b.toFixed(2)}, ${gl_a.toFixed(2)}`,
    },
  ];

  const cssValues = [
    {
      label: "RGB",
      value: `rgb(${r}, ${g}, ${b})`,
    },
    {
      label: "Percent RGB",
      value: `rgb(${((r / 255) * 100).toFixed(0)}%, ${((g / 255) * 100).toFixed(0)}%, ${((b / 255) * 100).toFixed(0)}%)`,
    },
    {
      label: "HSL",
      value: `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`,
    },
    {
      label: "HSV",
      value: `hsv(${hHsv.toFixed(0)}, ${(sHsv * 100).toFixed(0)}%, ${(v * 100).toFixed(0)}%)`,
    },
  ];

  // Determine text contrast

  return (
    <group data-gap="30" data-align="start" data-direction="column">
      <group
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-align="start"
      >
        {/* Color Preview Card */}

        <group>
          <group
            data-radius="30"
            data-interactive=""
            data-contain=""
            data-border=""
            data-elevation="2"
            data-direction="column"
            style={{
              backgroundColor: color,
              color: getAdaptiveTextColor(color),
            }}
            data-cursor="pointer"
          >
            <group data-direction="column" data-gap="30">
              <Popover
                data-space="0"
                data-radius="0"
                data-background="none"
                data-contain="visible"
                data-elevation="none"
                content={(closePopover) => (
                  <group data-width="auto" data-direction="column" data-gap="5">
                    <group
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration="2.25"
                      data-elevation="2"
                      data-background="context"
                      data-space="5"
                      data-radius="20"
                      data-direction="column"
                      data-name="cred-react-colorful"
                      data-width="auto"
                      data-gap="5"
                    >
                      <HexColorPicker color={color} onChange={setColor} />
                    </group>
                  </group>
                )}
              >
                <group
                  data-position="absolute"
                  data-index="1"
                  data-height="fit"
                  data-left="0"
                  data-top="0"
                ></group>
              </Popover>

              <group data-space="30" data-gap="30" data-interactive="">
                <group data-gap="10">
                  <text
                    data-weight="700"
                    data-text-size="large"
                    data-font-type="hero"
                  >
                    Select your color
                  </text>

                  <text data-wrap="wrap" data-length="240" data-opacity="40">
                    Choose a method to control how colors blend between points.
                  </text>
                </group>

                <group>
                  <HexColorInput
                    data-index="2"
                    data-font-feature="tnum"
                    style={{
                      color: color,
                      backgroundColor: getAdaptiveTextColor(color),
                    }}
                    data-text-transform="uppercase"
                    data-length="content"
                    color={color}
                    onChange={setColor}
                    data-name="input-reset"
                    data-space="15"
                    data-radius="15"
                    data-text-align="center"
                    name="hex-color-input"
                    data-background="adaptive-gray"
                  />
                </group>
              </group>
            </group>
          </group>

          {/* Color Combinations Section */}
          <group data-direction="column" >
            <group data-space="30" data-gap="10">
              <text
                data-weight="700"
                data-text-size="large"
                data-font-type="hero"
              >
                Color Combinations
              </text>
              <text data-wrap="wrap" data-length="240" data-opacity="40">Choose a method to control how colors blend between points.</text>
            </group>

            <group data-direction="column" data-gap="20">
              {[
                { name: "Analogous", colors: generateAnalogous(color) },
                { name: "Monochromatic", colors: generateMonochromatic(color) },
                {
                  name: "Splitcomponent",
                  colors: generateSplitComplementary(color),
                },
                { name: "Triad", colors: generateTriad(color) },
                { name: "Tetrad", colors: generateTetrad(color) },
                { name: "Polyad", colors: generatePolyad(color) },
              ].map((harmony, harmonyIndex) => (
                <group
                  key={harmony.name}
                  data-direction="column"
                  data-gap="10"
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration={`${2 + harmonyIndex * 0.5}`}
                 
                >
          

                  <group data-space="5" data-elevation="2" data-background="context" data-radius="20">
                    <group
                      data-wrap="no"
                      data-type="grid"
                      data-grid-template="60"
                      data-contain=""
                      data-radius="15"

                    >
                      {harmony.colors.map((harmonyColor, colorIndex) => (
                        <group key={colorIndex} data-ratio="1:1">
                          <Ripple>
                            <group
                              data-contain=""
                              data-ink-color="neutral"
                              //    data-height="50"
                              // data-radius="15"
                              data-interactive=""
                              data-cursor="pointer"
                              onClick={() =>
                                copyToClipboard(
                                  harmonyColor.toUpperCase(),
                                  harmonyColor.toUpperCase(),
                                )
                              }
                              style={{ backgroundColor: harmonyColor }}
                            />
                          </Ripple>
                        </group>
                      ))}
                    </group>
                  </group>


        <group data-align="center" data-gap="10" data-space-horizontal="30">
                    <group data-width="auto">
                      <text data-opacity="60">{harmony.name}</text>
                    </group>

                    <group data-width="auto">
                      <Ripple>
                        <group
                          data-contain=""
                          data-ink-color="neutral"
                          data-width="auto"
                          data-space="10"
                          data-interactive=""
                          data-over-color="neutral"
                          data-cursor="pointer"
                          data-radius="10"
                          onClick={() =>
                            exportHarmonySVG(harmony.name, harmony.colors)
                          }
                        >
                         <text>Export</text>
                        </group>
                      </Ripple>
                    </group>
                  </group>


                </group>
              ))}
            </group>
          </group>
        </group>

        {/* Color Spaces Section */}
        <group
          data-space="30"
          data-direction="column"
          data-gap="20"
          data-border=""
        >
          <group>
            <text
              data-weight="700"
              data-text-size="large"
              data-font-type="hero"
            >
              Color Spaces
            </text>
          </group>

          <group data-direction="column" data-gap="5">
            {colorSpaces.map((space, index) => (
              <group
                key={index}
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration={`${2 + index * 0.5}`}
              >
                <Ripple>
                  <group
                    data-contain=""
                    data-ink-color="neutral"
                    data-space="15"
                    data-space-horizontal="20"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="15"
                    data-cursor="pointer"
                    data-align="center"
                    data-gap="15"
                    onClick={() =>
                      copyToClipboard(space.copyValue, space.label)
                    }
                  >
                    <group data-width="auto" data-length="120">
                      <text data-weight="700" data-opacity="60">
                        {space.label}
                      </text>
                    </group>

                    <group data-fit="1">
                      <text data-font-feature="tnum" data-ellipsis="">
                        {space.value}
                      </text>
                    </group>

                    <group data-width="auto">
                      <Copy size={16} opacity={0.4} />
                    </group>
                  </group>
                </Ripple>
              </group>
            ))}
          </group>
        </group>

        {/* CSS Values Section */}
        <group
          data-space="30"
          data-direction="column"
          data-gap="20"
          data-border=""
        >
          <group>
            <text
              data-weight="700"
              data-text-size="large"
              data-font-type="hero"
            >
              CSS Values
            </text>
          </group>

          <group data-direction="column" data-gap="5">
            {cssValues.map((css, index) => (
              <group
                key={index}
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration={`${2 + index * 0.5}`}
              >
                <Ripple>
                  <group
                    data-contain=""
                    data-ink-color="neutral"
                    data-space="15"
                    data-space-horizontal="20"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="15"
                    data-cursor="pointer"
                    data-align="center"
                    data-gap="15"
                    onClick={() => copyToClipboard(css.value, css.label)}
                  >
                    <group data-width="auto" data-length="120">
                      <text data-weight="700" data-opacity="60">
                        {css.label}
                      </text>
                    </group>

                    <group data-fit="1">
                      <text data-font-feature="tnum" data-ellipsis="">
                        {css.value}
                      </text>
                    </group>

                    <group data-width="auto">
                      <Copy size={16} opacity={0.4} />
                    </group>
                  </group>
                </Ripple>
              </group>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
};

export default ColorSpaceConverter;
