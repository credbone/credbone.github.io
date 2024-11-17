import React from "react";

import sampleImage2 from "../styles/images/samples/res_51.jpg";

import { BaseColors } from "./utils/colorData";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";
import { useModal } from "../components/Modal";
import TextReveal from "../components/TextReveal";

const Colors: React.FC = () => {

  const { openModal, closeModal } = useModal();

  const modalConfig = {
    "data-radius": "none",
    "data-margin": "0",
    "data-background": "none",
    "data-elevation": "none",
    "data-width": "fit",
    "data-scroll": "",
    "data-min-height": "fit",
    "data-contain": "scroll",
  };

  const getModalContent = (
    colorsName: string,
    colorsValue: string,
    colorsDescription: string,
    colorsHex:string,
    colorsHexLight:string,
    colorsHexDark:string,
  ) => (
    <group
      data-max-height="fit"
      data-contain=""
      data-direction="column"
      data-align="center"
      data-max-length="300"
      data-position="center"
    >
      <group
        data-space="30"
        data-direction="column"
        //  data-background="context"
        // data-align="center"
        data-gap="20"
      >
        <group
          data-position="bottom"
          data-wrap="no"
          //  data-height="60"
          data-contain=""
          data-direction="column"
          data-gap="10"
        >



          <group

data-animation-name="appear-bottom"
data-fill-mode="backwards"
data-animation-duration="1.25"

            data-radius="15"
            data-space="30"
            data-background={colorsValue + "-light"}
            data-color={colorsValue + "-dark"}
            data-direction="column"
          >
            <text data-opacity="30">Light</text>
             <text data-text-transform="uppercase"   data-weight="600"> <TextReveal text={colorsHexLight} duration={500}></TextReveal></text>
          </group>


          <group

data-animation-name="appear-top"
data-fill-mode="backwards"
data-animation-duration="2.25"

          data-index="2"
            data-radius="15"
            data-min-height="240"
            data-space="30"
            data-gap="30"
            data-background={colorsValue}
            data-color="white"
          >
          <group data-direction="column"  >
              <text   data-wrap="wrap" data-text-size="36" data-weight="700">
                {colorsName}
              </text>
              <text data-wrap="wrap" data-weight="600"  data-line="20">
                {colorsDescription}
              </text></group>


            <group data-direction="column"  data-position="bottom">
<text data-opacity="30">Base</text>
              <text data-text-transform="uppercase" data-weight="600"><TextReveal text={colorsHex} duration={500}></TextReveal></text>
            </group>
            
          </group>



          <group
          data-animation-name="appear-top"
          data-fill-mode="backwards"
          data-animation-duration="3.25"
            data-radius="15"
            data-space="30"
            data-background={colorsValue + "-dark"}
          data-color="white"
          data-direction="column"
          >
             <text data-opacity="30">Dark</text>
            <text data-text-transform="uppercase"   data-weight="600"> <TextReveal text={colorsHexDark} duration={500}></TextReveal></text>
          </group>
        </group>
      </group>

      <separator data-horizontal=""></separator>
      <group data-space="20" data-type="grid" data-gap="10">
        <group
          data-contain=""
          data-space="15"
          data-interactive=""
          data-cursor="pointer"
          data-radius="10"
          data-width="auto"
          data-align="center"
          data-direction="column"
          data-background="highlight"
          onClick={() => closeModal(`modal-${colorsName}`)}
        >
          <text data-weight="600">Done</text>
        </group>
      </group>
    </group>
  );
  
  const handleColorClick = (
    colorsName: string,
    colorsValue: string,
    colorsDescription: string,
    colorsHex:string,
    colorsHexLight:string,
    colorsHexDark:string,
  ) => {
    openModal(
      `modal-${colorsName}`,
      colorsName,
      getModalContent(colorsName, colorsValue, colorsDescription,colorsHex,colorsHexLight,colorsHexDark),
      false,
      false,
      modalConfig,
      0
    );
  };


  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-ellipsis=""
          data-color="main"
        >
          Color System
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces.
        </text>
      </group>

      <group
        data-border=""
        data-radius="20"
        //    data-elevation="2"
        data-index="2"
        data-contain=""
        data-space="5"
        data-background="context"
      >
        <group data-contain="" data-radius="15" data-gap="5">
          <Popover
            placement="mouse"
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
            <group data-min-height="240" data-width="auto" data-length="auto">
              <Ripple>
                <group
                  data-ink-color="main-dark"
                  data-cursor="pointer"
                  data-interactive=""
                  // data-radius="15"
                  data-contain=""
                  data-direction="column"
                  data-color="main-text"
                  data-space="30"
                  data-background="main"
                  data-gap="20"
                  data-justify="end"
                  data-align="start"
                  data-wrap="no"
                >
                  <group>
                    <text data-opacity="30">Click To Change</text>
                  </group>

                  <group
                    data-position="bottom"
                    data-gap="10"
                    data-direction="column"
                  >
                    <text
                      data-wrap="wrap"
                      data-light=""
                      data-max-length="300"
                      data-line="20"
                    >
                      This Primary color you selected will be used extensively
                      in the UI, with other shades being automatically generated
                      from it.
                    </text>
                    <text
                      data-wrap="wrap"
                      data-weight="700"
                      data-text-size="large"
                    >
                      Primary Color
                    </text>
                  </group>
                </group>
              </Ripple>
            </group>
          </Popover>

          <group
            // data-radius="15"
            data-contain=""
            data-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-lighter"
          >
            <text data-weight="700">Lighter</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
            data-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-light"
          >
            <text data-weight="700">Light</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
            data-min-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-dark"
            data-color="white"
          >
            <text data-weight="700">Dark</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
            data-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-darker"
            data-color="white"
          >
            <text data-weight="700">Darker</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
            data-width="auto"
            data-min-height="240"
            data-length="auto"
            data-background="main-dark"
          >
            <group
              data-color="main-text-lighter-white"
              data-direction="column"
              data-space="30"
              data-gap="10"
              data-justify="end"
            >
              <text
                data-wrap="wrap"
                data-light=""
                data-max-length="240"
                data-line="20"
              >
                The generated color ensures that the text remains readable on
                the chosen color.
              </text>
              <text data-wrap="wrap" data-weight="700" data-text-size="large">
                Text Color
              </text>
            </group>
          </group>
        </group>
      </group>

      <group
        data-border=""
        data-radius="20"
        // data-elevation="2"
        data-index="1"
        data-contain=""
        data-space="5"
        data-background="context"
      >
        <group data-contain="" data-radius="15" data-gap="5">
          <Popover
            placement="mouse"
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
            <group data-min-height="240" data-width="auto" data-length="auto">
              <Ripple>
                <group
                  data-ink-color="secondary-dark"
                  // data-radius="15"
                  data-cursor="pointer"
                  data-interactive=""
                  data-contain=""
                  data-direction="column"
                  data-color="secondary-text"
                  data-space="30"
                  data-background="secondary"
                  data-gap="20"
                  data-justify="end"
                  data-align="start"
                >
                  <group>
                    <text data-opacity="30">Click To Change</text>
                  </group>

                  <group
                    data-position="bottom"
                    data-gap="10"
                    data-direction="column"
                  >
                    <text
                      data-wrap="wrap"
                      data-light=""
                      data-max-length="300"
                      data-line="20"
                    >
                      This Secondary color you selected will be used extensively
                      in the UI, with other shades being automatically generated
                      from it.
                    </text>
                    <text
                      data-wrap="wrap"
                      data-weight="700"
                      data-text-size="large"
                    >
                      Secondary Color
                    </text>
                  </group>
                </group>
              </Ripple>
            </group>
          </Popover>

          <group
            // data-radius="15"
            data-contain=""
            data-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-lighter"
          >
            <text data-weight="700">Seondary Lighter</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
            data-min-eight="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-light"
          >
            <text data-weight="700">Seondary Light</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
            data-min-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-dark"
            data-color="white"
          >
            <text data-weight="700">Secondary Dark</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
            data-height="240"
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-darker"
            data-color="white"
          >
            <text data-weight="700">Secondary Darker</text>
            <text data-ellipsis="" data-light="">
              Auto-generated shade
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
            data-width="auto"
            data-min-height="240"
            data-length="auto"
            data-background="secondary-darker"
          >
            <picture data-position="absolute" data-name="color-demo">
              <img src={sampleImage2} alt="" />
            </picture>

            <group
              data-color="secondary-text-lighter-white"
              data-direction="column"
              data-space="30"
              data-gap="10"
              data-justify="end"
            >
              <text
                data-wrap="wrap"
                data-light=""
                data-max-length="240"
                data-line="20"
              >
                The generated color ensures that the text remains readable on
                the chosen color.
              </text>
              <text data-wrap="wrap" data-weight="700" data-text-size="large">
                Text Color
              </text>
            </group>
          </group>
        </group>
      </group>
      <group data-direction="column" data-gap="10">
        <text data-weight="700" data-text-size="xx-large" data-wrap="wrap">
          Base Colors
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces.
        </text>
      </group>

      <group
        data-shrink="no"
        data-weight="600"
        data-max-length="1200"
        data-type="grid"
        data-gap="10"
        data-grid-template="180/140"
      >
        {BaseColors.map((colors, index) => (
          <group

          onClick={() => handleColorClick(colors.name, colors.value, colors.description,colors.hex,colors.hexlight,colors.hexdark,)}

            key={index}
            data-contain=""
            data-direction="column"
            daat-wrap="no"
            data-wrap="no"
            data-border=""
            data-space="5"
            data-radius="15"
            data-gap="15"

//data-interactive=""

          //  data-height="240"
          >
            <group
              data-direction="column"
              data-space-horizontal="15"
              data-gap="5"
             
            >
              <text
                data-text-size="64"
                data-height="40"
                data-contain=""
                data-weight="100"
                data-opacity="10"
                //data-color={colors.value}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </text>
              <group data-direction="column">
                <text data-wrap="wrap" data-opacity="30" data-ellipsis="">
                  {colors.description}
                </text>
                <separator data-horizontal="" data-interval="20"></separator>
                <text data-ellipsis="" data-wrap="wrap" data-weight="700">
                  {colors.name}
                </text>
              </group>
            </group>

            <group
             data-position="bottom"
              data-wrap="no"
            //  data-height="60"
              data-contain=""
              data-radius="10"
            >
              <group data-ratio="1:1" data-background={colors.value + "-light"}></group>
              <group data-ratio="1:1" data-background={colors.value}></group>
              <group data-ratio="1:1" data-background={colors.value + "-dark"}></group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
};
export default Colors;
