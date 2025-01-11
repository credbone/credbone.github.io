import React, { useState } from "react";

import Popover from "../components/popover";
import Ripple from "../components/Ripple";
import { BaseColors } from "./utils/colorData";
import CustomSlider from "../components/inputs/slider";

const TypefaceTokens: React.FC = () => {
  

  const [selectedWeight, setSelectedWeight] = useState<string>("400");
  const [selectedAlignment, setSelectedAlignment] = useState<string>("left");
  const [selectedSize, setSelectedSize] = useState<string>("large");
  const [selectedColor, setSelectedColor] = useState<string>("text");
  const [LineValue, setLineValue] = useState(1.2);
  const [selectedTransform, setselectedTransform] = useState<string>("none");


  // const isTransparent = selectedColor === "transparent";
  const isbackground = selectedColor === "main-background";
  const istextmain = selectedColor === "main-text";
  const istextsecondary = selectedColor === "secondary-text";
  const ismain = selectedColor === "main";

  // Weight options to map over
  const weightOptions = [
    { value: "300", name: "Light" },
    { value: "400", name: "Regular" },
    { value: "600", name: "Semi-Bold" },
    { value: "700", name: "Bold" },
    { value: "800", name: "Extra-Bold" },
  ];

  // Alignment options
  const alignmentOptions = [
    { value: "left", title: "Left" },
    { value: "center", title: "Center" },
    { value: "right", title: "Right" },
  ];

    // Alignment options
    const transformOptions = [
      { value: "none" },
      { value: "capitalize" },
      { value: "uppercase" },
      { value: "lowercase" },
    ];

  // Alignment options
  const sizeOptions = [
    { value: "0", title: "Extra Option" },
    { value: "", title: "", type: "separator" },

    { value: "small", title: "Small" },
    { value: "medium", title: "Medium" },
    { value: "large", title: "Large" },
    { value: "x-large", title: "Extra Large" },
    { value: "xx-large", title: "Double Large" },
    { value: "xxx-large", title: "Triple Large" },
    { value: "", title: "", type: "separator" },

    // { value: "36", title: "Headline Small" },
    { value: "48", title: "Headline Medium" },
    { value: "64", title: "Headline Large" },
    // { value: "72", title: "Display Small" },
    // { value: "96", title: "Display Medium" },
    { value: "128", title: "Display Large" },
  ];

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

  // Handle weight selection
  const handleWeightSelect = (weight: string) => {
    setSelectedWeight(weight);
  };

  // Handle alignment selection
  const handleAlignmentSelect = (alignment: string) => {
    setSelectedAlignment(alignment);
  };
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };


  const handleTransformSelect = (transform: string) => {
    setselectedTransform(transform);
  };


  return (
    <group data-gap="30">
      <group
        data-direction="column"
        data-gap="30"
        data-background="adaptive-gray"
        data-radius="20"
        data-justify="end"
        data-space="30"
      >
        <group data-height="50" data-adaptive="desktop"></group>

        <group data-direction="column" data-gap="10">
          <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap">
            Tokens
          </text>
          <text
            data-wrap="wrap"
            data-line="1.5"
            //   data-opacity="60"
            data-max-length="400"
          >
            Design parameters applicable for text components, including style,
            spacing, and alignment properties.
          </text>
        </group>
      </group>

      <group data-gap="15" data-align="start">
        <group data-space="20">
          <text
            data-wrap="wrap"
            data-line="1.5"
            //   data-opacity="60"
            data-max-length="400"
          >
            This demo showcases token functionality for value demonstration
            only. Combine tokens thoughtfully to create valid and effective
            designs.
          </text>
        </group>

        <group
          data-fit="1"
          data-width="auto"
        //  data-min-length="300"
          data-gap="15"
        >
          <group data-border="" data-radius="15" data-contain="">
            <Popover
              placement="middle"
              data-radius="10"
              data-space="0"
              data-space-vertical="10"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  //   data-length="240"
                  onClick={closePopover}
                >
                  {weightOptions.map(({ value, name }) => (
                    <group
                      key={value}
                      onClick={() => handleWeightSelect(value)}
                      data-background={selectedWeight === value ? "main" : ""}
                      data-color={selectedWeight === value ? "main-text" : ""}
                      data-align="center"
                      data-interactive=""
                      data-over-color="neutral"
                      //  data-radius="5"
                      data-cursor="pointer"
                      data-space="15"
                      data-gap="10"
                    >
                      <text data-weight={value}> {value}</text>
                      <text data-opacity="40"> {name}</text>
                    </group>
                  ))}
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
                        <text>Weight</text>
                      </group>
                    </group>

                    <separator data-vertical=""></separator>

                    <group data-align="center" data-contain="" data-gap="10" data-wrap="no">
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
                        <text data-ellipsis="">{selectedWeight}</text>
                      </group>

                      <text data-opacity="30" data-position="right">
                        Change
                      </text>
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>

            <separator data-horizontal=""></separator>

            <Popover
              //   data-backdrop="10"
              placement="middle"
              data-radius="10"
              data-space="0"
              //data-space-vertical="10"
              data-scroll=""
              content={(closePopover) => (
                <group
                  data-direction="column"
                  //  data-length="240"
                  onClick={closePopover}
                >
                  <group data-height="10"></group>
                  {sizeOptions.map(({ value, title, type }, index) =>
                    type === "separator" ? (
                      <group key={index} data-space-vertical="10">
                        <separator data-horizontal=""></separator>
                      </group>
                    ) : (
                      <group
                        key={value}
                        onClick={() => handleSizeSelect(value)}
                        data-background={selectedSize === value ? "main" : ""}
                        data-color={selectedSize === value ? "main-text" : ""}
                        data-align="center"
                        data-interactive=""
                        data-over-color="neutral"
                        //  data-radius="5"
                        data-cursor="pointer"
                        data-space="15"
                      >
                        <text>{title}</text>
                        <text data-position="right">{value}</text>
                      </group>
                    )
                  )}
                  <group data-height="10"></group>

                  <group
                    data-sticky="bottom"
                    data-gap="10"
                    data-background="context"
                    data-shrink="0"
                  >
                    <group>
                      <separator data-horizontal=""></separator>
                    </group>

                    <group
                      data-align="center"
                      data-interactive=""
                      data-over-color="neutral"
                      //  data-radius="5"
                      data-cursor="pointer"
                      data-space="15"
                      onClick={closePopover}
                    >
                      <text data-weight="700">Close</text>
                    </group>
                  </group>
                  <group data-height="10"></group>
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
                        data-interact=""
                      >
                        <text>Size</text>
                      </group>
                    </group>

                    <separator data-vertical=""></separator>

                    <group data-align="center" data-contain="" data-wrap="no" data-gap="10">
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
                        <text data-ellipsis="">{selectedSize}</text>
                      </group>

                      <text data-opacity="30" data-position="right">
                        Select
                      </text>
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>
          </group>

          <group data-space="20">
            <text
              data-wrap="wrap"
              data-line="1.5"
              //   data-opacity="60"
              data-max-length="400"
            >
              System-provided colors for this component include default,
              auto-generated, and predefined options.
            </text>
          </group>

          <group
            data-elevation="2"
            data-index="2"
            data-radius="15"
            data-contain=""
          >
            <Popover
              placement="mouse"
              data-radius="20"
              data-scroll=""
              data-space="20"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  data-length="300"
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
                                      : ""
                                  }
                                  data-margin={
                                    selectedColor === basecolor.value + "-light"
                                      ? "5"
                                      : ""
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
          </group>

          <group data-space="20">
            <text
              data-wrap="wrap"
              data-line="1.5"
              //   data-opacity="60"
              data-max-length="400"
            >
              Some demo values are predefined. Defaults and amounts can adapt
              based on system requirements.
            </text>
          </group>

          <group data-border="" data-radius="15" data-contain="">
            <group data-align="center" data-gap="15" data-space="15">
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
                  <text>Alignment</text>
                </group>
              </group>

              <separator data-vertical="adaptive"></separator>

              <group data-gap="5" data-width="auto" data-wrap="no">
                {alignmentOptions.map(({ value, title }) => (
                  <group
                    key={value}
                    onClick={() => handleAlignmentSelect(value)}
                    data-align="center"
                    data-justify="center"
                    data-background={
                      selectedAlignment === value ? "highlight" : ""
                    }
                    data-border={
                      selectedAlignment === value ? "none" : "outline"
                    }
                    data-width="auto"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="10"
                    data-cursor="pointer"
                    data-space-vertical="10"
                    data-space-horizontal="15"
                  >
                    <text>{value}</text>
                  </group>
                ))}
              </group>
            </group>
            <separator data-horizontal=""></separator>
            <group data-align="center" data-gap="15" data-space="15">
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
                  <text>Line Height</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={0.1}
                  start={1}
                  end={1.5}
                  value={LineValue}
                  onValueChange={(value) => setLineValue(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
          </group>


          <group data-border="" data-radius="15" data-contain="">
            <Popover
              placement="middle"
              data-radius="10"
              data-space="0"
              data-space-vertical="10"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  //   data-length="240"
                  onClick={closePopover}
                >
                  {transformOptions.map(({ value }) => (
                    <group
                      key={value}
                      onClick={() => handleTransformSelect(value)}
                      data-background={selectedTransform === value ? "main" : ""}
                      data-color={selectedTransform === value ? "main-text" : ""}
                      data-align="center"
                      data-interactive=""
                      data-over-color="neutral"
                      //  data-radius="5"
                      data-cursor="pointer"
                      data-space="15"
                      data-gap="10"
                    >
                      <text data-text-transform="capitalize" data-weight={value}>{value}</text>
                      <text data-position="right" data-opacity="40" data-text-transform={value}>aa</text>
                    </group>
                  ))}
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
                        <text data-ellipsis="">Transform</text>
                      </group>
                    </group>

                    <separator data-vertical=""></separator>

                    <group data-align="center"  data-contain="" data-gap="10" data-wrap="no">
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
                        <text data-ellipsis="">{selectedTransform}</text>
                      </group>

                      <text data-opacity="30" data-position="right">
                        Change
                      </text>
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>
</group>

        </group>

        <group
          data-sticky="top"
          data-top="15"
          data-direction="column"
          data-fit="2"
          data-border=""
          data-radius="15"
          data-background={
            isbackground
              ? "text"
              : istextmain
              ? "main"
              : istextsecondary
              ? "secondary"
              : ""
          }
        >
          <text
            data-space="30"
            data-weight={selectedWeight}
            data-text-align={selectedAlignment}
            data-text-size={selectedSize}
            data-color={selectedColor}
            data-line={LineValue}
            data-text-transform={selectedTransform}
            data-wrap="wrap"
            data-length="fit"
            data-ellipsis=""
          >
            Sample {selectedSize} text <br></br>with weight {selectedWeight} and
            alignment {selectedAlignment}
          </text>

          {isbackground ? (
            <group data-color="main-background" data-gap="20" data-space="30"  data-space-top="0">
              <separator data-horizontal=""></separator>
              <text data-wrap="wrap" data-line="1.5" data-max-length="400">
                Text color can also serve as the background, enabling inverted
                designs that adapt to the system theme
              </text>
            </group>
          ) : istextmain || istextsecondary ? (
            <group
              data-color={
                istextmain
                  ? "main-text"
                  : istextsecondary
                  ? "secondary-text"
                  : ""
              }
              data-gap="20"
              data-space="30"
              data-space-top="0"
            >
              <separator data-horizontal=""></separator>
              <text data-wrap="wrap" data-line="1.5" data-max-length="300">
                Ensuring optimal contrast on main & secondary backgrounds with
                system-generated colors
              </text>
            </group>
          ) : ismain ? (
            <group data-gap="20" data-space="30"  data-space-top="0">
              <separator data-horizontal=""></separator>
              <text data-wrap="wrap" data-line="1.5" data-max-length="300">
                If the main color lacks contrast, a different shade will be
                used, with variations in dark and light modes.
              </text>
            </group>
          ) : (
            <group data-gap="20" data-space="30"  data-space-top="0">
              <separator data-horizontal=""></separator>
              <text
                data-wrap="wrap"
                data-line="1.5"
                data-max-length="200"
                data-opacity="60"
              >
                Adjust the values to explore how they affect the text
              </text>
            </group>
          )}
        </group>
      </group>
    </group>
  );
};

export default TypefaceTokens;
