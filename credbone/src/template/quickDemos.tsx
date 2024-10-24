import React from "react";
import UnitConverter from "../tools/UnitConverter";

import SnackbarContainer from "../components/snackbar/SnackbarContainer";
import Calculator from "../tools/Calculator";
import SimplePaint from "../tools/SimplePaint";

const QuickDemos: React.FC = () => {
  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-gap="30">
        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
            data-color="main"
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
        data-max-length="900"
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
          data-elevation="1"
          data-contain=""
          data-space="20"
          data-gap="20"
        >
          <group data-gap="10">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              data-opacity="70"
            >
              Unit Converter
            </text>

            <text data-wrap="wrap" data-line="20" data-opacity="40">
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
           data-elevation="1"
          data-contain=""
          data-space="20"
          //    data-gap="20"
        >
          <group data-gap="10">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              data-opacity="70"
            >
              Calculator
            </text>

            <text data-wrap="wrap" data-line="20" data-opacity="40">
              Designed with minimal functionality and a straightforward user
              interface to demonstrate the usability and layout of a UI system
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
          data-elevation="1"
          data-contain=""
          data-gap="10"
          data-length="500"
        >
          <group data-height="10"></group>
          <group data-gap="10" data-space-horizontal="20">
            <text
              data-weight="700"
              data-wrap="wrap"
              data-text-size="large"
              data-ellipsis=""
              data-opacity="70"
            >
              Simple Paint
            </text>

            <text data-wrap="wrap" data-line="20" data-opacity="40">
              Designed with minimal functionality to demonstrate the usability
              of a UI system
            </text>
          </group>

          <SimplePaint />
        </group>
      </group>

      <group data-height="200"></group>
    </group>
  );
};
export default QuickDemos;
