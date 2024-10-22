import React from "react";
import UnitConverter from "../tools/UnitConverter";
import { useModal } from "../components/Modal";

import SnackbarContainer from "../components/snackbar/SnackbarContainer";
import Calculator from "../tools/Calculator";
import SimplePaint from "../tools/SimplePaint";

const Showcase: React.FC = () => {
  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior

  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-gap="30">
        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
            data-color="transparent"
            data-background-clip="text"
            data-background="main"
          >
            Showcase
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
        {/* <group
          data-index="2"
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
          data-elevation="1"
          data-contain=""
          data-space="20"
          data-gap="5"
          data-type="grid"
          data-grid-template="100"
        >


<group>
            <group
              onClick={() =>
                openModal(
                  "modal-converter",
                  "Converter",
                  <group
                    data-max-height="fit"
                    data-contain=""
                    data-space="30"
                    data-background="main-background"
                    data-scroll=""
                  >
                    <UnitConverter />
                  </group>,
                  false,
                  true
                )
              }
              //  data-width="auto"
              data-interactive=""
              data-space="15"
              data-space-vertical="10"
              data-radius="10"
              data-cursor="pointer"
              data-background="highlight"
              data-align="center"
              data-gap="15"
            >
                            <icon>arrow_outward</icon>
              <text data-weight="700">View in Modal</text>


            </group>
          </group>

          <group>
            <group
              onClick={() =>
                openModal(
                  "modal-converter",
                  "Converter",
                  <group
                    data-max-height="fit"
                    data-contain=""
                    data-space="30"
                    data-background="main-background"
                    data-scroll=""
                  >
                    <UnitConverter />
                  </group>,
                  false,
                  true
                )
              }
              //  data-width="auto"
              data-interactive=""
              data-space="15"
              data-space-vertical="10"
              data-radius="10"
              data-cursor="pointer"
              data-background="highlight"
              data-align="center"
              data-gap="15"
            >
                            <icon>arrow_outward</icon>
              <text data-weight="700">View in Modal</text>


            </group>
          </group>

          <group>
            <group
              onClick={() =>
                openModal(
                  "modal-converter",
                  "Paint",
                  <group
                    data-max-height="fit"
                    data-contain=""
                    //data-space="30"
                    data-background="main-background"
                    data-scroll=""
                    data-max-length="800"
                  >
                    <SimplePaint />
                  </group>,
                  true,
                  false,
                  {},
                  
                )
              }
              //  data-width="auto"
              data-interactive=""
              data-space="15"
              data-space-vertical="10"
              data-radius="10"
              data-cursor="pointer"
              data-background="highlight"
              data-align="center"
              data-gap="15"
            >
                            <icon>arrow_outward</icon>
              <text data-weight="700">View in Modal</text>


            </group>
          </group>




        </group> */}

        <group data-gap="30">
          <group
            data-index="2"
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
                data-text-size="x-large"
                //  data-color="main"
                data-ellipsis=""
              >
                Unit Converter
              </text>

              <text data-wrap="wrap" data-line="20" data-opacity="40">
                You can use the unit converter to convert from one measurement
                to another.
              </text>
            </group>

            <UnitConverter />
          </group>
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
              data-text-size="x-large"
              // data-color="main"
              data-ellipsis=""
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
          data-index="2"
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
          data-elevation="1"
          data-contain=""
          data-gap="20"
          data-length="500"
        >
          <SimplePaint />
        </group>
      </group>

      <group data-height="200"></group>
    </group>
  );
};
export default Showcase;
