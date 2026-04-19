import React, { useState } from "react";

import { BaseColors, NeutralShades } from "./utils/colorData";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";

import CustomColorPicker from "./theme/CustomColorPicker";
import TemplatePageHeader from "./TemplatePageHeader";
import { usePaletteActions } from "../styles/paletteUtils";
import { useTheme } from "../components/ThemeProvider";
import { ArrowDown, Copy } from "lucide-react";
import { getPalette } from "../styles/skin";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import Ripple from "../components/Ripple";

export const ColorPalette = [
  {
    textcolor: "-darker",
    code: "-lightest",
    name: "Lightest",
    description: "100",
    paletteKey: "Lightest",
  },
  {
    textcolor: "-darker",
    code: "-lighter",
    name: "Lighter",
    description: "200",
    paletteKey: "Lighter",
  },
  {
    textcolor: "-darker",
    code: "-light",
    name: "Light",
    description: "300",
    paletteKey: "Light",
  },
  {
    textcolor: "-darker",
    code: "-soft",
    name: "Soft",
    description: "400",
    paletteKey: "Soft",
  },
  {
    textcolor: "-text",
    code: "",
    name: "Base",
    description: "500",
    paletteKey: "",
  },
  {
    textcolor: "-lighter",
    code: "-deep",
    name: "Deep",
    description: "600",
    paletteKey: "Deep",
  },
  {
    textcolor: "-lighter",
    code: "-dark",
    name: "Dark",
    description: "700",
    paletteKey: "Dark",
  },
  {
    textcolor: "-lightest",
    code: "-darker",
    name: "Darker",
    description: "800",
    paletteKey: "Darker",
  },
  {
    textcolor: "-lightest",
    code: "-darkest",
    name: "Darkest",
    description: "900",
    paletteKey: "Darkest",
  },
];

interface SwatchGridProps {
  group: "Primary" | "Secondary";
  onCopy: (hex: string, label: string) => void;
  getHex: (group: "Primary" | "Secondary", paletteKey: string) => string;
}

const SwatchGrid: React.FC<SwatchGridProps> = ({ group, onCopy, getHex }) => (
  <group
    data-type="grid"
    data-grid-template="110/columns-3"
    data-gap="5"
    data-contain=""
  >
    {ColorPalette.map((color, index) => {
      const hex = getHex(group, color.paletteKey);
      const prefix = group === "Primary" ? "main" : "secondary";
      return (
        <Ripple key={index}>
          <group
            key={index}
            data-ink-color="neutral"
            data-over-color="none"
            data-contain=""
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-justify="end"
            data-gap="15"
            data-width="auto"
            data-space="20"
            data-background={prefix + color.code}
            data-color={prefix + color.textcolor}
            data-wrap="no"
            data-radius="20"
            data-interactive=""
            data-align="start"
            data-cursor="pointer"
            data-react="brightness"
            onClick={() => onCopy(hex, `${group} ${color.name}`)}
          >
            <group data-height="20" data-align="start">
              {color.name === "Base" && (
                <group
                  data-interact=""
                  data-space="3"
                  data-background={prefix + color.textcolor}
                  data-width="auto"
                  data-radius="10"
                />
              )}
            </group>

            <group data-direction="column" data-width="auto">
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-ellipsis="" data-font-type="hero" data-weight="700">
                {color.name}
              </text>
            </group>
            <group data-width="auto" data-gap="15">
              <separator data-horizontal="" data-interact=""></separator>
              <text
                data-ellipsis=""
                data-text-transform="uppercase"
                data-opacity="50"
              >
                {hex.replace("#", "")}
              </text>
            </group>
          </group>
        </Ripple>
      );
    })}
  </group>
);

