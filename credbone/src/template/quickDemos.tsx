import React from "react";
import UnitConverter from "../tools/UnitConverter";

import SnackbarContainer from "../components/snackbar/SnackbarContainer";
import Calculator from "../tools/Calculator";
import SimplePaint from "../tools/SimplePaint";
import WeatherWidget from "../tools/WeatherWidget";
import Ripple from "../components/Ripple";
import { useModal } from "../components/Modal";

const QuickDemos: React.FC = () => {

  const { openModal, closeModal } = useModal();

  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-gap="30">
      <group data-direction="column" data-gap="10" data-background="adaptive-gray" data-radius="20" data-justify="end" data-space="30">
        <group data-height="100" data-adaptive="desktop">

        </group>
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
         //   data-color="main"
          >
            Quick Demos
          </text>
          <text
            data-wrap="wrap"
            data-length="600"
            data-line="1.5"
            // data-light=""
          >
            Explore the UI system through a few simple demo apps designed purely
            for demonstration purposes, showcasing its versatility and
            performance. Notably, these apps utilize the design system with zero
            lines of app-specific UI code written.
          </text>
        </group>
      </group>

      <group
       // data-max-length="900"
        data-column-gap="15"
        data-justify="start"
        data-align="start"
        data-type="column"
        data-column-size="260"
      >

<group

data-height="auto"
data-max-height="fit"
data-radius="20"

data-contain=""
data-border="outline"
data-gap="20"
>

<WeatherWidget  />

</group>


        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
         data-border=""
          data-contain=""
          data-space="10"
          data-gap="20"
        >
          <group data-gap="10" data-space="20">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              //    data-opacity="70"
            >
              Unit<br></br> Converter
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              You can use the unit converter to convert from one measurement to
              another.
            </text>
          </group>

          <UnitConverter />
        </group>

        <group
          data-index="2"
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
         data-border=""
          data-contain=""
          data-space="10"
          //    data-gap="20"
        >
          <group data-gap="10" data-space="20">
            <text
              data-weight="700"
              data-wrap="preline"
              data-text-size="large"
              data-ellipsis=""
              // data-opacity="70"
            >
              Basic<br></br> Calculator
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              Designed with minimal functionality to demonstrate the usability a
              UI system
            </text>
          </group>
          <SnackbarContainer>
            <group>
              <Calculator />
            </group>
          </SnackbarContainer>
        </group>

        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
         data-border=""
          data-contain=""
          data-space="30"
             data-gap="20"
          data-length="500"
        >

          <group data-gap="10" >
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              //  data-opacity="70"
            >
              Simple
              <br></br> Paint
            </text>

            <text data-wrap="wrap" data-line="1.5" data-opacity="40">
              Designed with minimal functionality to demonstrate the usability
              of a UI system
            </text>
          </group>

<separator data-horizontal=""></separator>

<Ripple>
<group
              data-contain=""
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="10"
             // data-width="auto"
              data-align="center"
              data-direction="column"
              data-background="highlight"
              
              onClick={() =>
                openModal({
                  id: "paint-modal",
                  title: "Simple Paint",
                  content: (<group data-length="500"><SimplePaint /></group>),
                  hasHeader: true,
                  hasToolbar: false,
                //  customAttributes: modalConfig,
                //  dimAttributes: {"data-background" : "dark-shade-70"},
                 // spacing: 0,
                })
              }


            >
              <text data-ellipsis="" data-weight="600">
               Launch
              </text>
            </group>
</Ripple>

          
        </group>




      </group>


    </group>
  );
};
export default QuickDemos;
