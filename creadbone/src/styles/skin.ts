

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

    colorInfo?: string;
    colorSuccess?: string;
    colorWarning?: string;
    colorError?: string;
};
export type SkinConfig = {
    colorPalette: ColorPalette;
    sizeConfig: {
        fontSize: number;
        borderRadius: number;
        fontFamily: string;
    };
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

export const getSkinConfigByUnivers: (brand: string) => SkinConfig = (brand: string) => {
    switch (brand.toLowerCase()) {
        case 'atlantic':
            return {
                colorPalette: getPalette('#f26f5f', '#679480'),
                sizeConfig: {
                    fontSize: 13,
                    borderRadius: 5,
                    fontFamily: 'gilroy'
                }
            };
        case 'thermor':
            return {
                colorPalette: getPalette('#e62814', '#2c2e34'),
                sizeConfig: {
                    fontSize: 15,
                    borderRadius: 2,
                    fontFamily: 'Lato'
                }
            };

        default:
            return {
                colorPalette: getPalette('#2c2e34', '#e62814'),
                sizeConfig: {
                    fontSize: 13,
                    borderRadius: 5,
                    fontFamily: 'gilroy'
                }
            };
    }

};


//export const getMainColorsByUnivers = (brand: string) => {
//    switch (brand.toLowerCase()) {
//        case 'atlantic':
//            return ['#934f9a', '#679480'];
//        case 'thermor':
//            return ['#e62814', '#2c2e34'];

//        default:
//            return ['#2c2e34', '#e62814'];
//    }

//};