const Colors: React.FC = () => {
  const { theme } = useTheme();
  const { downloadPaletteSVG, copyPaletteSVG } = usePaletteActions();
  const { addSnackbar } = useSnackbar();

  const palette = getPalette(theme.colorPrimary, theme.colorSecondary);

  const getHex = (
    group: "Primary" | "Secondary",
    paletteKey: string,
  ): string => {
    const key = `color${group}${paletteKey}` as keyof typeof palette;
    return (palette[key] as string) ?? "";
  };

  const copyHex = async (hex: string, label: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      addSnackbar(
        <group data-gap="10" data-align="center" data-wrap="no">
          <text
            data-ellipsis=""
            data-opacity="50"
            data-text-transform="uppercase"
          >
            {hex.replace("#", "")}
          </text>
          <text>{label} copied</text>
        </group>,
        1500,
      );
    } catch {
      addSnackbar("Failed to copy.", 1500);
    }
  };

  const shades = [
    // { suffix: "-lighter", label: "Lighter", key: "lighter", textColor: (v: string) => v + "-darker", },
    {
      suffix: "-light",
      label: "Soft",
      key: "light",
      textColor: (v: string) => v + "-darker",
    },
    {
      suffix: "",
      label: "Base",
      key: "base",
      textColor: (v: string, light?: string) =>
        light ? v + "-darker" : "white",
    },
    {
      suffix: "-dark",
      label: "Deep",
      key: "dark",
      textColor: (v: string) => v + "-lighter",
    },
    // { suffix: "-darker", label: "Darker", key: "darker", textColor: (v: string) => v + "-lighter", },
  ];

  const { themeMode } = useTheme();
  const neutralHex = (paletteKey: string) => {
    const key = (paletteKey.toLowerCase() ||
      "base") as keyof typeof NeutralShades.light;
    return themeMode === "dark"
      ? NeutralShades.dark[key]
      : NeutralShades.light[key];
  };

  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
      <TemplatePageHeader
        title="Color System"
        description="A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces."
        version="3.0.2"
        type="Token"
        descriptionProps={{ "data-length": "600" }}
      />

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-font-type="hero" data-text-size="large">
              Primary Color
            </text>
          </group>
          <group data-gap="30">
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="240"
            >
              The selected color will define the UI, with additional shades
              generated automatically.
            </text>
            <separator data-vertical="adaptive-1200" data-height=""></separator>
            <Popover
              data-direction="row"
              content={
                <group
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="1.25"
                >
                  <RichThemePicker pickerType="primary" />
                </group>
              }
              data-space="5"
              data-radius="15"
              data-backdrop="10"
              data-width="auto"
            >
              <group
                data-width="auto"
                data-over-color="none"
                data-interactive=""
                data-cursor="pointer"
                data-align="center"
                data-wrap="no"
                data-gap="15"
                data-autofit="1-800"
              >
                <group
                  data-interact=""
                  data-direction="column"
                  data-react="background"
                  data-over-color="neutral"
                  data-space="15"
                  data-radius="15"
                >
                  <text data-weight="700">Swatches</text>
                  <text data-opacity="30">Select from presets</text>
                </group>
              </group>
            </Popover>
            <separator data-vertical="adaptive" data-height=""></separator>
            <CustomColorPicker target="primary" />
            <separator data-vertical="adaptive" data-height=""></separator>
            <Popover

