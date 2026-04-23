import React from "react";
import Popover from "../components/popover";
import Ripple from "../components/Ripple";
import { BaseColors } from "./utils/colorData";

// Define the color options inside the component, as it's only used here
const colorOptions = [
  {
    title: "Default & Specials",

    items: [
      { value: "text" },
      { value: "main-background" },
      { value: "main" },
      { value: "main-text" },
      { value: "secondary-text" },
    ],
  },

  {
    title: "Primary & Secondary Shades ",

    items: [
      { value: "main-lightest" },
      { value: "main-lighter" },
      { value: "main-light" },
      { value: "main-soft" },
      { value: "main" },
      { value: "main-deep" },
      { value: "main-dark" },
      { value: "main-darker" },
      { value: "main-darkest" },

      { value: "secondary-lightest" },
      { value: "secondary-lighter" },
      { value: "secondary-light" },
      { value: "secondary-soft" },
      { value: "secondary" },
      { value: "secondary-deep" },
      { value: "secondary-dark" },
      { value: "secondary-darker" },
      { value: "secondary-darkest" },
    ],
  },

  // {
  //   title: "Neutral Shade",

  //   items: [
  //     { value: "neutral-lightest" },
  //     { value: "neutral-lighter" },
  //     { value: "neutral-light" },
  //     { value: "neutral-soft" },
  //     { value: "neutral" },
  //     { value: "neutral-deep" },
  //     { value: "neutral-dark" },
  //     { value: "neutral-darker" },
  //     { value: "neutral-darkest" },
  //   ],
  // },

  {
    title: "Base Colors",
    type: "complex",
    items: [...BaseColors.map((item) => ({ value: item.value }))],
  },
];

interface ColorPickerProps {
  selectedColor: string;
  handleColorSelect: (color: string) => void;
}

const SystemColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  handleColorSelect,
}) => (
  <Popover
    bottomsheet
    placement="mouse"
    data-radius="30"
    data-scroll=""
    data-space="0"
    bottomsheetProps={{
      "data-space": "0",

      "data-scroll": "",
      "data-direction": "column",
      "data-wrap": "no",
      "data-height": "600",
      "data-scrollbar": "none",
    }}
    content={(closePopover, isBottomSheet) => (
      <group
        data-direction="column"
        data-length={isBottomSheet ? undefined : "300"}
        //  onClick={closePopover}
      >
        <group
          data-space={isBottomSheet ? "30" : "20"}
          data-space-top={isBottomSheet ? "30" : "20"}
          data-gap={isBottomSheet ? "30" : "20"}
        >
          {colorOptions.map((group, index) =>
            group.type === "complex" ? (
              <group key={index} data-gap={isBottomSheet ? "30" : "20"}>
                <group>
                  <text>{group.title}</text>
                </group>

                <group
                  data-type="grid"
                  //  data-gap="2"
                  data-grid-template-columns="9"
                  data-gap="2"
                >
                  {group.items.map((basecolor, colorindex) => (
                    <group key={colorindex} data-gap="2">
                      <group
                        data-ratio="1:1"
                        data-interactive=""
                        data-over-color="none"
                        onClick={() =>
                          handleColorSelect(basecolor.value + "-light")
                        }
                      >
                        <group
                          data-radius={
                            selectedColor === basecolor.value + "-light"
                              ? "30"
                              : "25%"
                          }
                          data-margin={
                            selectedColor === basecolor.value + "-light"
                              ? "5"
                              : undefined
                          }
                          data-duration=".125"
                          data-react="background"
                          data-over-color="neutral-10"
                          data-background={basecolor.value + "-light"}
                          data-cursor="pointer"
                          data-direction="column"
                          data-interact=""
                          data-transition-prop="border-radius-margin"
                        ></group>
                      </group>

                      <group
                        data-ratio="1:1"
                        data-interactive=""
                        data-over-color="none"
                        onClick={() => handleColorSelect(basecolor.value)}
                      >
                        <group
                          data-radius={
                            selectedColor === basecolor.value ? "30" : "25%"
                          }
                          data-margin={
                            selectedColor === basecolor.value ? "5" : ""
                          }
                          data-duration=".125"
                          data-react="background"
                          data-over-color="neutral-10"
                          data-background={basecolor.value}
                          data-cursor="pointer"
                          data-direction="column"
                          data-interact=""
                          data-transition-prop="border-radius-margin"
                        ></group>
                      </group>

                      <group
                        data-ratio="1:1"
                        data-interactive=""
                        data-over-color="none"
                        onClick={() =>
                          handleColorSelect(basecolor.value + "-dark")
                        }
                      >
                        <group
                          data-radius={
                            selectedColor === basecolor.value + "-dark"
                              ? "30"
                              : "25%"
                          }
                          data-margin={
                            selectedColor === basecolor.value + "-dark"
                              ? "5"
                              : ""
                          }
                          data-duration=".125"
                          data-react="background"
                          data-over-color="neutral-10"
                          data-background={basecolor.value + "-dark"}
                          data-cursor="pointer"
                          data-direction="column"
                          data-interact=""
                          data-transition-prop="border-radius-margin"
                        ></group>
                      </group>
                    </group>
                  ))}
                </group>
              </group>
            ) : (
              <group key={index} data-gap={isBottomSheet ? "30" : "20"}>
                <group>
                  <text>{group.title}</text>
                </group>

                <group
                  data-type="grid"
                  //     data-gap="2"
                  data-grid-template-columns="9"
                  data-gap="2"
                >
                  {group.items.map((systemcolor, systemcolorindex) => (
                    <group
                      data-ratio="1:1"
                      key={systemcolorindex}
                      onClick={() => handleColorSelect(systemcolor.value)}
                      data-interactive=""
                      data-over-color="none"
                      data-cursor="pointer"
                    >
                      <group
                        //    data-border="outline-soft"
                        data-interact=""
                        data-transition-prop="border-radius-margin"
                        data-duration=".125"
                        data-over-color="neutral-10"
                        data-react="background"
                        data-border={
                          systemcolor.value === "main-background"
                            ? "outline"
                            : "none"
                        }
                        data-radius={
                          selectedColor === systemcolor.value ? "30" : "25%"
                        }
                        data-margin={
                          selectedColor === systemcolor.value ? "5" : ""
                        }
                        data-background={systemcolor.value}
                        data-align="center"
                        data-justify="center"
                        data-space="5"
                      ></group>
                    </group>
                  ))}
                </group>
              </group>
            ),
          )}
        </group>
        <group data-position="bottom">
          <separator data-horizontal="dotted"></separator>
        </group>

        <group
          data-space={isBottomSheet ? "30" : "20"}
          data-background="main-background-bottom"
          data-shrink="no"
          data-position="sticky"
          data-bottom="0"
          data-index="3"
        >
          <Ripple>
            <group
              onClick={closePopover}
              data-over-color="neutral"
              data-ink-color="neutral"
              data-contain=""
              data-space="15"
              data-radius="30"
              data-interactive=""
              data-align="center"
              data-justify="center"
              data-cursor="pointer"
              data-backdrop="20"
            >
              <text data-weight="600">Done</text>
            </group>
          </Ripple>
        </group>
      </group>
    )}
  >
    <group>
      <Ripple>
        <group
          data-align="center"
          data-gap="15"
          data-wrap="no"
          data-space="20"
          data-interactive=""
          data-over-color="neutral"
          data-cursor="pointer"
          data-ink-color="neutral"
        >
          <group
            data-width="auto"
            //data-min-length="80"
          >
            <group
              data-space-horizontal="15"
              data-space-vertical="10"
              data-background="text"
              data-width="auto"
              data-color="main-background"
              data-radius="30"
            >
              <text>Color</text>
            </group>
          </group>

          <separator data-vertical=""></separator>

          <group
            data-align="center"
            data-gap="10"
            data-wrap="no"
            data-contain=""
          >
            <group
              data-align="center"
              data-justify="center"
              data-background="adaptive-gray"
              data-width="auto"
              data-radius="10"
              data-space-vertical="10"
              data-space-horizontal="15"
              data-contain=""
            >
              <text data-ellipsis="">{selectedColor}</text>
            </group>

            {/* <text data-opacity="30" data-position="right">
            Pick
          </text> */}

            <group
              data-position="right"
              data-align="center"
              data-width="auto"
              data-height="fit"
              data-space="5"
              data-interact=""
            >
              <group
                data-length="20"
                data-height="20"
                data-border="outline"
                data-background={selectedColor}
                data-radius="30"
              ></group>
            </group>
          </group>
        </group>
      </Ripple>
    </group>
  </Popover>
);

export default SystemColorPicker;
