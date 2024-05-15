import { Shade } from "shade-generator/dist/models";
import { ShadeGenerator } from "shade-generator/dist/shadeGenerator";

export const defaultPrimaryColor = "#544f9a";
export const defaultSecondaryColor = "#055b5c";

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

    return `
        :root {
            --main-color-lighter: ${colorPrimary}2b;
            --main-color-light: ${colorPrimary}75;
            --main-color: ${colorPrimary};
            --main-color-dark: ${colorDark || getColorShade(colorPrimary, "500")};
            --main-color-darker: ${colorDarker || getColorShade(colorPrimary, "700")};
            --secondary-color-lighter: ${colorSecondary}2b;
            --secondary-color-light: ${colorSecondary}75;
            --secondary-color: ${colorSecondary};
            --secondary-color-dark: ${colorSecondaryDark || getColorShade(colorSecondary, "500")};
            --secondary-color-darker: ${colorSecondaryDarker || getColorShade(colorSecondary, "700")};
        }
    `;
};

export const getPalette = (colorPrimary: string, colorSecondary: string): ColorPalette => {
    return {
        colorPrimary,
        colorSecondary,
        colorLighter: getColorShade(colorPrimary, "40"),
        colorLight: getColorShade(colorPrimary, "70"),
        colorDark: getColorShade(colorPrimary, "500"),
        colorDarker: getColorShade(colorPrimary, "700"),
        colorSecondaryLighter: getColorShade(colorSecondary, "40"),
        colorSecondaryLight: getColorShade(colorSecondary, "70"),
        colorSecondaryDark: getColorShade(colorSecondary, "500"),
        colorSecondaryDarker: getColorShade(colorSecondary, "700"),
    };
};

const getColorShade = (color: string, shade: Shade): string => {
    return ShadeGenerator.hue(color).shade(shade).hex();
};