bottomsheet

              data-space="5"
              data-radius="20"
              content={(closePopover, isBottomSheet) => (
                <group
                  data-direction="column"
                  data-length={isBottomSheet ? undefined: "240"}
                  onClick={closePopover}
                  data-contain=""
                >
                  <group
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
                      onClick={() => downloadPaletteSVG(theme)}
                      data-wrap="no"
                    >
                      <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <ArrowDown strokeWidth={1.5} size={20} />
                      </group>
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Download</text>
                        <text data-opacity="30">Save palette for later</text>
                      </group>
                    </group>
                  </group>
                  <group
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
                      onClick={() => copyPaletteSVG(theme)}
                      data-wrap="no"
                    >
                      <group
                        data-length="20"
                        data-opacity="30"
                        data-interact=""
                      >
                        <Copy strokeWidth={1.5} size={20} />
                      </group>
                      <group data-direction="column" data-width="auto">
                        <text data-weight="700">Copy</text>
                        <text data-opacity="30">
                          Paste in Figma or code ...
                        </text>
                      </group>
                    </group>
                  </group>
                </group>
              )}
            >
              <group
                data-width="auto"
                data-over-color="none"
                data-interactive=""
                data-cursor="pointer"
                data-align="center"
                data-wrap="no"
                data-gap="5"
                data-autofit="1-800"
              >
                <group
                  data-interact=""
                  data-direction="column"
                  data-react="background"
                  data-over-color="neutral"
                  data-space="15"
                  data-radius="15"
                >
                  <text data-weight="700">Export</text>
                  <text data-opacity="30">Grab palette files</text>
                </group>
              </group>
            </Popover>
          </group>
        </group>
        <SwatchGrid group="Primary" onCopy={copyHex} getHex={getHex} />
      </group>

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-font-type="hero" data-text-size="large">
              Secondary Color
            </text>
          </group>
          <group data-gap="30">
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="240"
            >
              The selected color will define the UI, with additional shades
              generated automatically.
            </text>
            <separator data-vertical="adaptive-1200" data-height=""></separator>
            <Popover
            data-direction="row"
              content={
                <group
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="1.25"
                >
                  <RichThemePicker pickerType="secondary" />
                </group>
              }
              data-space="5"
              data-radius="15"
              data-backdrop="10"
              data-width="auto"
            >
              <group
                data-width="auto"
                data-over-color="none"
                data-interactive=""
                data-cursor="pointer"
                data-align="center"
                data-wrap="no"
                data-gap="5"
                data-autofit="1-800"
              >
                <group
                  data-interact=""
                  data-direction="column"
                  data-react="background"
                  data-over-color="neutral"
                  data-space="15"
                  data-radius="15"
                >
                  <text data-weight="700">Swatches</text>
                  <text data-opacity="30">Select from presets</text>
                </group>
              </group>
            </Popover>
            <separator data-vertical="adaptive" data-height=""></separator>
            <CustomColorPicker target="secondary" />
          </group>
        </group>
        <SwatchGrid group="Secondary" onCopy={copyHex} getHex={getHex} />
      </group>

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-font-type="hero" data-text-size="large">
              Neutral Scale
            </text>
          </group>
          <group data-gap="30" data-wrap="no">
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="300"
            >
              Neutral shades automatically adapt to light and dark mode,
              ensuring consistent contrast and readability across the entire UI.
            </text>
          </group>
        </group>
        <group
          data-type="grid"
          data-grid-template="110/columns-3"
          data-gap="5"
          data-contain=""
        >
          {ColorPalette.map((color, index) => {
            const hex = neutralHex(color.paletteKey);
            return (
              <Ripple key={index}>
                <group
                  key={index}
                  data-contain=""
                  data-length="auto"
                  data-shrink="no"
                  data-direction="column"
                  //     data-ratio="1:1"
                  data-justify="end"
                  data-width="auto"
                  data-space="20"
                  data-background={"neutral" + color.code}
                  data-color={"neutral" + color.textcolor}
                  data-wrap="no"
                  data-radius="20"
                  data-gap="15"
                  data-ink-color="neutral"
                  data-interactive=""
                  data-align="start"
                  data-cursor="pointer"
                  data-react="brightness"
                  data-over-color="none"
                  onClick={() => copyHex(hex, `Neutral ${color.name}`)}
                >
                  <group data-direction="column">
                    <text data-ellipsis="" data-light="" data-color="reset">
                      {color.description}
                    </text>
                    <text
                      data-ellipsis=""
                      data-font-type="hero"
                      data-color="reset"
                    >
                      {color.name}
                    </text>
                  </group>

                  <group data-width="auto" data-gap="15" data-color="reset">
                    <separator data-horizontal="" data-interact=""></separator>
                    <text
                      data-ellipsis=""
                      data-text-transform="uppercase"
                      data-opacity="50"
                    >
                      {hex.replace("#", "")}
                    </text>
                  </group>
                </group>
              </Ripple>
            );
          })}
        </group>
      </group>

      <group data-gap="30">
        <group data-direction="column" data-gap="15" data-space="30">
          <text data-font-type="hero" data-text-size="large" data-wrap="wrap">
            Base Colors
          </text>
          <text
            data-wrap="wrap"
            data-length="400"
            data-line="1.5"
            data-light=""
          >
            Collection of predefined shades to complement design and maintain
            consistency across system.
          </text>
        </group>
        <group
          data-shrink="no"
          data-type="grid"
          data-gap="5"
          data-grid-template="58"
          //  data-contain=""
        >
          {BaseColors.map((color, i) => (
              <group
               key={i}
                data-position="bottom"
                data-wrap="no"
                data-direction="column"
                data-gap="5"
                data-height="fit"
                data-cursor="pointer"
              >
                {shades.map((shade) => {
                  const hex =
                    (color[shade.key as keyof typeof color] as string) ?? "";
                  return (
                    <Popover

                    data-contain=""
                      key={shade.key}
                      data-background={undefined}
                      data-length="140"
                      data-space={undefined}
                      data-radius="25"
                      data-elevation={undefined}
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration="1.75"
                      content={(closePopover) => (
                        <group
                          //   onClick={closePopover}
                          data-direction="column"
                          data-interactive=""
                          data-over-color="none"
                        >
                          <Ripple>
                            <group
                              data-ink-color="neutral"
                              data-cursor="pointer"
                              data-background={color.value + shade.suffix}
                              data-color={shade.textColor(
                                color.value,
                                color.light_text,
                              )}
                              data-react="brightness"
                              data-gap="15"
                              data-space="25"
                              data-direction="column"
                              data-align="start"
                              onClick={() => {
                                copyHex(hex, `${shade.label} ${color.name}`);
                                   closePopover();
                              }}
                            >
                              <group
                                data-width="auto"
                                data-gap="15"
                                data-animation-name="appear-bottom"
                                data-fill-mode="backwards"
                                data-animation-duration="2.25"
                              >
                                <text
                                  data-wrap="wrap"
                                  data-weight="700"
                                  data-text-size="medium"
                                  data-font-type="hero"
                                  data-line="1"
                                >
                                  {shade.label}
                                  <br />
                                  {color.name}
                                </text>
                                <text
                                  data-wrap="wrap"
                                  data-line="1.2"
                                  data-opacity="70"
                                >
                                  {color.description}
                                </text>
                              </group>

                              <group
                                data-width="auto"
                                data-gap="15"
                                data-animation-name="appear-bottom"
                                data-fill-mode="backwards"
                                data-animation-duration="2.75"
                              >
                                <separator
                                  data-horizontal=""
                                  data-interact=""
                                />
                                <text
                                  data-wrap="wrap"
                                  data-line="1.2"
                                  data-text-transform="uppercase"
                                  data-opacity="70"
                                >
                                  {hex.replace("#", "")}
                                </text>
                              </group>
                            </group>
                          </Ripple>
                        </group>
                      )}
                    >
                      <group
                        data-interactive=""
                        data-over-color="none"
                        data-ratio="1:1"
                        data-expand-react="space"
                        data-duration="1.25"
                        data-transition-prop="padding"
                      >
                        <group
                          data-expand-react="radius"
                          data-duration="2.25"
                          data-transition-prop="border-radius"
                          data-interactive=""
                          data-interact=""
                          data-radius="15"
                          data-height="fit"
                          data-background={color.value + shade.suffix}
                          data-color={shade.textColor(
                            color.value,
                            color.light_text,
                          )}
                        />
                      </group>
                    </Popover>
                  );
                })}
              </group>
          ))}
        </group>
      </group>
    </group>
  );
};

export default Colors;
