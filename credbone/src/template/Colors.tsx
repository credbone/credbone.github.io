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



import { Paintbrush, PaintBucket } from "lucide-react";

export const ColorPalette = [
  { textcolor: "-darker", code: "-lightest", name: "Lightest", description: "100", },
  { textcolor: "-darker", code: "-lighter", name: "Lighter", description: "200" },
  { textcolor: "-darker", code: "-light", name: "Light", description: "300" },
  { textcolor: "-text", code: "-soft", name: "Soft", description: "400" },
  { textcolor: "-text", code: "", name: "Base", description: "500" },
  { textcolor: "-lighter", code: "-deep", name: "Deep", description: "600" },
  { textcolor: "-lighter", code: "-dark", name: "Dark", description: "700" },
  { textcolor: "-lightest", code: "-darker", name: "Darker", description: "800", },
  { textcolor: "-lightest", code: "-darkest", name: "Darkest", description: "900", },
];

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
    openModal({
      id: `modal-${colorsName}`,
      title: colorsName,
      content: getModalContent(
        colorsName,
        colorsValue,
        colorsDescription,
        colorsHex,
        colorsHexLight,
        colorsHexDark
      ),
      hasHeader: false,
      hasToolbar: false,
      customAttributes: modalConfig,
      spacing: 0,
    });
  };

  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
<group data-direction="column" data-gap="30" data-background="adaptive-gray" data-radius="20" data-justify="end" data-space="30" data-align="start">


<group data-direction="column">
<group data-gap="20" data-align="center">
<group data-space-horizontal="20" data-space-vertical="10" data-background="text" data-width="auto" data-color="main-background" data-radius="30" >
    <text>Token</text>
  </group>
  <separator data-vertical=""></separator>
<text>
  Version 3.0.0
</text>
</group>

</group>
<separator data-horizontal=""></separator>
        <group data-height="100" data-adaptive="desktop">

        </group>


<group data-direction="column" data-gap="10">
<text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-ellipsis=""

        >
          Color System
        </text>
        <text
          data-wrap="wrap"
          data-max-length="600"
          data-line="1.5"

        >
          A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces.
        </text>
</group>

      </group>

      <group data-gap="30">
        <group data-gap="30" data-align="center">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
              Primary Color
            </text>
          </group>

          <group data-gap="30" data-wrap="no">
            <group data-width="auto" data-align="start">
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
                <group data-width="auto">
                  <group
                    data-cursor="pointer"
                    data-interactive=""
                    data-contain=""
                    data-direction="column"
                    data-space="15"
                    data-radius="10"
                    data-background="highlight"
                  >
                    <group data-interact="">
                    
                    <PaintBucket size={20}/>
                    </group>
                  </group>
                </group>
              </Popover>
            </group>
            <separator data-vertical="" data-height=""></separator>
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="240"
            >
              Primary color will be used in the UI, with other shades being
              automatically generated from it.
            </text>
          </group>
        </group>

        <group data-type="grid" data-grid-template="110" data-gap="5">
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
            >
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-weight="700">{color.name}</text>
            </group>
          ))}
        </group>
      </group>

      <separator data-horizontal=""></separator>

      <group data-gap="30">
        <group data-gap="30" data-align="center">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
              Secondary Color
            </text>
          </group>

          <group data-gap="30" data-wrap="no">
            <group data-width="auto" data-align="start">
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
                <group data-width="auto">
                  <group
                    data-cursor="pointer"
                    data-interactive=""
                    data-over-color="secondary"
                    data-contain=""
                    data-direction="column"
                    data-space="15"
                    data-radius="10"
                    data-background="highlight"
                  >
                    <group data-interact="">
                <Paintbrush size={20}/>
                    </group>
                  </group>
                </group>
              </Popover>
            </group>
            <separator data-vertical="" data-height=""></separator>
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="240"
            >
              Secondary color will be used in the UI, with other shades being
              automatically generated from it.
            </text>
          </group>
        </group>

        <group data-type="grid" data-grid-template="110" data-gap="5">
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
            >
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-weight="700">{color.name}</text>
            </group>
          ))}
        </group>
      </group>

      <separator data-horizontal=""></separator>

      <group data-gap="30">
        <group data-gap="30" data-align="center">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
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

        <group data-type="grid" data-grid-template="110" data-gap="5">
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
            >
              <text data-ellipsis="" data-light="">
                {color.description}
              </text>
              <text data-weight="700">{color.name}</text>
            </group>
          ))}
        </group>
      </group>

      <separator data-horizontal=""></separator>
      <group data-direction="column" data-gap="10">
        <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
          Base Colors
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          Collection of predefined shades to complement design and maintain
          consistency across system.
        </text>
      </group>

      <group
        data-shrink="no"
        data-weight="600"
        //   data-max-length="1120"
        data-type="grid"
        data-gap="5"
        data-grid-template="110"
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
            data-over-color="neutral"
            data-cursor="pointer"
            key={index}
            data-contain=""
            data-direction="column"
            daat-wrap="no"
            data-wrap="no"
            //     data-border=""
            //  data-space="5"
            //  data-radius="15"
          >
            <group
              data-interact=""
              data-position="bottom"
              data-wrap="no"
              // data-contain=""
              // data-radius="10"
              data-gap="5"
              data-direction="column"
            >
              <group
                data-direction="column"
                data-space="15"
                data-interactive=""
                data-interact=""
               // data-ratio="1:2"
                data-gap="20"
                data-space-top="40"
              >
               
                <text
                  data-wrap="wrap"
                  data-opacity="30"
                  data-ellipsis=""
                  data-hypens="auto"
                  data-position="bottom"
                >
                  {colors.description}
                </text>
<separator data-horizontal=""></separator>
                <group data-direction="column" data-gap="5">
                  <text data-ellipsis="" data-wrap="wrap" data-weight="700">
                    {colors.name}
                  </text>
                  <text data-contain="" data-opacity="20">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </text>
                </group>
              </group>

              <group

                data-ratio="1:1"
                data-background={colors.value + "-light"}
                data-space="15"
              ></group>
              <group data-ratio="1:1" data-background={colors.value}>
                <group data-direction="column" data-color="white"></group>
              </group>
              <group
                data-ratio="1:1"
                data-background={colors.value + "-dark"}
              ></group>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
};
export default Colors;
