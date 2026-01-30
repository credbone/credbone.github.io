import React, { useState } from "react";
import DotDisplay from "../../template/dotDisplay";
import DotDisplayEdit from "../../template/dotDisplayEdit";
import Tooltip from "../../components/tooltip";

import { arrow, cursor, gear, mail, moon, sun } from "../tools/dotIcon";

function DotIconMaker() {
  const buttonData = [
    { label: "Sun", set: sun },
    { label: "Arrow", set: arrow },
    { label: "Gear", set: gear },
    { label: "Moon", set: moon },
    { label: "Envelope", set: mail },
    // { label: "Cursor", set: cursor },
  ];

  const [activeDots, setActiveDots] = useState<Set<number>>(buttonData[0].set); // Default to 'Sun'
  const [selected, setSelected] = useState<number>(0); // Default selected is the first button (index 0)
  // const [isModified, setIsModified] = useState(false);

  const handleNewIcon = () => {
    setSelected(-1);
    //setIsModified(true);
    // setActiveDots(new Set());
  };

  const handleStartEdit = () => {
    setSelected(-1);
    // setIsModified(true);
    // setActiveDots(new Set());
  };

  const handleClick = (index: number, set: Set<number>) => {
    setSelected(index); // Update selected button by index
    setActiveDots(new Set(set));

    // console.log(`Updated active dots for button at index ${index}:`, set);
    //   setIsModified(false);
  };

  return (
    <group data-gap="30" data-max-length="1200">
      <group
        data-gap="20"
        data-direction="column-600"
        data-width="auto"
        data-autofit="1-600"
    //    data-wrap="no"
      >
        <DotDisplayEdit
          predefinedActiveIndexes={activeDots}
          onNewIcon={handleNewIcon}
          onStartEdit={handleStartEdit}
        />

        <group
        data-autofit="1-600"
          data-space="30"
          data-align="start"
          data-length="320"
          data-direction="column"
          data-border=""
          data-radius="40"
          data-gap="30"
        >
          <group data-direction="column" data-gap="5">
            <text
              data-weight="700"
              data-wrap="preline"
              data-text-size="large"
              data-ellipsis=""
              data-font-type="hero"
              data-line="1"
            >
              Pre-designed
            </text>
            <text data-opacity="30" data-max-length="160" data-wrap="wrap">
              Choose one to view and customize
            </text>
          </group>

          <group
            data-gap="1"
            data-type="grid"
            data-grid-template="70"
            data-align="start"
            data-contain=""
          >
            {buttonData.map((button, index) => (
              <Tooltip
                content={button.label}
                distance={-5}
                key={index}
                delay={500}
              >
                <group
                  data-border=""
                  key={index} // Using index as the key
                  // data-width="auto"
                  data-space="10"
                  // data-radius="15"
                  data-interactive=""
                  data-background={selected === index ? "adaptive-gray" : ""} // Highlight selected button
                  //   data-color={selected === index ? "main-text" : ""} // Highlight selected button
                  data-cursor="pointer"
                  onClick={() => handleClick(index, button.set)}
                  data-direction="column"
                  data-animation-name="appear-top-small"
                  data-fill-mode="backwards"
                  data-animation-duration={2 + index * 0.25}
                >
                  <group
                    data-interact=""
                    data-animation-name="appear-top-small"
                    data-fill-mode="backwards"
                    data-animation-duration={4 + index * 0.25}
                  >
                    <DotDisplay size={"fit"} activeIndexes={button.set} />
                  </group>
                </group>
              </Tooltip>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

export default DotIconMaker;
