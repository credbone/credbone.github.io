

import { Shade } from "shade-generator/dist/models";
import { ShadeGenerator } from "shade-generator/dist/shadeGenerator";


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


export const getCSSByPalette = ({
    colorLighter,
    colorPrimary,
    colorLight,
    colorDark,
    colorDarker,
    colorSecondary,
    colorSecondaryLighter,
    colorSecondaryLight,
    colorSecondaryDark,
    colorSecondaryDarker,
}: ColorPalette) => {
    return `
            :root {
            --main-color-lighter: ${colorPrimary}2b;
            --main-color-light: ${colorPrimary}75;
            --main-color: ${colorPrimary};
            --main-color-dark:  ${colorDark};
            --main-color-darker:  ${colorDarker};

            --secondary-color-lighter: ${colorSecondary}2b;
            --secondary-color-light: ${colorSecondary}75;
            --secondary-color: ${colorSecondary};
            --secondary-color-dark:  ${colorSecondaryDark};
            --secondary-color-darker:  ${colorSecondaryDarker};
        }`;
};

export const getPalette = (colorPrimary: string, colorSecondary: string) => {
    const palette: ColorPalette = {
        colorPrimary,
        colorLighter: getColorShade(colorPrimary, "40"),
        colorLight: getColorShade(colorPrimary, "70"),
        colorDark: getColorShade(colorPrimary, "500"),
        colorDarker: getColorShade(colorPrimary, "700"),
        colorSecondary,
        colorSecondaryLighter: getColorShade(colorSecondary, "40"),
        colorSecondaryLight: getColorShade(colorSecondary, "70"),
        colorSecondaryDark: getColorShade(colorSecondary, "500"),
        colorSecondaryDarker: getColorShade(colorSecondary, "700"),
    };
    return palette;
};

const getColorShade = (color: string, shade: Shade) => {
    return ShadeGenerator.hue(color).shade(shade).hex();
};
