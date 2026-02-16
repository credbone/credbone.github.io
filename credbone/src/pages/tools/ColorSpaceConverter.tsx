import React, { useState, useEffect, useRef } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";

import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import { IconClick } from "../../components/icon/credIcons";

const ColorSpaceConverter: React.FC = () => {
  // Generate a pleasant random color
  const generatePleasantColor = (): string => {
    // Generate colors with good saturation and lightness for visual appeal
    const hue = Math.floor(Math.random() * 360);
    const saturation = 0.6 + Math.random() * 0.3; // 60-90%
    const lightness = 0.4 + Math.random() * 0.3; // 40-70%
    
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return rgbToHex(r, g, b);
  };

  // Helper functions needed for initialization
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

  // Get initial color from URL or generate random
  const getInitialColor = (): string => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlColor = params.get("color");
      if (urlColor) {
        // Validate hex color
        const hexPattern = /^[0-9A-Fa-f]{6}$/;
        if (hexPattern.test(urlColor)) {
          return `#${urlColor}`;
        }
      }
    }
    return generatePleasantColor();
  };

  const [color, setColor] = useState(getInitialColor());
  const [activeTab, setActiveTab] = useState<"spaces" | "css">("spaces");
  const { addSnackbar } = useSnackbar();
  const isPickerOpenRef = useRef(false);

  // Update URL when color changes (but only when picker is closed)
  const updateURL = (newColor: string) => {
    if (typeof window !== "undefined") {
      const colorValue = newColor.replace("#", "");
      const newURL = `${window.location.pathname}?color=${colorValue}`;
      window.history.replaceState({}, "", newURL);
    }
  };

  // Handle color change from picker
  const handlePickerColorChange = (newColor: string) => {
    setColor(newColor);
    // Don't update URL during drag
  };

  const [inputValue, setInputValue] = useState(color);

  // Sync inputValue with color when color changes from picker
  useEffect(() => {
    setInputValue(color);
  }, [color]);

  // Handle color change from hex input
  const handleHexInputChange = (newColor: string) => {
    // Always update the input display
    setInputValue(newColor);
    
    // Only update state and URL if it's a valid 6-character hex code
    if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      setColor(newColor);
      updateURL(newColor);
    }
  };

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

    const lightnessCurve = [0.08, 0.18, 0.32, 0.5, 0.7, 0.88];
    const satCurve = [
      s * 1.1,
      s * 1.05,
      s * 1.0,
      s * 0.95,
      s * 0.85,
      s * 0.7,
    ].map((v) => Math.min(1, v));

    const hueShift = [-4, -2, 0, 2, 3, 5];

    return lightnessCurve.map((newL, i) => {
      const newH = (h + hueShift[i] + 360) % 360;
      const [newR, newG, newB] = hslToRgb(newH, satCurve[i], newL);
      return rgbToHex(newR, newG, newB);
    });
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
      const newH = (h + i * 40) % 360;
      const newL = 0.3 + i * 0.1;
      const [newR, newG, newB] = hslToRgb(newH, s, newL);
      colors.push(rgbToHex(newR, newG, newB));
    }
    return colors;
  };

  const copySVGToClipboard = async (harmonyName: string, colors: string[]) => {
    const width = 100;
    const height = 100;
    const rectWidth = width;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * colors.length}" height="${height}" viewBox="0 0 ${width * colors.length} ${height}">\n`;

    colors.forEach((color, index) => {
      svgContent += `  <rect x="${index * width}" y="0" width="${rectWidth}" height="${height}" fill="${color}"/>\n`;
    });

    svgContent += `</svg>`;

    try {
      await navigator.clipboard.writeText(svgContent);
      addSnackbar(`${harmonyName} SVG copied`, 1000);
    } catch (err) {
      addSnackbar("Failed to copy SVG", 1000);
    }
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
      value: `${h.toFixed(2)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%`,
      copyValue: `${h.toFixed(2)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%`,
    },
    {
      label: "HSV",
      value: `${hHsv.toFixed(2)}, ${(sHsv * 100).toFixed(0)}%, ${(v * 100).toFixed(0)}%`,
      copyValue: `${hHsv.toFixed(2)}, ${(sHsv * 100).toFixed(0)}%, ${(v * 100).toFixed(0)}%`,
    },
    {
      label: "HSI",
      value: `${hHsi.toFixed(2)}, ${(sHsi * 100).toFixed(0)}%, ${(i * 100).toFixed(2)}%`,
      copyValue: `${hHsi.toFixed(2)}, ${(sHsi * 100).toFixed(0)}%, ${(i * 100).toFixed(2)}%`,
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
      value: `${Math.round(temp)}K`,
      copyValue: Math.round(temp).toString(),
    },
    {
      label: "OpenGL",
      value: `${gl_r.toFixed(2)}, ${gl_g.toFixed(2)}, ${gl_b.toFixed(2)}, ${gl_a.toFixed(2)}`,
      copyValue: `${gl_r.toFixed(2)}, ${gl_g.toFixed(2)}, ${gl_b.toFixed(2)}, ${gl_a.toFixed(2)}`,
    },
  ];

  const cssValues = [
    {
      label: "HEX",
      value: color.toUpperCase(),
      copyValue: color.toUpperCase(),
    },
    {
      label: "RGB",
      value: `rgb(${r}, ${g}, ${b})`,
      copyValue: `rgb(${r}, ${g}, ${b})`,
    },
    {
      label: "RGB %",
      value: `rgb(${((r / 255) * 100).toFixed(0)}%, ${((g / 255) * 100).toFixed(0)}%, ${((b / 255) * 100).toFixed(0)}%)`,
      copyValue: `rgb(${((r / 255) * 100).toFixed(0)}%, ${((g / 255) * 100).toFixed(0)}%, ${((b / 255) * 100).toFixed(0)}%)`,
    },
    {
      label: "HSL",
      value: `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`,
      copyValue: `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`,
    },
    {
      label: "RGBA",
      value: `rgba(${r}, ${g}, ${b}, 1)`,
      copyValue: `rgba(${r}, ${g}, ${b}, 1)`,
    },
    {
      label: "HSLA",
      value: `hsla(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%, 1)`,
      copyValue: `hsla(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%, 1)`,
    },
  ];

  return (
    <group data-gap="30" data-align="start" data-direction="column">
      <group
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        data-align="start"
      >
        {/* Color Preview Card */}

        <group data-index="3">
          <group
            data-radius="30"
            data-interactive=""
            data-contain=""
            data-border="outline-soft"
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
                      <HexColorPicker 
                        color={color} 
                        onChange={handlePickerColorChange}
                        onMouseUp={() => {
                          // Update URL when user releases mouse
                          updateURL(color);
                        }}
                        onTouchEnd={() => {
                          // Update URL when user releases touch
                          updateURL(color);
                        }}
                      />
                    </group>
                  </group>
                )}
                onOpenChange={(isOpen) => {
                  isPickerOpenRef.current = isOpen;
                  if (!isOpen) {
                    // Update URL when picker closes
                    updateURL(color);
                   
                  }
                }}
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
                <group
                  data-gap="20"
                  data-wrap="no"
                  data-direction="column"
                  data-align="start"
                >
                  <group data-width="auto" data-gap="20" data-interact="">
                    <IconClick size={32}/>
                    <separator data-horizontal=""></separator>
                  </group>

                  <group data-gap="10" data-wrap="no" data-direction="column">
                    <text
                      data-weight="700"
                      data-text-size="large"
                      data-font-type="hero"
                    >
                      Select your color
                    </text>

                    <text data-wrap="wrap" data-length="240" data-opacity="40">
                      Pick a color using the picker or enter a hex code to see
                      all conversion formats.
                    </text>
                  </group>
                </group>

                <group>
                  <HexColorInput
                    data-interact=""
                    data-index="2"
                    data-font-feature="tnum"
                    style={{
                      ["--select-color" as any]: color,
                      ["--select-background" as any]:
                        getAdaptiveTextColor(color),
                      color: getAdaptiveTextColor(color),
                    }}
                    data-text-transform="uppercase"
                    data-length="content"
                    color={inputValue}
                    onChange={handleHexInputChange}
                    alpha={false}
                    data-name="input-reset"
                    data-text-size="xx-large"
                    data-weight="300"
                 //   data-text-align="center"
                    name="hex-color-input"
                    data-select-color="dynamic"
                  />
                </group>
              </group>
            </group>
          </group>

          {/* Color Combinations Section */}
          <group data-direction="column">
            <group
              data-space="30"
              data-gap="10"
              data-wrap="no"
              data-direction="column"
            >
              <text
                data-weight="700"
                data-text-size="large"
                data-font-type="hero"
              >
                Color Harmonies
              </text>
              <text data-wrap="wrap" data-length="240" data-opacity="40">
                Explore color combinations based on color theory relationships.
              </text>
            </group>

            <group data-direction="column">
              <group data-height="20"></group>
              {[
                { name: "Analogous", colors: generateAnalogous(color) },
                { name: "Monochromatic", colors: generateMonochromatic(color) },
                { name: "Polyad", colors: generatePolyad(color) },
              ].map((harmony, harmonyIndex) => (
                <group
                  key={harmony.name}
                  data-direction="column"
                  data-margin-top="-20"
                >
                  <group data-space-horizontal="20" data-width="auto">
                    <Ripple>
                      <group
                        data-interactive=""
                        data-over-color="neutral"
                        data-cursor="pointer"
                        data-contain=""
                        data-align="center"
                        data-gap="15"
                        data-space-vertical="15"
                        data-space-horizontal="30"
                        data-width="auto"
                        data-background="adaptive-gray"
                        data-backdrop="20"
                        data-clip="tab-top"
    
                        onClick={() =>
                          copySVGToClipboard(harmony.name, harmony.colors)
                        }
                        data-wrap="no"
                      >
                        <group data-width="auto" data-contain="">
                          <text data-opacity="60" data-ellipsis="">
                            {harmony.name}
                          </text>
                        </group>
                        <separator
                          data-vertical=""
                          data-height="fit"
                        ></separator>
                        <group data-width="auto">
                          <group data-width="auto">
                            <text>Copy</text>
                          </group>
                        </group>
                      </group>
                    </Ripple>
                  </group>

                  <group
                    data-space="5"
                    data-elevation="2"
                    data-background="context"
                    data-radius="20"
                    data-direction="column"
                    data-wrap="no"
                  >
                    <group
                      data-wrap="no"
                      // data-type="grid"
                      // data-grid-template-columns="6"
                      data-contain=""
                      data-radius="15"
                    >
                      {harmony.colors.map((harmonyColor, colorIndex) => (
                        <group key={colorIndex} data-ratio="1:1" data-margin-left={colorIndex === 0 ? undefined : "-1"}>
                          <Ripple>
                            <group
                              data-contain=""
                              data-ink-color="neutral"
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
                </group>
              ))}
            </group>
          </group>
        </group>

        <group>
          <group data-contain="">
            <group
              data-space="30"
              data-gap="10"
              data-wrap="no"
              data-direction="column"
            >
              <text
                data-weight="700"
                data-text-size="large"
                data-font-type="hero"
              >
                Color Formats
              </text>
              <text data-wrap="wrap" data-length="240" data-opacity="40">
                View and copy color values in different formats for design and
                development.
              </text>
            </group>

            <group data-space-horizontal="20" data-width="auto" data-wrap="no" data-align="end">
              <Ripple>
                <group
                  data-interactive=""
                  data-over-color="neutral"
                  data-cursor="pointer"
                  data-contain=""
                  data-align="center"
                  data-gap="15"

                  data-space-vertical={ activeTab === "spaces" ? "20" : "15" }
                  data-width="auto"
                  data-space-horizontal="30"
                  data-background={ activeTab === "spaces" ? "text" : "adaptive-gray" }
                  data-color={activeTab === "spaces" ? "main-background" : ""}
                  data-index={activeTab === "spaces" ? "2" : ""}
                  data-clip="tab-top"
                  onClick={() => setActiveTab("spaces")}
                >
                  <group data-width="auto" data-contain="">
                    <text
                      data-ellipsis=""
                      data-opacity={activeTab === "spaces" ? "100" : "40"}
                    >
                      Color Spaces
                    </text>
                  </group>
                </group>
              </Ripple>

              <Ripple>
                <group
                  data-interactive=""
                  data-over-color="neutral"
                  data-cursor="pointer"
                  data-contain=""
                  data-align="center"
                  data-gap="15"

                  data-space-vertical={ activeTab === "css" ? "20" : "15" }
                  data-space-horizontal="30"
                  data-width="auto"
                  data-background={ activeTab === "css" ? "text" : "adaptive-gray" }
                  data-color={activeTab === "css" ? "main-background" : ""}
                  data-index={activeTab === "css" ? "2" : ""}
                  data-clip="tab-top"
                  data-margin-left="-20"
                  onClick={() => setActiveTab("css")}
                >
                  <group data-width="auto" data-contain="">
                    <text
                      data-ellipsis=""
                      data-opacity={activeTab === "css" ? "100" : "40"}
                    >
                      CSS Values
                    </text>
                  </group>
                </group>
              </Ripple>
            </group>

            <group data-height="2" data-background="text"></group>
          </group>

          <group
            data-elevation="2"
            data-radius-bottom="30"
            data-space="20"
            data-direction="column"
            data-gap="20"
            data-contain=""
          >
            {activeTab === "spaces" && (
              <>
                <group data-space="15">
                  <group data-gap="20" data-wrap="no">
                    <group
                      data-length="30"
                      data-height="30"
                      data-radius="30"
                      data-border="outline-soft"
                      style={{
                        backgroundColor: color,
                      }}
                    ></group>

                    <separator data-vertical="" data-height="fit"></separator>

                    <text data-wrap="wrap" data-opacity="40">
                      Mathematical color space representations
                    </text>
                  </group>
                </group>

                <group data-direction="column">
                  {colorSpaces.map((space, index) => (
                    <group
                      key={index}
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration={`${2 + index * 0.5}`}
                      data-name="autoseparation"
                    >
                      <separator data-horizontal="dotted"></separator>
                      <Ripple>
                        <group
                          data-contain=""
                          data-ink-color="neutral"
                          data-space="15"
                          data-interactive=""
                          data-over-color="neutral"
                          data-radius="15"
                          data-cursor="pointer"
                          data-align="center"
                          data-gap="15"
                          onClick={() =>
                            copyToClipboard(space.copyValue, space.label)
                          }
                          data-wrap="no"
                        >
                          <group data-width="auto">
                            <text data-opacity="40">{space.label}</text>
                          </group>

                          <group data-width="auto" data-contain="">
                            <text data-font-feature="tnum" data-ellipsis="">
                              {space.value}
                            </text>
                          </group>

                          <group
                            data-width="auto"
                            data-position="right"
                            data-opacity="0-hover-30"
                          >
                            <text>Copy</text>
                          </group>
                        </group>
                      </Ripple>
                    </group>
                  ))}
                </group>
              </>
            )}

            {activeTab === "css" && (
              <>
                <group data-space="15">
                  <group data-gap="20" data-wrap="no">
                    <group
                      data-length="30"
                      data-height="30"
                      data-radius="30"
                      data-border="outline-soft"
                      style={{
                        backgroundColor: color,
                      }}
                    ></group>

                    <separator data-vertical="" data-height="fit"></separator>

                    <text data-wrap="wrap" data-opacity="40">
                      CSS-ready color values for web development
                    </text>
                  </group>
                </group>

                <group data-direction="column">
                  {cssValues.map((css, index) => (
                    <group
                      key={index}
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration={`${2 + index * 0.5}`}
                      data-name="autoseparation"
                    >
                      <separator data-horizontal="dotted"></separator>
                      <Ripple>
                        <group
                          data-contain=""
                          data-ink-color="neutral"
                          data-space="15"
                          data-interactive=""
                          data-over-color="neutral"
                          data-radius="15"
                          data-cursor="pointer"
                          data-align="center"
                          data-gap="15"
                          onClick={() =>
                            copyToClipboard(css.copyValue, css.label)
                          }
                          data-wrap="no"
                        >
                          <group data-width="auto">
                            <text data-opacity="40">{css.label}</text>
                          </group>

                          <group data-width="auto" data-contain="">
                            <text data-font-feature="tnum" data-ellipsis="">
                              {css.value}
                            </text>
                          </group>

                          <group
                            data-width="auto"
                            data-position="right"
                            data-opacity="0-hover-30"
                          >
                            <text>Copy</text>
                          </group>
                        </group>
                      </Ripple>
                    </group>
                  ))}
                </group>
              </>
            )}
          </group>
        </group>
      </group>
    </group>
  );
};

export default ColorSpaceConverter;