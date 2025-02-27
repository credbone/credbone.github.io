import React from "react";

import { BaseColors } from "./utils/colorData";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";

import CustomColorPicker from "./theme/CustomColorPicker";
import TemplatePageHeader from "./TemplatePageHeader";

export const ColorPalette = [
  { textcolor: "-darker", code: "-lightest", name: "Lightest", description: "100", },
  { textcolor: "-darker", code: "-lighter", name: "Lighter", description: "200", },
  { textcolor: "-darker", code: "-light", name: "Light", description: "300" },
  { textcolor: "-text", code: "-soft", name: "Soft", description: "400" },
  { textcolor: "-text", code: "", name: "Base", description: "500" },
  { textcolor: "-lighter", code: "-deep", name: "Deep", description: "600" },
  { textcolor: "-lighter", code: "-dark", name: "Dark", description: "700" },
  { textcolor: "-lightest", code: "-darker", name: "Darker", description: "800", },
  { textcolor: "-lightest", code: "-darkest", name: "Darkest", description: "900", },
];

const Colors: React.FC = () => {
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
        version="3.0.1"
        type="Token"
        descriptionProps={{ "data-length": "600" }}
      />

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="large">
              Primary Color
            </text>
          </group>

          <group
            data-gap="30"
            // data-width="auto" data-border="" data-radius="15" data-space="20"
          >
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
              data-radius="10"
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
                  data-radius="10"

                >
                  <text data-weight="700">Swatches</text>
                  <text data-opacity="30">Select from presets</text>
                </group>
              </group>
            </Popover>
            <separator data-vertical="adaptive" data-height=""></separator>
            <CustomColorPicker target="primary" />
          </group>
        </group>

        <group
          data-type="grid"
          data-grid-template="110"
          data-gap="5"
          data-contain=""
          data-radius="10"
        >
          {ColorPalette.map((color, index) => (
            <group
              key={index}
              data-contain=""
              data-length="auto"
              data-shrink="no"
              data-direction="column"
              data-ratio="1:1"
              data-justify="end"
              data-width="auto"
              data-space="20"
              data-background={"main" + color.code}
              data-color={"main" + color.textcolor}
              data-wrap="no"
            >
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-ellipsis="" data-weight="700">
                {color.name}
              </text>
            </group>
          ))}
        </group>
      </group>

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="large">
              Secondary Color
            </text>
          </group>

          <group
            data-gap="30"
            //  data-width="auto" data-border="" data-radius="15" data-space="20"
          >
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
              data-radius="10"
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
                  data-radius="10"
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

        <group
          data-type="grid"
          data-grid-template="110"
          data-gap="5"
          data-contain=""
          data-radius="10"
        >
          {ColorPalette.map((color, index) => (
            <group
              key={index}
              data-contain=""
              data-length="auto"
              data-shrink="no"
              data-direction="column"
              data-ratio="1:1"
              data-justify="end"
              data-width="auto"
              data-space="20"
              data-background={"secondary" + color.code}
              data-color={"secondary" + color.textcolor}
              data-wrap="no"
            >
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-ellipsis="" data-weight="700">
                {color.name}
              </text>
            </group>
          ))}
        </group>
      </group>

      <group data-gap="30">
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="large">
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
              Neutral colors provide a versatile base for the UI, with shades
              generated for balance and flexibility.
            </text>
          </group>
        </group>

        <group
          data-type="grid"
          data-grid-template="110"
          data-gap="5"
          data-contain=""
          data-radius="10"
        >
          {ColorPalette.map((color, index) => (
            <group
              key={index}
              data-contain=""
              data-length="auto"
              data-shrink="no"
              data-direction="column"
              data-ratio="1:1"
              data-justify="end"
              data-width="auto"
              data-space="20"
              data-background={"neutral" + color.code}
              data-color={"neutral" + color.textcolor}
              data-wrap="no"
            >
              <text data-ellipsis="" data-light="" data-color="reset">
                {color.description}
              </text>
              <text data-ellipsis="" data-weight="700" data-color="reset">
                {color.name}
              </text>
            </group>
          ))}
        </group>
      </group>

      <group data-gap="30">
        <group data-direction="column" data-gap="15" data-space="30">
          <text data-weight="700" data-text-size="large" data-wrap="wrap">
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
          data-contain=""
          data-radius="10"
        >
          {BaseColors.map((colors, index) => (
            <group
              data-background="main-background"
              key={index}
              data-contain=""
              data-direction="column"
              data-wrap="no"
            >
              <group
                data-interact=""
                data-position="bottom"
                data-wrap="no"
                data-direction="column"
                data-gap="5"
                data-height="fit"
              >
                <Popover
                  data-background={colors.value + "-light"}
                  data-length="160"
                  data-space={null}
                  data-radius="20"
                  data-elevation={null}
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="1.25"
                  content={(closePopover) => (
                    <group
                      onClick={closePopover}
                      data-direction="column"
                      data-color={colors.value + "-darker"}
                      data-space="10"
                    >
                      <group
                        data-gap="10"
                        data-space="20"
                        data-direction="column"
                      >
                        <text
                          data-wrap="wrap"
                          data-weight="700"
                          data-text-size="large"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.25"
                          data-font-type="hero"
                          data-line="1"
                        >
                          Light <br></br> {colors.name}
                        </text>
                        <text
                          data-wrap="wrap"
                          data-line="1.5"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.75"
                          data-opacity="70"
                        >
                          {colors.description}
                        </text>
                      </group>

                      <group
                        data-interactive=""
                        data-cursor="pointer"
                        data-over-color="neutral"
                        data-width="auto"
                        data-space="15"
                        data-justify="center"
                        data-align="center"
                        data-radius="10"
                        data-background={colors.value + "-darker"}
                        data-color={colors.value + "-light"}
                      >
                        <text data-weight="700">Done</text>
                      </group>
                    </group>
                  )}
                >
                  <group
                    data-interactive=""
                    data-cursor="pointer"
                    data-ratio="1:1"
                    data-background={colors.value + "-light"}
                  ></group>
                </Popover>

                <Popover
                  data-background={colors.value}
                  data-length="160"
                  data-space={null}
                  data-radius="20"
                  data-elevation={null}
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="1.25"
                  content={(closePopover) => (
                    <group
                      onClick={closePopover}
                      data-direction="column"
                      data-color={
                        colors.light ? colors.value + "-darker" : "white"
                      }
                      data-space="10"
                    >
                      <group
                        data-gap="10"
                        data-direction="column"
                        data-space="20"
                      >
                        <text
                          data-wrap="wrap"
                          data-weight="700"
                          data-text-size="large"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.25"
                          data-font-type="hero"
                          data-line="1"
                        >
                          Base <br></br> {colors.name}
                        </text>
                        <text
                          data-wrap="wrap"
                          data-line="1.5"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.75"
                          data-opacity="70"
                        >
                          {colors.description}
                        </text>
                      </group>

                      <group
                        data-interactive=""
                        data-cursor="pointer"
                        data-over-color="neutral"
                        data-width="auto"
                        data-space="15"
                        data-justify="center"
                        data-align="center"
                        data-radius="10"
                        data-background={
                          colors.light ? colors.value + "-darker" : "white"
                        }
                        data-color={colors.value}
                      >
                        <text data-weight="700">Done</text>
                      </group>
                    </group>
                  )}
                >
                  <group
                    data-interactive=""
                    data-cursor="pointer"
                    data-ratio="1:1"
                    data-background={colors.value}
                  ></group>
                </Popover>

                <Popover
                  data-background={colors.value + "-dark"}
                  data-length="160"
                  data-space={null}
                  data-radius="20"
                  data-elevation={null}
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="1.25"
                  content={(closePopover) => (
                    <group
                      onClick={closePopover}
                      data-direction="column"
                      data-color={colors.value + "-lighter"}
                      data-space="10"
                    >
                      <group
                        data-gap="10"
                        data-direction="column"
                        data-space="20"
                      >
                        <text
                          data-wrap="wrap"
                          data-weight="700"
                          data-text-size="large"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.25"
                          data-font-type="hero"
                          data-line="1"
                        >
                          Dark <br></br> {colors.name}
                        </text>
                        <text
                          data-wrap="wrap"
                          data-line="1.5"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.75"
                          data-opacity="70"
                        >
                          {colors.description}
                        </text>
                      </group>

                      <group
                        data-interactive=""
                        data-cursor="pointer"
                        data-over-color="neutral"
                        data-width="auto"
                        data-space="15"
                        data-justify="center"
                        data-align="center"
                        data-radius="10"
                        data-background={colors.value + "-lighter"}
                        data-color={colors.value + "-dark"}
                      >
                        <text data-weight="700">Done</text>
                      </group>
                    </group>
                  )}
                >
                  <group
                    data-interactive=""
                    data-cursor="pointer"
                    data-ratio="1:1"
                    data-background={colors.value + "-dark"}
                  ></group>
                </Popover>
              </group>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};
export default Colors;
