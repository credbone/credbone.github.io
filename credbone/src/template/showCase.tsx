import React from "react";
import UnitConverter from "../tools/UnitConverter";
import { useModal } from "../components/Modal";
import Calculator from "../tools/Calculator";

const Showcase: React.FC = () => {

  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior

  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-gap="30">
        <group data-direction="column" data-gap="10">
          {/* <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
            data-color="transparent"
            data-background-clip="text"
            data-background="main"
          >
            Showcase
          </text> */}
          <text
            data-wrap="wrap"
            data-length="600"
            data-line="1.5"
            data-light=""
          >
            Experience the UI system through interactive demos that showcase its
            versatility and performance in real-world applications
          </text>
        </group>
      </group>

      <group
        data-column-gap="15"
        data-jusitify="start"
        data-align="start"
        data-type="column"
      >
        <group data-gap="30">
          <group
            data-index="2"
            data-height="auto"
            data-max-height="fit"
            data-radius="15"
            data-elevation="1"
            data-contain=""
            data-space="30"
            data-gap="20"
          >
            <group data-gap="10">
              <text
                data-weight="700"
                data-wrap="wrap"
                data-text-size="xx-large"
                data-color="main"
              >
                Unit Converter
              </text>

              <text data-wrap="wrap" data-line="20" data-opacity="40">
                You can use the unit converter to convert from one measurement
                to another. For example, you could convert from Celsius to
                Fahrenheit or cups to liters.
              </text>
            </group>

            <UnitConverter />
          </group>
{/* 
          <group>
            <group

onClick={() =>
  openModal(
    "modal-converter",
    "Converter",
    <group data-max-height="fit" data-contain="" data-space="30" data-background="main-background" data-scroll="">
      <UnitConverter />
    </group>,
    false,
    true
  )
}

              data-width="auto"
              data-interactive=""
              data-space="15"
              data-space-vertical="10"
              data-radius="10"
              data-cursor="pointer"
              data-background="highlight"
              data-align="center"
              data-gap="15"
            >
              <text data-weight="700">View in Modal</text>
              <separator data-vertical="" data-height="20"></separator>
              <icon>arrow_outward</icon>
            </group>
          </group> */}
        </group>



        <group  data-index="2"
            data-height="auto"
            data-max-height="fit"
            data-radius="15"
            data-elevation="1"
            data-contain=""
           data-space="30"
            data-gap="20">

<group data-gap="10">
              <text
                data-weight="700"
                data-wrap="wrap"
                data-text-size="xx-large"
                data-color="main"
              >
                Calculator
              </text>

              <text data-wrap="wrap" data-line="20" data-opacity="40">
              Designed with minimal functionality and a straightforward user interface to demonstrate the usability and layout of a UI system
              </text>
            </group>

<Calculator/>

        </group>
      </group>
    </group>
  );
};
export default Showcase;
