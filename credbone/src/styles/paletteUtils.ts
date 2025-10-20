import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import { getPalette, ColorPalette } from "../styles/skin";

export const usePaletteActions = () => {
  const { addSnackbar } = useSnackbar();

  const generateFullPalette = (
    primaryColor: string,
    secondaryColor?: string
  ): ColorPalette => getPalette(primaryColor, secondaryColor);

  // Map your internal shade suffixes to shade number + name
  const shadeNamesMap: Record<string, { number: string; name: string }> = {
    "UltraLight": { number: "50", name: "UltraLight" },
    "Lightest": { number: "100", name: "Lightest" },
    "Lighter": { number: "200", name: "Lighter" },
    "Light": { number: "300", name: "Light" },
    "Soft": { number: "400", name: "Soft" },
    "": { number: "500", name: "Base" }, // main color
    "Deep": { number: "600", name: "Deep" },
    "Dark": { number: "700", name: "Dark" },
    "Darker": { number: "800", name: "Darker" },
    "Darkest": { number: "900", name: "Darkest" },
  };

  const getDisplayName = (propName: string) => {
    if (propName.startsWith("colorPrimary")) {
      const key = propName.replace("colorPrimary", "");
      return shadeNamesMap[key] || { number: "", name: key };
    }
    if (propName.startsWith("colorSecondary")) {
      const key = propName.replace("colorSecondary", "");
      return shadeNamesMap[key] || { number: "", name: key };
    }
    return { number: "", name: propName };
  };

  const generatePaletteSVG = (palette: ColorPalette): string => {
    const primaryEntries = Object.entries(palette).filter(([name]) =>
      name.startsWith("colorPrimary")
    );
    const secondaryEntries = Object.entries(palette).filter(([name]) =>
      name.startsWith("colorSecondary")
    );

    const boxSize = 120;
    const gap = 5;
    const maxCols = Math.max(primaryEntries.length, secondaryEntries.length);
    const width = maxCols * (boxSize + gap) - gap;
    const height = 2 * (boxSize) + gap;

    const generateRow = (entries: [string, string][], rowIndex: number) =>
      entries
        .map(([name, value], i) => {
          const x = i * (boxSize + gap);
          const y = rowIndex * (boxSize + gap);

          // Determine text contrast
          const fillColor = value.replace("#", "");
          const r = parseInt(fillColor.substring(0, 2), 16);
          const g = parseInt(fillColor.substring(2, 4), 16);
          const b = parseInt(fillColor.substring(4, 6), 16);
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const textColor = luminance > 0.5 ? "#000" : "#fff";

          const display = getDisplayName(name);

          return `
            <g>
              <rect x="${x}" y="${y}" width="${boxSize}" height="${boxSize}" rx="12" ry="12" fill="${value}" />
<g opacity=".5">

              <text x="${x + 20}" y="${y + boxSize - 60}"  font-family="monospace" font-size="14" fill="${textColor}">
                ${display.number}
              </text>

</g>
              <text x="${x + 20}" y="${y + boxSize - 40}"  font-family="monospace" font-size="14" fill="${textColor}">
                ${display.name}
              </text>
              <text x="${x + 20}" y="${y + boxSize - 20}"  font-family="monospace" font-size="14" fill="${textColor}">
                ${value}
              </text>
            </g>`;
        })
        .join("");

    const svgContent = `
      ${generateRow(primaryEntries, 0)}
      ${generateRow(secondaryEntries, 1)}
    `;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      ${svgContent}
    </svg>`;
  };

  const downloadPaletteSVG = (palette: ColorPalette, name = "credbone-palette") => {
    const currentDateTime = new Date()
      .toISOString()
      .replace(/[^\w]/g, "")
      .slice(0, 15);
    const fullPalette = getPalette(palette.colorPrimary, palette.colorSecondary);
    const svg = generatePaletteSVG(fullPalette);
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}-${currentDateTime}.svg`; 
    a.click();
    URL.revokeObjectURL(url);
    addSnackbar("Palette SVG downloaded.", 1500);
  };

  const copyPaletteSVG = async (palette: ColorPalette) => {
    const fullPalette = getPalette(palette.colorPrimary, palette.colorSecondary);
    const svg = generatePaletteSVG(fullPalette);

    try {
      await navigator.clipboard.writeText(svg);
      addSnackbar("Palette SVG copied to clipboard.", 1500);
    } catch {
      addSnackbar("Failed to copy SVG.", 1500);
    }
  };

  return { generateFullPalette, downloadPaletteSVG, copyPaletteSVG };
};
