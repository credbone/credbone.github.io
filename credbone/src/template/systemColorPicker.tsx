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

const SystemColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, handleColorSelect }) => (
    <Popover
    placement="mouse"
    data-radius="20"
    data-scroll=""
    data-space="20"
    content={(closePopover) => (
      <group
        data-direction="column"
        data-length="270"
        //  onClick={closePopover}
        data-gap="20"
      >
        {colorOptions.map((group, index) =>
          group.type === "complex" ? (
            <group key={index} data-gap="20">
              <group>
                <text>{group.title}</text>
              </group>

              <group
                data-type="grid"
                //  data-gap="5"
                data-grid-template="30"
              >
                {group.items.map((basecolor, colorindex) => (
                  <group key={colorindex}>
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
                            : undefined
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
                        //  data-border="outline-soft"
                      ></group>
                    </group>

                    <group
                      data-ratio="1:1"
                      data-interactive=""
                      data-over-color="none"
                      onClick={() =>
                        handleColorSelect(basecolor.value)
                      }
                    >
                      <group
                        data-radius={
                          selectedColor === basecolor.value
                            ? "30"
                            : "0"
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
                        // data-border="outline-soft"
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
                            : ""
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
                        //   data-border="outline-soft"
                      ></group>
                    </group>
                  </group>
                ))}
              </group>
            </group>
          ) : (
            <group key={index} data-gap="20">
              <group>
                <text>{group.title}</text>
              </group>

              <group
                data-type="grid"
                //     data-gap="5"
                data-grid-template="30"
              >
                {group.items.map((systemcolor, systemcolorindex) => (
                  <group
                    data-ratio="1:1"
                    key={systemcolorindex}
                    onClick={() =>
                      handleColorSelect(systemcolor.value)
                    }
                    data-interactive=""
                    data-over-color="none"
                    data-cursor="pointer"
                  >
                    <group
                      //    data-border="outline-soft"
                      data-duration=".125"
                      data-over-color="neutral-10"
                      data-react="background"
                      data-border={
                        systemcolor.value === "main-background"
                          ? "outline"
                          : "none"
                      }
                      data-radius={
                        selectedColor === systemcolor.value
                          ? "30"
                          : ""
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
          )
        )}

        {/* <separator data-horizontal=""></separator> */}

        <Ripple>
          <group
            data-wrap="no"
            data-ink-color="neutral"
            data-over-color="neutral"
            data-align="center"
            data-cursor="pointer"
            data-contain=""
            data-background="adaptive-gray"
            data-interactive=""
            data-space="15"
            data-radius="10"
            // data-height="80"
            data-gap="20"
            onClick={closePopover}
            data-direction="column"
          >
            <text data-weight="600">Close</text>
          </group>
        </Ripple>
      </group>
    )}
  >
    <group>
      <Ripple>
        <group
          data-align="center"
          data-gap="15"
          data-wrap="no"
          data-space="15"
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
            >
              <text data-ellipsis="">{selectedColor}</text>
            </group>

            {/* <text data-opacity="30" data-position="right">
            Pick
          </text> */}

            <group
              data-position="right"
              data-length="20"
              data-height="20"
              data-border="outline"
              data-background={selectedColor}
              data-radius="30"
            ></group>
          </group>
        </group>
      </Ripple>
    </group>
  </Popover>
);

export default SystemColorPicker;
