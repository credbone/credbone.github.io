import React from "react";
import UnitConverter from "../tools/UnitConverter";

import SnackbarContainer from "../components/snackbar/SnackbarContainer";
import Calculator from "../tools/Calculator";
import SimplePaint from "../tools/SimplePaint";
import WeatherWidget from "../tools/WeatherWidget";
import Ripple from "../components/Ripple";
import { useModal } from "../components/Modal";
import TemplatePageHeader from "./TemplatePageHeader";

import { isMobile } from "react-device-detect";

const QuickDemos: React.FC = () => {
  const { openModal } = useModal();

  return (
    <group data-space="30" data-gap="30" data-align="start">
      <TemplatePageHeader
        title=" Quick Demos"
        description="Explore the UI system through a few simple demo apps designed purely
            for demonstration purposes, showcasing its versatility and
            performance. Notably, these apps utilize the design system with zero
            lines of app-specific UI code written."
        //  version="2.0.1"
        type="Demo"
        descriptionProps={{ "data-length": "600" }}
      />

      <group
        // data-max-length="900"
        data-column-gap="15"
        data-justify="start"
        data-align="start"
        data-type="column"
        data-column-size="240"
      >
        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="30"
          data-contain=""
          data-border=""
          data-gap="20"
          data-elevation="2"
          data-index='2'
        >
          <WeatherWidget />
        </group>

        <group>
          <group data-gap="10" data-space="30">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              //    data-opacity="70"
              data-font-type="hero"
              data-line="1"
            >
              Unit<br></br> Converter
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              You can use the unit converter to convert from one measurement to
              another.
            </text>
          </group>

          <group
            data-height="auto"
            data-max-height="fit"
            data-radius="25"
            data-border=""
            data-contain=""
            //data-space="10"
            data-gap="20"
          >
            <UnitConverter />
          </group>
        </group>

        <group>
          <group data-gap="10" data-space="30">
            <text
              data-weight="700"
              data-wrap="preline"
              data-text-size="large"
              data-ellipsis=""
              // data-opacity="70"
              data-font-type="hero"
              data-line="1"
            >
              Basic<br></br> Calculator
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              Designed with minimal functionality to demonstrate the usability a
              UI system
            </text>
          </group>

          <group
            data-index="2"
            data-height="auto"
            data-max-height="fit"
            data-radius="25"
            data-border=""
            data-contain=""
            data-space="10"
            data-space-top="0"
            //    data-gap="20"
            data-elevation="2"
          >
            <SnackbarContainer>
              <group>
                <Calculator />
              </group>
            </SnackbarContainer>
          </group>
        </group>

        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="30"
          data-border=""
          data-contain=""
          data-space="15"
          data-gap="15"
          data-length="500"
        >
          <group data-gap="10"  data-space="15">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              //  data-opacity="70"
              data-font-type="hero"
              data-line="1"
            >
              Simple
              <br></br> Paint
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              Designed with minimal functionality to demonstrate the usability
              of a UI system
            </text>
          </group>

<group data-gap="15">
            <separator data-horizontal="dotted" data-opacity="20"></separator>

          <Ripple>
            <group
              data-contain=""
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="15"
              // data-width="auto"
              data-align="center"
              data-direction="column"
              //data-background="adaptive-gray"
              onClick={() =>
                openModal({
                  id: "paint-modal",
                  title: "Simple Paint",
                  content: (
                    <group
                      data-min-length="600"
                      data-max-height="fit"
                      data-height="fit"
                      data-contain=""
                      data-shrink="initial"
                    >
                      <SimplePaint />
                    </group>
                  ),
                  hasHeader: true,

                  fullscreenbutton: true,
                  fullscreen: isMobile,

                  hasToolbar: false,
                  customAttributes: {
                    "data-background": "main-background",
                    "data-animation-name": "zoom-in-9",
                    "data-animation-duration": "2.75",
                    "data-fill-mode": "backwards",
                  },
                  //   dimAttributes: {"data-background" : "dark-shade-70"},
                  // spacing: 0,
                })
              }
            >
              <text data-ellipsis="" data-weight="700">
                Launch
              </text>
            </group>
          </Ripple>
</group>
        </group>
      </group>
    </group>
  );
};
export default QuickDemos;
