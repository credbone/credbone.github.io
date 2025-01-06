import { Shade } from "shade-generator/dist/models";
import { ShadeGenerator } from "shade-generator/dist/shadeGenerator";

export const defaultPrimaryColor = "#0066ff";
export const defaultSecondaryColor = "#49c5b6";

export type ColorPalette = {

    colorPrimaryUltraLight?: string;
    colorPrimaryLightest?: string;
    colorPrimaryLighter?: string;
    colorPrimaryLight?: string;
    colorPrimarySoft?: string;
    colorPrimary: string;
    colorPrimaryDeep?: string;
    colorPrimaryDark?: string;
    colorPrimaryDarker?: string;
    colorPrimaryDarkest?: string;

    colorSecondaryUltraLight?: string;
    colorSecondaryLightest?: string;
    colorSecondaryLighter?: string;
    colorSecondaryLight?: string;
    colorSecondarySoft?: string;
    colorSecondary: string;
    colorSecondaryDeep?: string;
    colorSecondaryDark?: string;
    colorSecondaryDarker?: string;
    colorSecondaryDarkest?: string;
};

export const getCSSByPalette = (palette: ColorPalette) => {
    const {
        colorPrimaryUltraLight,
        colorPrimaryLightest,
        colorPrimaryLighter,
        colorPrimaryLight,
        colorPrimarySoft,
        colorPrimary,
        colorPrimaryDeep,
        colorPrimaryDark,
        colorPrimaryDarker,
        colorPrimaryDarkest,


        colorSecondaryUltraLight,
        colorSecondaryLightest,
        colorSecondaryLighter,
        colorSecondaryLight,
        colorSecondarySoft,
        colorSecondary,
        colorSecondaryDeep,
        colorSecondaryDark,
        colorSecondaryDarker,
        colorSecondaryDarkest,

    } = palette;

    const isMainColorLight = isColorLight(colorPrimary);
    const isSecondaryColorLight = isColorLight(colorSecondary);

    const mainColorText = isMainColorLight
      ? "--main-color-text: var(--main-color-darkest); --main-color-font: var(--main-color-dark);"
      : "--main-color-text: var(--main-color-ultra-light);--main-color-font: var(--main-color);";

      
    const secondaryColorText = isSecondaryColorLight
      ? "--secondary-color-text: var(--secondary-color-darkest);"
      : "--secondary-color-text: var(--secondary-color-ultra-light);";


    
    return `
        :root {
           
            --main-color-alpha-15: ${colorPrimary}26;
            --main-color-alpha-50: ${colorPrimary}80;

            --main-color-ultra-light: ${colorPrimaryUltraLight || getColorShade(colorPrimary, "10")};
            --main-color-lightest: ${colorPrimaryLightest || getColorShade(colorPrimary, "20")};
            --main-color-lighter: ${colorPrimaryLighter || getColorShade(colorPrimary, "40")};
            --main-color-light: ${colorPrimaryLight || getColorShade(colorPrimary, "60")};
            --main-color-soft: ${colorPrimarySoft || getColorShade(colorPrimary, "80")};
            --main-color: ${colorPrimary};
            --main-color-deep: ${colorPrimaryDeep || getColorShade(colorPrimary, "300")};
            --main-color-dark: ${colorPrimaryDark || getColorShade(colorPrimary, "500")};
            --main-color-darker: ${colorPrimaryDarker || getColorShade(colorPrimary, "700")};
            --main-color-darkest: ${colorPrimaryDarkest || getColorShade(colorPrimary, "900")};

            --secondary-color-alpha-15: ${colorSecondary}26;
            --secondary-color-alpha-50: ${colorSecondary}80;

            --secondary-color-ultra-light: ${colorSecondaryUltraLight || getColorShade(colorSecondary, "10")};
            --secondary-color-lightest: ${colorSecondaryLightest || getColorShade(colorSecondary, "20")};
            --secondary-color-lighter: ${colorSecondaryLighter || getColorShade(colorSecondary, "40")};
            --secondary-color-light: ${colorSecondaryLight || getColorShade(colorSecondary, "60")};
            --secondary-color-soft: ${colorSecondarySoft || getColorShade(colorSecondary, "80")};
            --secondary-color: ${colorSecondary};
            --secondary-color-deep: ${colorSecondaryDeep || getColorShade(colorSecondary, "300")};
            --secondary-color-dark: ${colorSecondaryDark || getColorShade(colorSecondary, "500")};
            --secondary-color-darker: ${colorSecondaryDarker || getColorShade(colorSecondary, "700")};
            --secondary-color-darkest: ${colorSecondaryDarkest || getColorShade(colorSecondary, "900")};

            ${mainColorText}
            ${secondaryColorText}
        }
    `;
};

export const getPalette = (colorPrimary: string, colorSecondary: string): ColorPalette => {
    return {

        colorPrimaryUltraLight: getColorShade(colorPrimary, "10"),
        colorPrimaryLightest: getColorShade(colorPrimary, "20"),
        colorPrimaryLighter: getColorShade(colorPrimary, "40"),
        colorPrimaryLight: getColorShade(colorPrimary, "60"),
        colorPrimarySoft: getColorShade(colorPrimary, "80"),
        colorPrimary,
        colorPrimaryDeep: getColorShade(colorPrimary, "300"),
        colorPrimaryDark: getColorShade(colorPrimary, "500"),
        colorPrimaryDarker: getColorShade(colorPrimary, "700"),
        colorPrimaryDarkest: getColorShade(colorPrimary, "900"),

        colorSecondaryUltraLight: getColorShade(colorPrimary, "10"),
        colorSecondaryLightest: getColorShade(colorSecondary, "20"),
        colorSecondaryLighter: getColorShade(colorSecondary, "40"),
        colorSecondaryLight: getColorShade(colorSecondary, "60"),
        colorSecondarySoft: getColorShade(colorSecondary, "80"),
        colorSecondary,
        colorSecondaryDeep: getColorShade(colorSecondary, "300"),
        colorSecondaryDark: getColorShade(colorSecondary, "500"),
        colorSecondaryDarker: getColorShade(colorSecondary, "700"),
        colorSecondaryDarkest: getColorShade(colorSecondary, "900"),
    };
};

const getColorShade = (color: string, shade: Shade): string => {
    return ShadeGenerator.hue(color).shade(shade).hex();
};

function isColorLight(color: string): boolean {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance using the original formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Adjust the threshold if necessary
    return luminance > 0.55;
}