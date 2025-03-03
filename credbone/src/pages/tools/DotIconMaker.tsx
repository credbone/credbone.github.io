import React, { useState } from "react";
import DotDisplay from "../../template/dotDisplay";
import DotDisplayEdit from "../../template/dotDisplayEdit";
import Tooltip from "../../components/tooltip";

import { arrow, gear, mail, moon, sun } from "../tools/dotIcon";


function DotIconMaker() {

  const buttonData = [
    { label: "Sun", set: sun, },
    { label: "Arrow", set: arrow, },
    { label: "Gear", set: gear, },
    { label: "Moon", set: moon, },
    { label: "Envelope", set: mail, },

  ];

  const [activeDots, setActiveDots] = useState<Set<number>>(buttonData[0].set); // Default to 'Sun'
  const [selected, setSelected] = useState<number>(0); // Default selected is the first button (index 0)

  const handleClick = (index: number, set: Set<number>) => {
    setSelected(index); // Update selected button by index
    setActiveDots(set); // Update active dots
    // console.log(`Updated active dots for button at index ${index}:`, set);
  };

  return (
    <group data-gap="30">

<group data-gap="5" data-type="grid" data-grid-template="80">
      {buttonData.map((button, index) => (
        <Tooltip content={button.label} distance={0} key={index}>
          <group
            key={index} // Using index as the key
           
            data-space="10"
            data-radius="15"
            data-interactive=""
            data-background={selected === index ? "adaptive-gray" : ""} // Highlight selected button
        //    data-color={selected === index ? "main-text" : ""} // Highlight selected button
            data-cursor="pointer"
            onClick={() => handleClick(index, button.set)}
            data-direction="column"
          >
            <group data-interact="">
              <DotDisplay size={80} activeIndexes={button.set} />
            </group>
          </group>
        </Tooltip>
      ))}
    </group>

<group data-gap="10" data-direction="column-800" data-length="700" >

    <group
      
      data-width="auto"
      data-radius="20"
       data-space="adaptive-30-50"
      data-background="text"
      data-color="main-background"
      data-align="center"
      data-direction="column"
      data-justify="center"
      data-gap="20"
    >
<group data-position="center" data-justify="center">
<DotDisplay activeIndexes={activeDots} />
</group>
      <text data-opacity="30">Preview</text>
    </group>


    <group
      data-border=""
      data-width="auto"
      data-radius="20"
      data-contain=""
 data-autofit="1-800"
 data-fit="1"

    >
      <DotDisplayEdit predefinedActiveIndexes={activeDots} />
    </group>


</group>




  </group>
  );
}

export default DotIconMaker;
