import React, { useState } from "react";
import CustomSlider from "../components/inputs/slider";

import sectionImage from "../styles/images/samples/wide_res_72.webp";
import { ArrowRight } from "lucide-react";
import Tooltip from "../components/tooltip";

const Divider: React.FC = () => {
  const [selectedDimension, setselectedDimension] = useState(50);
  const [selectedOpacity, setselectedOpacity] = useState(20);
  const [selectedType, setSelectedType] = useState<string>("");

  const [isInverted, setIsInverted] = useState(true);

  const toggleInvert = () => {
    setIsInverted((prev) => !prev);
  };

  const typeOptions = [
    { value: "", name: "Solid" },
    { value: "dotted", name: "Dotted" },
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  return (
    <group data-space="30" data-gap="30">
      <group
        data-direction="column"
        data-gap="30"
        data-background="adaptive-gray"
        data-radius="20"
        data-justify="end"
        data-space="30"
      >
        <group data-direction="column">
          <group data-gap="20" data-align="center">
            <group
              data-space-horizontal="20"
              data-space-vertical="10"
              data-background="text"
              data-width="auto"
              data-color="main-background"
              data-radius="30"
            >
              <text>Token</text>
            </group>
            <separator data-vertical=""></separator>
            <text>Version 2.0.0</text>
          </group>
        </group>
        <separator data-horizontal=""></separator>

        <group data-height="100" data-adaptive="desktop"></group>

        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            //  data-color="main"
            data-ellipsis=""
          >
            Divider & Space
          </text>
          <text data-wrap="wrap" data-length="400" data-line="1.5">
            Dividers organize and separate content, while space tokens define
            consistent spacing across layouts.
          </text>
        </group>
      </group>

      <group data-gap="30">
        <group
          data-border=""
          data-radius="20"
          data-space="50"
          data-align="center"
          data-direction="column"
          data-fit="1"
          data-min-length="300"
        >
          <group
            data-radius="20"
            data-align="center"
            data-justify="center"
            data-direction="column"
            data-background="text"
            data-color="main-background"
            data-height="40"
            data-length="40"
            data-weight="700"
          >
            <text>1</text>
          </group>
          <separator
            data-vertical=""
            data-height="50"
            // data-opacity="60"
          ></separator>
          <group data-wrap="no" data-align="center">
            <separator data-horizontal=""></separator>
            <group
              data-border="2"
              data-index="2"
              data-height="3"
              data-length="3"
              data-radius="5"
            ></group>
            <separator data-horizontal=""></separator>
          </group>
        </group>

        <group
          data-border=""
          data-background="text"
          data-color="main-background"
          data-radius="20"
          data-space="50"
          data-align="center"
          data-direction="column"
          data-fit="1"
          data-min-length="300"
        >
          <group
            data-radius="20"
            data-align="center"
            data-justify="center"
            data-direction="column"
            data-background="main-background"
            data-color="text"
            data-height="40"
            data-length="40"
            data-weight="700"
          >
            <text>1</text>
          </group>
          <separator
            data-vertical=""
            data-height="50"
            // data-opacity="60"
          ></separator>
          <group data-wrap="no" data-align="center">
            <separator data-horizontal=""></separator>
            <group
              data-border="2"
              data-index="2"
              data-height="3"
              data-length="3"
              data-radius="5"
            ></group>
            <separator data-horizontal=""></separator>
          </group>
        </group>
      </group>

      <group data-gap="20" data-space="50">
        <group
          data-radius="20"
          data-justify="center"
          data-align="center"
          data-direction="column"
          data-background="text"
          data-color="main-background"
          data-height="40"
          data-length="40"
          data-weight="700"
        >
          <text>1</text>
        </group>

        {/* <separator data-vertical="" data-height=""></separator> */}

        <group data-direction="column" data-width="auto" data-gap="5">
          <text data-weight="700">Divider</text>
          <text
            data-wrap="wrap"
            data-length="200"
            data-opacity="60"
            data-line="1.5"
          >
            Example of a horizontal divider in its default, unconfigured state
          </text>
        </group>
      </group>

      {/* <separator data-horizontal=""></separator> */}

      <group data-gap="15" data-type="grid" data-grid-template="300">
        <group data-border="" data-contain="" data-radius="15">
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
                <text>Space</text>
              </group>
            </group>

            <separator data-vertical=""></separator>

            <group data-fit="1">
              <CustomSlider
                handlerWidth={50}
                step={5}
                start={0}
                end={50}
                value={selectedDimension}
                onValueChange={(value) => setselectedDimension(value)}
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

        <group data-border="" data-contain="" data-radius="15">
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
                <text>Opacity</text>
              </group>
            </group>

            <separator data-vertical=""></separator>

            <group data-fit="1">
              <CustomSlider
                handlerWidth={50}
                step={10}
                start={0}
                end={100}
                value={selectedOpacity}
                onValueChange={(value) => setselectedOpacity(value)}
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

        <group data-border="" data-contain="" data-radius="15">
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
                <text>Type</text>
              </group>
            </group>

            <separator data-vertical=""></separator>

            <group data-gap="5" data-width="auto" data-wrap="no">
              {typeOptions.map(({ value, name }) => (
                <group
                  key={value}
                  onClick={() => handleTypeSelect(value)}
                  data-align="center"
                  data-justify="center"
                  data-background={selectedType === value ? "highlight" : ""}
                  data-border={selectedType === value ? "none" : "outline"}
                  data-width="auto"
                  data-interactive=""
                  data-over-color="neutral"
                  data-radius="10"
                  data-cursor="pointer"
                  data-space-vertical="10"
                  data-space-horizontal="15"
                >
                  <text>{name}</text>
                </group>
              ))}
            </group>
          </group>
        </group>
      </group>

      <group
        data-background={isInverted ? "text" : "highlight"}
        data-color={isInverted ? "main-background" : ""}
        data-radius="20"
        data-space="50"
        data-align="start"
        data-direction="column"
        data-gap="30"
      >
        <group data-align="center" data-direction="column">
          <group
            data-width="auto"
            data-align="center"
            data-direction="column"
            data-opacity={selectedOpacity === 0 ? "100" : "0"}
          >
            <Tooltip
              data-space="20"
              data-radius="15"
              content={
                selectedOpacity === 0 ? (
                  <text data-wrap="wrap" data-line="1.5" data-length="300">
                    The divider is now completely transparent, yet it still
                    functions as a separator and responds to the parent's gap.
                  </text>
                ) : (
                  ""
                )
              }
            >
              <group
                data-space="15"
                data-background={isInverted ? "main-background" : "text"}
                data-color={isInverted ? "text" : "main-background"}
                data-radius="10"
              >
                <text data-text-align="center" data-wrap="wrap">
                  Fully Transparent
                </text>
              </group>
            </Tooltip>
            <separator
              data-vertical=""
              data-height="40"
              data-opacity="60"
            ></separator>
          </group>

          <group data-space-horizontal={selectedDimension}>
            <separator
              data-horizontal={selectedType}
              data-opacity={selectedOpacity}
            ></separator>
          </group>
        </group>

        <group
          data-align="center"
          data-justify="center"
          data-color={isInverted ? "main-background" : "deep-orange-light"}
          data-gap="10"
        >
          <group data-wrap="no" data-align="center">
            <separator
              data-vertical=""
              data-height="15"
              data-opacity="100"
              data-position="absolute"
              data-left="0"
            ></separator>
            <group data-length={selectedDimension}>
              <separator data-horizontal="" data-opacity="100"></separator>
            </group>
            <separator
              data-vertical=""
              data-height="15"
              data-opacity="100"
            ></separator>
            <separator data-horizontal="" data-opacity="100"></separator>

            <separator
              data-vertical=""
              data-height="15"
              data-opacity="100"
            ></separator>

            <group data-length={selectedDimension}>
              <separator data-horizontal="" data-opacity="100"></separator>
            </group>

            <separator
              data-vertical=""
              data-height="15"
              data-opacity="100"
              data-position="absolute"
              data-right="0"
            ></separator>
          </group>

          <group data-align="center" data-justify="center" data-wrap="no">
            <group
              data-align="center"
              data-justify="center"
              data-length={selectedDimension}
            >
              <text>{selectedDimension}</text>
            </group>
            <group
              data-space-horizontal="20"
              data-direction="column"
              data-align="center"
            >
              <text>100%</text>
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-length={selectedDimension}
            >
              <text>{selectedDimension}</text>
            </group>
          </group>
        </group>

        <group data-direction="column">
          <text
            data-wrap="wrap"
            data-max-length="500"
            data-opacity="60"
            data-line="1.5"
          >
            Horizontal dividers allow customization of spacing, opacity, and
            color. Spacing adapts to the container by default, opacity ranges
            from 0 to 1, and color defaults to the container's text color.
          </text>
        </group>

        <group data-width="auto" data-gap="30">
          <separator data-horizontal=""></separator>
          <group
            data-space="15"
            data-align="center"
            data-justify="center"
            data-background="adaptive-gray"
            // data-border="outline"
            data-width="auto"
            data-interactive=""
            data-over-color="neutral"
            data-radius="10"
            data-cursor="pointer"
            onClick={toggleInvert}
          >
            <text>Invert</text>
          </group>
        </group>
      </group>

      <group></group>

      <group data-align="center" data-direction="column" data-gap="50">
        <group></group>
        <group
          data-space="20"
          data-type="grid"
          data-grid-template="300"
          data-gap="50"
        >
          <group data-wrap="no" data-align="center" data-gap="20">
            <separator data-horizontal=""></separator>
            <group
              data-direction="column"
              data-width="auto"
              data-align="center"
              data-text-align="center"
            >
              <text>Center Aligned Text</text>
              <text data-opacity="40" data-line="1.5">
                Example of a horizontal divider
              </text>
            </group>
            <separator data-horizontal=""></separator>
          </group>

          <group data-wrap="no" data-align="center" data-gap="10">
            {/* <group
            data-width="auto"
            data-wrap="no"
            data-align="center"
            data-gap="10"
          >
            <text>Left Aligned Text</text>
          </group> */}
            <separator data-horizontal=""></separator>
            <group
              data-space="10"
              data-align="center"
              data-justify="center"
              data-background=""
              data-border="outline"
              data-width="auto"
              data-interactive=""
              data-over-color="neutral"
              data-radius="10"
              data-cursor="pointer"
            >
              <group data-interact="">
                <ArrowRight size={20} />
              </group>
            </group>
            <separator data-horizontal=""></separator>
          </group>

          <group data-wrap="no" data-align="center">
            {/* <group
            data-width="auto"
            data-wrap="no"
            data-align="center"
            data-gap="10"
          >
            <text>Left Aligned Text</text>
          </group> */}
            <separator data-horizontal=""></separator>
            <group
              data-border=""
              data-width="auto"
              data-space="15"
              data-radius="10"
            >
              <text>Sample Title</text>
            </group>
            <separator data-horizontal=""></separator>
          </group>
        </group>
        <group></group>
        <group>
          <picture
            data-radius="30"
            data-contain=""
            data-brightness="adaptive"
            data-background="grey-light"
            data-position="absolute"
            data-object-position="right-bottom"
          >
            <img src={sectionImage} alt="" />
          </picture>

          <group data-space="30" data-width="auto">
            <group
              data-direction="column"
              data-radius="15"
              data-background="main-background"
              data-contain=""
              data-align="start"
              data-space="30"
              data-gap="20"
            >
              <group data-width="auto" data-gap="30">
                <group data-gap="30" data-direction="column-1200">
                  <text data-wrap="wrap" data-line="1.5" data-length="300">
                    Vertical dividers support spacing, opacity, and color
                    customization, with a default height of 30. Parameters are
                    configurable similarly to horizontal dividers.
                  </text>
                  <separator
                    data-vertical="adaptive-1200"
                    data-height=""
                  ></separator>
                  <text data-wrap="wrap" data-line="1.5" data-length="200">
                    Adaptive when configured, switching to horizontal at
                    specific breakpoints.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group data-gap="30">
          <group
            data-border=""
            data-radius="20"
            data-space="50"
            data-align="center"
            data-fit="1"
            data-min-length="300"
            data-wrap="no"
            data-justify="center"
          >
            <group data-length="80"></group>
            <group
              data-wrap="no"
              data-width="auto"
              data-align="center"
              data-direction="column"
            >
              <separator data-vertical="" data-height="40"></separator>
              <group
                data-border="2"
                data-index="3"
                data-height="3"
                data-length="3"
                data-radius="5"
              ></group>
              <separator data-vertical="" data-height="40"></separator>
            </group>
            <group data-length="50">
              <separator data-horizontal=""></separator>
            </group>
            <group
              data-radius="20"
              data-align="center"
              data-justify="center"
              data-direction="column"
              data-background="text"
              data-color="main-background"
              data-height="40"
              data-length="40"
              data-weight="700"
            >
              <text>2</text>
            </group>
          </group>
        </group>
      </group>

      <group data-gap="20" data-space="50">
        <group
          data-radius="20"
          data-justify="center"
          data-align="center"
          data-direction="column"
          data-background="text"
          data-color="main-background"
          data-height="40"
          data-length="40"
          data-weight="700"
        >
          <text>2</text>
        </group>

        {/* <separator data-vertical="" data-height=""></separator> */}

        <group data-direction="column" data-width="auto" data-gap="5">
          <text data-weight="700">Vertical Divider</text>
          <text
            data-wrap="wrap"
            data-length="200"
            data-opacity="60"
            data-line="1.5"
          >
            Example of a vertical divider in its default, unconfigured state
          </text>
        </group>
      </group>

<group   data-gap="30" data-type="grid" data-grid-template="300">

<group
        data-background="adaptive-gray"
        data-radius="20"
        data-space="50"
        //  data-align="center"
        data-gap="30"

      >
        <separator
          data-opacity="30"
          data-vertical=""
          data-height="50"
        ></separator>
        <separator
          data-opacity="30"
          data-vertical=""
          data-height="40"
        ></separator>
        <separator data-opacity="30" data-vertical=""></separator>
        <separator
          data-opacity="30"
          data-vertical=""
          data-height="20"
        ></separator>
        <separator
          data-opacity="30"
          data-vertical=""
          data-height="10"
        ></separator>

      </group>


      <group
        data-background="adaptive-gray"
        data-radius="20"
        data-space="50"
        //  data-align="center"
        data-gap="30"

      >


        <text data-wrap="wrap" data-line="1.5" >
        Vertical dividers in various sizes, configurable to fit containers and organize side-by-side content.
        </text>
      </group>

</group>
    </group>
  );
};

export default Divider;
