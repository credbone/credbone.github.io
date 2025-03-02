import React, { useState } from "react";
import DotDisplay from "../../template/dotDisplay";
import DotDisplayEdit from "../../template/dotDisplayEdit";
import Tooltip from "../../components/tooltip";

function DotIconMaker() {
  //   new Set([
  //     165, 150, 135, 136, 120, 121, 105, 151, 166, 181, 106, 90, 91, 107, 123,
  //     139, 171, 155, 74, 73, 72, 71, 69, 70, 75, 76, 92, 108, 172, 156, 140,
  //     124, 53, 54, 55, 56, 57, 58, 59, 60, 89, 104, 119, 134, 149, 164, 180,
  //     179, 196, 187, 188, 52, 68,
  //   ])
  // );

  // const setsun = () => {
  //   setActiveDots(
  //     new Set([
  //       130, 129, 113, 114, 126, 125, 141, 142, 231, 232, 216, 215, 23, 24, 40,
  //       39, 51, 68, 75, 60, 187, 204, 180, 195, 196, 179, 203, 188, 76, 59, 52,
  //       67, 71, 72, 183, 184, 123, 139, 116, 132, 101, 86, 89, 106, 154, 169,
  //       166, 149, 165, 170, 90, 85, 117, 133, 150, 167, 168, 153, 138, 122, 105,
  //       88, 87, 102, 103, 118, 119, 120, 104, 121, 137, 136, 135, 134, 151, 152,
  //     ])
  //   );
  // };

  // const setgear = () => {
  //   setActiveDots(
  //     new Set([
  //       55, 56, 124, 140, 115, 131, 199, 200, 165, 182, 185, 170, 155, 73, 90,
  //       107, 84, 69, 74, 91, 171, 184, 183, 181, 100, 70, 164, 85, 186, 154,
  //       138, 122, 106, 89, 72, 71, 86, 101, 116, 132, 148, 166, 167, 168, 88,
  //       87, 149, 117, 133, 139, 169, 123, 150, 102, 105, 153, 114, 130, 39, 40,
  //       125, 141, 216, 215, 187, 203, 188, 75, 59, 76, 68, 67, 52, 180, 179,
  //       196,
  //     ])
  //   );
  // };

  // const setmoon = () => {
  //   setActiveDots(
  //     new Set([
  //       115, 131, 164, 181, 186, 171, 199, 200, 54, 55, 56, 69, 84, 99, 156,
  //       140, 124, 71, 86, 102, 118, 135, 152, 153, 139, 154, 70, 85, 100, 101,
  //       116, 117, 132, 133, 134, 148, 150, 151, 149, 165, 166, 167, 168, 169,
  //       170, 155, 182, 183, 184, 185, 201, 198, 147, 180,
  //     ])
  //   );
  // };

  const buttonData = [
    {
      label: "Sun",
      set: new Set([
        130, 129, 113, 114, 126, 125, 141, 142, 231, 232, 216, 215, 23, 24, 40,
        39, 51, 68, 75, 60, 187, 204, 180, 195, 196, 179, 203, 188, 76, 59, 52,
        67, 71, 72, 183, 184, 123, 139, 116, 132, 101, 86, 89, 106, 154, 169,
        166, 149, 165, 170, 90, 85, 117, 133, 150, 167, 168, 153, 138, 122, 105,
        88, 87, 102, 103, 118, 119, 120, 104, 121, 137, 136, 135, 134, 151, 152,
      ]),
    },
    {
      label: "Arrow",
      set: new Set([
        165, 150, 135, 136, 120, 121, 105, 151, 166, 181, 106, 90, 91, 107, 123,
        139, 171, 155, 74, 73, 72, 71, 69, 70, 75, 76, 92, 108, 172, 156, 140,
        124, 53, 54, 55, 56, 57, 58, 59, 60, 89, 104, 119, 134, 149, 164, 180,
        179, 196, 187, 188, 52, 68,
      ]),
    },
    {
      label: "Gear",
      set: new Set([
        55, 56, 124, 140, 115, 131, 199, 200, 165, 182, 185, 170, 155, 73, 90,
        107, 84, 69, 74, 91, 171, 184, 183, 181, 100, 70, 164, 85, 186, 154,
        138, 122, 106, 89, 72, 71, 86, 101, 116, 132, 148, 166, 167, 168, 88,
        87, 149, 117, 133, 139, 169, 123, 150, 102, 105, 153, 114, 130, 39, 40,
        125, 141, 216, 215, 187, 203, 188, 75, 59, 76, 68, 67, 52, 180, 179,
        196,
      ]),
    },
    {
      label: "Moon",
      set: new Set([
        115, 131, 164, 181, 186, 171, 199, 200, 54, 55, 56, 69, 84, 99, 156,
        140, 124, 71, 86, 102, 118, 135, 152, 153, 139, 154, 70, 85, 100, 101,
        116, 117, 132, 133, 134, 148, 150, 151, 149, 165, 166, 167, 168, 169,
        170, 155, 182, 183, 184, 185, 201, 198, 147, 180,
      ]),
    },
  ];

  const [activeDots, setActiveDots] = useState<Set<number>>(buttonData[0].set); // Default to 'Sun'
  const [selected, setSelected] = useState<number>(0); // Default selected is the first button (index 0)

  const handleClick = (index: number, set: Set<number>) => {
    setSelected(index); // Update selected button by index
    setActiveDots(set); // Update active dots
    // console.log(`Updated active dots for button at index ${index}:`, set);
  };

  return (
    <group data-space="30" data-gap="30" >
      <group data-gap="30" >


        <group data-gap="5">
          {buttonData.map((button, index) => (
            <Tooltip content={button.label} distance={0} key={index}>
              <group
                key={index} // Using index as the key
                data-width="auto"
                data-space="10"
                data-radius="10"
                data-interactive=""
                data-background={selected === index ? "highlight" : ""} // Highlight selected button
                data-cursor="pointer"
                onClick={() => handleClick(index, button.set)}
                data-direction="column"
              >
                <group data-interact="">
                  <DotDisplay size={64} activeIndexes={button.set} />
                </group>
              </group>
            </Tooltip>
          ))}
        </group>


        <group
          data-border=""
          data-width="auto"
          data-radius="20"
          data-space="20"
          data-background="text"
          data-color="main-background"
          data-align="center"
          data-direction="column"
          data-justify="center"
          data-gap="20"
        >
         
          <DotDisplay activeIndexes={activeDots} />
          <text data-opacity="30">Preview</text>
        </group>

        <group
          data-border=""
          data-width="auto"
          data-radius="20"
          data-contain=""
        >
          <DotDisplayEdit predefinedActiveIndexes={activeDots} />
        </group>


      </group>
    </group>
  );
}

export default DotIconMaker;
