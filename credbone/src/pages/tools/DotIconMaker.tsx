import React, { useCallback, useEffect, useRef, useState } from "react";
import DotDisplay from "../../template/dotDisplay";
import DotDisplayEdit, { EncodedDot } from "../../template/dotDisplayEdit";
import Ripple from "../../components/Ripple";
import Tooltip from "../../components/tooltip";

import { arrow,  gear, mail, moon,  sun } from "../tools/dotIcon";
import Scroll from "../../components/scroll";






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
  const [activeDots, setActiveDots] = useState<Map<number, EncodedDot>>(new Map());
  const [isInverted, setIsInverted] = useState(true);
  const toggleInvert = () => setIsInverted((prev) => !prev);
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
  
      // The grid is the scroll container (and position: relative), so the
      // indicator lives in content coordinates: offsets stay correct at any scroll
      setIndicatorStyle({
        left: selectedEl.offsetLeft,
        top: selectedEl.offsetTop,
        width: selectedEl.offsetWidth,
        height: selectedEl.offsetHeight,
      });
    }, [selected]);



    // Fire grid indicator on selection change
    useEffect(() => {
      updateGridIndicator();
    }, [selected, updateGridIndicator]);

    // Scroll the selected tile into the center of the strip
    useEffect(() => {
      const container = gridRef.current;
      if (!container || selected < 0) return;
      const selectedEl = container.children[selected] as HTMLElement;
      if (!selectedEl) return;

      container.scrollTo({
        left:
          selectedEl.offsetLeft -
          (container.clientWidth - selectedEl.offsetWidth) / 2,
        behavior: "smooth",
      });
    }, [selected]);
  

  
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
        data-gap="30"
        data-direction="column-600"
        data-width="auto"
        data-autofit="1-600"
      >
        <DotDisplayEdit
          predefinedEncodedDots={encodedDots}
          onNewIcon={handleNewIcon}
          onStartEdit={handleStartEdit}
          onDotsChange={setActiveDots}
        />

        <group
          data-autofit="1-600"
          data-length="320"
          data-direction="column"
          data-gap="30"
        >
        <group
          data-align="start"
          data-direction="column"
          data-border=""
          data-radius="40"
        //  data-gap="30"
        data-contain=""
        >
          <group  data-space="30" data-space-bottom="0" data-direction="column">
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
            <text data-opacity="30"  data-wrap="wrap">
              Choose one to view and customize
            </text>
          </group>

          <group                       data-scroll-mask="false">


<Scroll
wheelEnabled

                        buttonProps={{
                          "data-hide": "true",
                        }}

>
              <group
             ref={gridRef}
              data-wrap="no"
              data-space="20"
            >
              {buttonData.map((button, index) => (
                <Tooltip
                  content={button.label}
                  distance={-5}
                  key={index}
                  delay={500}
                >
                  <group
                  data-radius="20"
                  data-length="80"
              //      data-border={selected === index ? "" : "none"}
                    data-index={selected === index ? "2" : ""}
                    key={index}
                    data-space="10"
                    data-interactive=""
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
                data-radius="20"
                data-background="main-alpha-15"
                data-height="fit"
              ></group>
            </group>


            </group>
</Scroll>
          </group>




        </group>

        <group
          data-radius="40"
          data-border=""
          data-background={isInverted ? "text" : "context"}
          data-color={isInverted ? "main-background" : "text"}
          data-direction="column"
          data-justify="center"
          data-wrap="no"
        >
          <group
            data-direction="column"
            data-space="30"
            data-space-bottom="10"
            data-gap="30"
            data-height="fit"
          >
            <group data-direction="column" >
              <text
                data-weight="700"
                data-wrap="preline"
                data-text-size="large"
                data-ellipsis=""
                data-font-type="hero"
                data-line="1"
              >
                Preview
              </text>
              <text data-opacity="30" data-wrap="wrap">
                Your edits and icons update here live.
              </text>
            </group>
            <group data-position="center" data-justify="center">
              <DotDisplay size={120} activeDots={activeDots} />
            </group>
          </group>
          {/* <group data-space-horizontal="20">
            <separator data-horizontal="dotted" data-opacity="20"></separator>
          </group> */}

          <group data-space="20">
            <Ripple>
              <group
                data-ink-color="neutral"
                data-contain=""
                data-space-vertical="15"
                data-space-horizontal="20"
                data-align="center"
                data-justify="center"
                data-background="adaptive-gray"
                data-interactive=""
                data-over-color="neutral"
                data-radius="30"
                data-cursor="pointer"
                onClick={toggleInvert}
              >
                <text>Invert Colors</text>
              </group>
            </Ripple>
          </group>
        </group>
        </group>
      </group>
    </group>
  );
}

export default DotIconMaker;