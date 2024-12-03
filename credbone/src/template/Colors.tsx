import React from "react";

import { BaseColors } from "./utils/colorData";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";
import { useModal } from "../components/Modal";
import TextReveal from "../components/TextReveal";
import StuckReporter from "../components/StuckReporter";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import { isDesktop } from "react-device-detect";


const Colors: React.FC = () => {
  const { openModal, closeModal } = useModal();
  const { addSnackbar } = useSnackbar();

  const modalConfig = {
    "data-radius": "none",
    "data-margin": "0",
    "data-background": "main-background-top",
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
    colorsHex: string,
    colorsHexLight: string,
    colorsHexDark: string
  ) => (
    <group data-min-height="fit">
      <group
        data-position="absolute"
        data-height="fit"
        data-background=""
        onClick={() => closeModal(`modal-${colorsName}`)}
      ></group>

      <group
        data-space="30"
        data-direction="column"
        data-align="start"
        data-position="center"
        data-max-length="300"
      >
        <group
          data-position="bottom"
          data-wrap="no"
          data-contain=""
          data-direction="column"
          data-gap="10"
        >
          <group
            data-interactive=""
            data-cursor="pointer"
            data-over-color="neutral"
            data-animation-name="appear-bottom"
            data-fill-mode="backwards"
            data-animation-duration="1.25"
            data-radius="15"
            data-space="30"
            data-background={colorsValue + "-light"}
            data-color={colorsValue + "-dark"}
            data-direction="column"
            onClick={() =>
              handleColorCopy(colorsHexLight, `Light ${colorsName}`)
            }
          >
            <text data-opacity="30">Light</text>
            <text data-text-transform="uppercase" data-weight="600">
              <TextReveal text={colorsHexLight} duration={500}></TextReveal>
            </text>
          </group>

          <group
            data-interactive=""
            data-cursor="pointer"
            data-over-color="neutral"
            data-animation-name="appear-top"
            data-fill-mode="backwards"
            data-animation-duration="2.25"
            data-index="2"
            data-radius="15"
           
            data-space="30"
            data-gap="30"
            data-background={colorsValue}
            data-color="white"
            onClick={() => handleColorCopy(colorsHex, colorsName)}
          >
            <group data-direction="column">
              <text data-wrap="wrap" data-text-size="36" data-weight="700">
                {colorsName}
              </text>
              <text data-wrap="wrap" data-weight="600" data-line="20">
                {colorsDescription}
              </text>
            </group>

            <group data-direction="column" data-position="bottom">
              <text data-opacity="30">Base</text>
              <text data-text-transform="uppercase" data-weight="600">
                <TextReveal text={colorsHex} duration={500}></TextReveal>
              </text>
            </group>
          </group>

          <group
            data-interactive=""
            data-cursor="pointer"
            data-over-color="neutral"
            data-animation-name="appear-top"
            data-fill-mode="backwards"
            data-animation-duration="2.75"
            data-radius="15"
            data-space="30"
            data-background={colorsValue + "-dark"}
            data-color="white"
            data-direction="column"
            onClick={() => handleColorCopy(colorsHexDark, `Dark ${colorsName}`)}
          >
            <text data-opacity="30">Dark</text>
            <text data-text-transform="uppercase" data-weight="600">
              <TextReveal text={colorsHexDark} duration={500}></TextReveal>
            </text>
          </group>
        </group>

        <StuckReporter>
          {(isSticky) => (
            <group
              data-duration=".125"
              data-space-horizontal={isSticky ? "30" : ""}
              data-space-vertical="10"
              data-space-bottom="30"
              data-sticky="bottom"
            >
              <Ripple>
                <group
                  data-animation-name="appear-top"
                  data-fill-mode="backwards"
                  data-animation-duration="3.25"
                  data-ink-color="neutral"
                  data-direction="column"
                  data-over-color="neutral"
                  data-min-length="140"
                  data-backdrop="20"
                  data-interactive=""
                  //  data-width="auto"
                  data-cursor="pointer"
                  data-space="30"
                  //  data-color={isSticky ? "white" : ""}

                  data-radius="15"
                  data-contain=""
                  onClick={() => closeModal(`modal-${colorsName}`)}
                >
                  <text data-weight="600">Close</text>
                  <text data-opacity="30" data-ellipsis="">
                    Back to color selection
                  </text>
                </group>
              </Ripple>
            </group>
          )}
        </StuckReporter>
      </group>
    </group>
  );

  const showCopySnackbar = (colorName: string, colorTitle: string) => {
    addSnackbar(
      <group data-align="center" data-gap="10">
        <group
          data-height="15"
          data-length="15"
          data-radius="3"
          style={{ backgroundColor: `#${colorName}` }}
        ></group>
        <text data-ellipsis="">{colorTitle} Copied To Clipboard</text>
      </group>,
      2000,
      "",
      true
    );
  };

  const handleColorCopy = (colorName: string, colorTitle: string) => {
    if (isDesktop) {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(`#${colorName}`)
          .then(() => {
            showCopySnackbar(colorName, colorTitle); // Show success only on successful copy
          })
          .catch(() => {
            addSnackbar(
              <text data-ellipsis="">Unable to copy to clipboard.</text>,
              2000,
              "color-source",
              true
            );
          });
      } else {
        // Explicit "else" for unsupported Clipboard API
        addSnackbar(
          <text data-ellipsis="">
            Clipboard not supported in this browser.
          </text>,
          2000,
          "color-source",
          true
        );
      }
    }
  };

  const handleColorClick = (
    colorsName: string,
    colorsValue: string,
    colorsDescription: string,
    colorsHex: string,
    colorsHexLight: string,
    colorsHexDark: string
  ) => {
    openModal(
      `modal-${colorsName}`,
      colorsName,
      getModalContent(
        colorsName,
        colorsValue,
        colorsDescription,
        colorsHex,
        colorsHexLight,
        colorsHexDark
      ),
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
          // data-color="main"
          data-opacity="10"
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

data-gap="5"

      >


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
            <group data-width="auto" data-length="auto">
              <Ripple>
                <group
                  data-ink-color="main-dark"
                  data-cursor="pointer"
                  data-interactive=""
                  data-over-color="neutral-10"
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


        <group  data-type="grid" data-grid-template="120" data-gap="5">
        <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-lightest"
            data-color="main-darker"
          >
            <text data-weight="700">Lighter</text>
            <text data-ellipsis="" data-light="">
              100
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-lighter"

            data-color="main-darker"
          >
            <text data-weight="700">Lighter</text>
            <text data-ellipsis="" data-light="">
              200
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="white"
            data-gradient="main-light"
                        data-color="main-darker"
          >
            <text data-weight="700">Light</text>
            <text data-ellipsis="" data-light="">
             300
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-soft"
            data-color="main-darkest"
            
          >
            <text data-weight="700">Soft</text>
            <text data-ellipsis="" data-light="">
             400
            </text>
          </group>

{/* base */}

          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main"
            data-color="main-text"
            
          >
            <text data-weight="700">Base</text>
            <text data-ellipsis="" data-light="">
              Base shade
            </text>
          </group>


          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-deep"
            data-color="white"
            
          >
            <text data-weight="700">Deep</text>
            <text data-ellipsis="" data-light="">
              600
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
           
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
             700
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
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
              800
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="main-darkest"
            data-color="white"
          >
            <text data-weight="700">Darkest</text>
            <text data-ellipsis="" data-light="">
              900
            </text>
          </group>
        </group>
      </group>

      <group

      data-gap="5"
      >

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
            <group data-width="auto" data-length="auto">
              <Ripple>
                <group
                  data-ink-color="secondary-dark"
                  // data-radius="15"
                  data-cursor="pointer"
                  data-interactive=""
                  data-over-color="neutral-10"
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

          <group  data-type="grid" data-grid-template="120" data-gap="5">
        <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-lightest"
            data-color="secondary-darker"
          >
            <text data-weight="700">Lighter</text>
            <text data-ellipsis="" data-light="">
              100
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-lighter"

            data-color="secondary-darker"
          >
            <text data-weight="700">Lighter</text>
            <text data-ellipsis="" data-light="">
              200
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="white"
            data-gradient="secondary-light"
                        data-color="secondary-darker"
          >
            <text data-weight="700">Light</text>
            <text data-ellipsis="" data-light="">
             300
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-soft"
            data-color="secondary-darkest"
            
          >
            <text data-weight="700">Soft</text>
            <text data-ellipsis="" data-light="">
             400
            </text>
          </group>

{/* base */}

          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary"
            data-color="secondary-text"
            
          >
            <text data-weight="700">Base</text>
            <text data-ellipsis="" data-light="">
              Base shade
            </text>
          </group>


          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-deep"
            data-color="white"
            
          >
            <text data-weight="700">Deep</text>
            <text data-ellipsis="" data-light="">
              600
            </text>
          </group>

          <group
            // data-radius="15"
            data-contain=""
           
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
            <text data-weight="700">Dark</text>
            <text data-ellipsis="" data-light="">
             700
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
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
            <text data-weight="700">Darker</text>
            <text data-ellipsis="" data-light="">
              800
            </text>
          </group>
          <group
            // data-radius="15"
            data-contain=""
           
            data-length="auto"
            data-shrink="no"
            data-direction="column"
            data-orientation="vertical-bottom"
            data-justify="start"
            data-width="auto"
            data-space="30"
            data-background="secondary-darkest"
            data-color="white"
          >
            <text data-weight="700">Darkest</text>
            <text data-ellipsis="" data-light="">
              900
            </text>
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
        data-max-length="1120"
        data-type="grid"
        data-gap="1"

        data-grid-template="180/140"
        // data-border=""
        // data-radius="20"
                data-contain=""
      >
        {BaseColors.map((colors, index) => (
          <group
data-background="main-background"
// data-row-end={colors.type === "tall" ? "2" : ""}
// data-column-end={colors.type === "wide" ? "2" : ""}
            onClick={() =>
              handleColorClick(
                colors.name,
                colors.value,
                colors.description,
                colors.hex,
                colors.hexlight,
                colors.hexdark
              )
            }
            data-interactive=""
            data-over-color="neutral"
            data-cursor="pointer"
            key={index}
            data-contain=""
            data-direction="column"
            daat-wrap="no"
            data-wrap="no"
           data-border=""
           data-space="15"
          //  data-radius="15"
         
          >
            <group
              data-direction="column"
              data-space="15"
              data-gap="5"
              data-interact=""
            >
              <text
                
                data-contain=""
               data-opacity="20"
                
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </text>
              <group data-height="40"></group>
              <text data-ellipsis="" data-wrap="wrap" data-weight="700">
                  {colors.name}
                </text>
              <group data-direction="column" data-interact="">
                <text data-wrap="wrap" data-opacity="30" data-ellipsis="">
                  {colors.description}
                </text>
            

              </group>
            </group>

            <group
              data-interact=""
              data-position="bottom"
              data-wrap="no"
              data-contain=""

              data-radius="10"
              
            >
              <group  data-ratio="1:1" data-background={colors.value + "-light"} ></group>
              <group  data-ratio="1:1"  data-background={colors.value}></group>
              <group  data-ratio="1:1" data-background={colors.value + "-dark"} ></group>
            </group>
           
          </group>
        ))}
      </group>
    </group>
  );
};
export default Colors;
