import React, { useCallback, useEffect, useRef, useState } from "react";
import DotDisplay from "../../template/dotDisplay";
import DotDisplayEdit from "../../template/dotDisplayEdit";
import Tooltip from "../../components/tooltip";

import { arrow,  gear, mail, moon,  sun } from "../tools/dotIcon";






// Convert a float-encoded Set<number> to the raw string format ("115.2, 131.2, 71, ...")
// so the editor can decode sizes correctly via predefinedEncodedDots
const encodeSet = (set: Set<number>): string =>
  Array.from(set).join(", ");

function DotIconMaker() {
  const buttonData = [

    { label: "Arrow", set: arrow },
    { label: "Sun", set: sun },
    { label: "Gear", set: gear },
    { label: "Moon", set: moon },
    { label: "Envelope", set: mail },
    // { label: "Smooth Circle", set: Smooth },
    // { label: "Smooth Circle", set: spray },
  ];

  const [encodedDots, setEncodedDots] = useState<string>(encodeSet(buttonData[0].set));
  const [selected, setSelected] = useState<number>(0); // Default selected is the first button (index 0)
  // const [isModified, setIsModified] = useState(false);

  const handleNewIcon = () => {
    setSelected(-1);
    //setIsModified(true);
  };

  const handleStartEdit = () => {
    setSelected(-1);
    // setIsModified(true);
  };

const handleClick = (index: number, set: Set<number>) => {
  setSelected(index);
  setEncodedDots(""); // force reset so same icon re-triggers useEffect
  setTimeout(() => setEncodedDots(encodeSet(set)), 0);
};

  const gridRef = useRef<HTMLDivElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });



    // Grid indicator: tracks full tile position relative to the grid container
    const updateGridIndicator = useCallback(() => {
      if (!gridRef.current) return;

      if (selected < 0) {
        setIndicatorStyle({ left: 0, top: 0, width: 0, height: 0 });
        return;
      }
  
      const container = gridRef.current;
      const selectedEl = container.children[selected] as HTMLElement;
      if (!selectedEl) return;
  
      const containerRect = container.getBoundingClientRect();
      const selectedRect = selectedEl.getBoundingClientRect();
  
      setIndicatorStyle({
        left: selectedRect.left - containerRect.left,
        top: selectedRect.top - containerRect.top,
        width: selectedRect.width,
        height: selectedRect.height,
      });
    }, [selected]);
  

  
    // Fire grid indicator on selection change
    useEffect(() => {
      updateGridIndicator();
    }, [selected, updateGridIndicator]);
  

  
    // Fire on resize
    useEffect(() => {
      const ro = new ResizeObserver(() => {
        updateGridIndicator();
      
      });
      if (gridRef.current) ro.observe(gridRef.current);
     
      return () => ro.disconnect();
    }, [updateGridIndicator]);





  return (
    <group data-gap="30" data-max-length="1200">
      <group
        data-gap="20"
        data-direction="column-600"
        data-width="auto"
        data-autofit="1-600"
      >
        <DotDisplayEdit
          predefinedEncodedDots={encodedDots}
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

          <group>
            <group
              data-gap="1"
              data-type="grid"
              data-grid-template="70"
              data-align="start"
              data-contain=""
              data-position="absolute"
            >
              {buttonData.map((button, index) => (
                <group key={index} data-border="" data-ratio="1:1"></group>
              ))}
            </group>

            <group
             ref={gridRef}
              data-gap="1"
              data-type="grid"
              data-grid-template="70"
              data-align="start"
            >
              {buttonData.map((button, index) => (
                <Tooltip
                  content={button.label}
                  distance={-5}
                  key={index}
                  delay={500}
                >
                  <group
                    data-border={selected === index ? "" : "none"}
                    data-index={selected === index ? "2" : ""}
                    key={index}
                    data-space="10"
                    data-interactive="border"
                    data-over-color="neutral"
               //     data-background={selected === index ? "adaptive-gray" : ""}
                    data-cursor="pointer"
                    onClick={() => handleClick(index, button.set)}
                    data-direction="column"
                  >
                    <group data-interact="">
                      <DotDisplay size={"fit"} activeIndexes={button.set} />
                    </group>
                  </group>
                </Tooltip>
              ))}



                        <group
                        data-pointer-event="none"
              data-name="grid-indicator"
              data-position="absolute"
              data-index="2"
             // data-space="5"
              data-pointer-events="none"
              style={{
                width: indicatorStyle.width,
                height: indicatorStyle.height,

                transform: `translate(${indicatorStyle.left}px, ${indicatorStyle.top}px)`,
              }}
            >
              <group
             //   data-radius="15"
                data-background="main-alpha-15"
                data-height="fit"
              ></group>
            </group>


            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default DotIconMaker;