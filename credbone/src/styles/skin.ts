import { Shade } from "shade-generator/dist/models";
import { ShadeGenerator } from "shade-generator/dist/shadeGenerator";

export const defaultPrimaryColor = "#0066ff";
export const defaultSecondaryColor = "#49c5b6";

export type ColorPalette = {
    colorPrimary: string;
    colorLighter?: string;
    colorLight?: string;
    colorDark?: string;
    colorDarker?: string;
    colorSecondary: string;
    colorSecondaryLighter?: string;
    colorSecondaryLight?: string;
    colorSecondaryDark?: string;
    colorSecondaryDarker?: string;
};

export const getCSSByPalette = (palette: ColorPalette) => {
    const {
        colorPrimary,
        colorLighter,
        colorLight,
        colorDark,
        colorDarker,
        colorSecondary,
        colorSecondaryLighter,
        colorSecondaryLight,
        colorSecondaryDark,
        colorSecondaryDarker,
    } = palette;

    const isMainColorLight = isColorLight(colorPrimary);
    const isSecondaryColorLight = isColorLight(colorSecondary);

    const mainColorText = isMainColorLight ? "--main-color-text: var(--main-color-darker);" : "--main-color-text: var(--main-color-lighter-white);";
    const secondaryColorText = isSecondaryColorLight ? "--secondary-color-text: var(--secondary-color-darker);" : "--secondary-color-text: var(--secondary-color-lighter-white);";

    
    return `
        :root {
           

            --main-color-lighter-white: ${colorLighter || getColorShade(colorPrimary, "20")};
            --main-color-light-white: ${colorLight || getColorShade(colorPrimary, "70")};

            --main-color-lighter: ${colorPrimary}2b;
            --main-color-light: ${colorPrimary}75;
            --main-color: ${colorPrimary};
            --main-color-dark: ${colorDark || getColorShade(colorPrimary, "500")};
            --main-color-darker: ${colorDarker || getColorShade(colorPrimary, "800")};

            --secondary-color-light-white: ${colorSecondaryLight || getColorShade(colorSecondary, "70")};
            --secondary-color-lighter-white: ${colorSecondaryLighter || getColorShade(colorSecondary, "20")};
  

            --secondary-color-lighter: ${colorSecondary}2b;
            --secondary-color-light: ${colorSecondary}75;
            --secondary-color: ${colorSecondary};
            --secondary-color-dark: ${colorSecondaryDark || getColorShade(colorSecondary, "500")};
            --secondary-color-darker: ${colorSecondaryDarker || getColorShade(colorSecondary, "800")};

            ${mainColorText}
            ${secondaryColorText}
        }
    `;
};

export const getPalette = (colorPrimary: string, colorSecondary: string): ColorPalette => {
    return {
        colorPrimary,
        colorSecondary,
        colorLighter: getColorShade(colorPrimary, "20"),
        colorLight: getColorShade(colorPrimary, "70"),
        colorDark: getColorShade(colorPrimary, "500"),
        colorDarker: getColorShade(colorPrimary, "800"),
        colorSecondaryLighter: getColorShade(colorSecondary, "20"),
        colorSecondaryLight: getColorShade(colorSecondary, "70"),
        colorSecondaryDark: getColorShade(colorSecondary, "500"),
        colorSecondaryDarker: getColorShade(colorSecondary, "800"),
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
    return luminance > 0.5;
}