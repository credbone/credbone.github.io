import React, { useEffect, useState } from "react";
import Tooltip from "../components/tooltip";
import Ripple from "../components/Ripple";
import Popover from "../components/popover";
import CustomSlider from "../components/inputs/slider";


type Placement = "top" | "bottom" | "left" | "right" | "auto";

const TooltipPropsDemo: React.FC = () => {
  const [selectedPlacement, setSelectedPlacement] = useState<Placement>("auto");

  const placementOptions = [
    { value: "auto", title: "Auto" },
    { value: "top", title: "Top" },
    { value: "bottom", title: "Bottom" },
    { value: "left", title: "Left" },
    { value: "right", title: "Right" },
  ];

  const handlePlacementSelect = (placement: Placement) => {
    setSelectedPlacement(placement);
  };

  const [selectedColor, setSelectedColor] = useState<{
    background: string;
    color: string;
  }>({
    background: "tooltip",
    color: "white",
  });

  const colorOptions = [
    { background: "tooltip", color: "white" },

    { background: "main", color: "main-text" },
    { background: "neutral-light", color: "default" },
    { background: "neutral-lighter", color: "default" },
    { background: "neutral-lightest", color: "default" },
  ];

  const handleColorSelect = (option: {
    background: string;
    color: string;
  }) => {
    setSelectedColor(option);
  };

  const [GapValue, setGapValue] = useState(10);
  const [RadiusValue, setRadiusValue] = useState(10);
  const [DelayValue, setDelayValue] = useState(0);

  const [hasChanged, setHasChanged] = useState(false);

  // Check if any value has changed from the initial state
  useEffect(() => {
    if (
      selectedColor.background !== "tooltip" ||
      selectedColor.color !== "white" ||
      GapValue !== 10 ||
      RadiusValue !== 10 ||
      DelayValue !== 0 ||
      selectedPlacement !== "auto"
    ) {
      setHasChanged(true);
    }
  }, [selectedColor, GapValue, RadiusValue, DelayValue, selectedPlacement]);
  
  const resetValues = () => {
    setSelectedColor({ background: "tooltip", color: "white" });
    setGapValue(10);
    setRadiusValue(10);
    setDelayValue(0);
    setSelectedPlacement("auto");
    setHasChanged(false); // Hide the reset button after reset
  };

  return (
    <>
      <group data-space="20">
        <text data-wrap="wrap" data-line="1.5" data-max-length="400">
          This demo showcases token functionality for value demonstration only.
          Combine tokens thoughtfully to create valid and effective designs.
        </text>
      </group>

      <group
        data-type="grid"
        data-grid-template="300"
        data-gap="30"
        // data-align="start"
      >
        <group data-gap="15">
          <group data-elevation="2" data-background="context" data-radius="20" data-contain="" data-index="2">
            <Popover
              placement="middle"
              data-radius="10"
              data-space="0"
              data-space-vertical="10"
              content={(closePopover) => (
                <group
                  data-direction="column"
                  //   data-length="240"
                  onClick={closePopover}
                >
                  {placementOptions.map(({ value }) => (
                    <group
                      key={value}
                      onClick={() => handlePlacementSelect(value as Placement)}
                      data-background={
                        selectedPlacement === value ? "main" : ""
                      }
                      data-color={
                        selectedPlacement === value ? "main-text" : ""
                      }
                      data-align="center"
                      data-interactive=""
                      data-over-color="neutral"
                      //  data-radius="5"
                      data-cursor="pointer"
                      data-space="15"
                      data-gap="10"
                    >
                      <text
                        data-text-transform="capitalize"
                        data-weight={value}
                      >
                        {value}
                      </text>
                    </group>
                  ))}
                </group>
              )}
            >
              <group>
                <Ripple>
                  <group
                    data-align="center"
                    data-gap="15"
                    data-wrap="no"
                    data-space="20"
                    data-interactive=""
                    data-over-color="neutral"
                    data-cursor="pointer"
                    data-ink-color="neutral"
                  >
                    <group
                      data-width="auto"
                      //data-min-length="80"
                    >
                      <group
                        data-space-horizontal="15"
                        data-space-vertical="10"
                        data-background="text"
                        data-width="auto"
                        data-color="main-background"
                        data-radius="30"
                      >
                        <text data-ellipsis="">Placement</text>
                      </group>
                    </group>

                    <separator data-vertical=""></separator>

                    <group
                      data-align="center"
                      data-contain=""
                      data-gap="10"
                      data-wrap="no"
                    >
                      <group
                        data-align="center"
                        data-justify="center"
                        data-background="adaptive-gray"
                        data-width="auto"
                        data-radius="10"
                        data-space-vertical="10"
                        data-space-horizontal="15"
                        data-contain=""
                      >
                        <text data-ellipsis="">{selectedPlacement}</text>
                      </group>

                      <text data-opacity="30" data-position="right">
                        Change
                      </text>
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>
            <separator data-horizontal=""></separator>
            <group data-align="center" data-gap="15" data-space="20">
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group
                  data-space-horizontal="15"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                >
                  <text>Distance</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={5}
                  start={-10}
                  end={30}
                  value={GapValue}
                  onValueChange={(value) => setGapValue(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin-right": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
            <separator data-horizontal=""></separator>
            <group data-align="center" data-gap="15" data-space="20">
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group
                  data-space-horizontal="15"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                >
                  <text>Delay</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={100}
                  start={0}
                  end={500}
                  value={DelayValue}
                  onValueChange={(value) => setDelayValue(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin-right": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
          </group>

          <group data-space="20">
            <text data-wrap="wrap" data-line="1.5" data-max-length="300">
              This tooltip configuration includes specific settings tailored for
              its behavior, along with a subset of system-level configurations
              applicable to tooltips. Only the most relevant options are shown
              here for clarity.
            </text>
          </group>

          <group data-elevation="2" data-background="context" data-radius="20" data-index="1">
            <group data-align="center" data-gap="15" data-space="20">
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group
                  data-space-horizontal="15"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                >
                  <text>Radius</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={5}
                  start={0}
                  end={30}
                  value={RadiusValue}
                  onValueChange={(value) => setRadiusValue(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin-right": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>

<separator data-horizontal=""></separator>

            <group data-align="center" data-gap="15" data-space="20">
              <group
                data-width="auto"
                //data-min-length="80"
              >
                <group
                  data-space-horizontal="15"
                  data-space-vertical="10"
                  data-background="text"
                  data-width="auto"
                  data-color="main-background"
                  data-radius="30"
                >
                  <text>Color</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <group
                //  data-width="auto"
                  data-wrap="no"
                  data-type="grid"
                  data-grid-template="30"
                >
                  {colorOptions.map((option, index) => (
                    <group
                      data-ratio="1:1"
                      data-interactive=""
                      data-over-color="none"
                      data-cursor="pointer"
                      key={index}
                      onClick={() => handleColorSelect(option)}
                    >
                      <group
                        data-duration=".125"
                        data-over-color="neutral-10"
                        data-react="background"
                        data-border="none"
                        data-margin={
                          selectedColor.background === option.background
                            ? "5"
                            : undefined
                        }
                        data-align="center"
                        data-justify="center"
                        data-space="5"
                        data-background={option.background}
                        data-color={option.color}
                        data-radius={
                          selectedColor.background === option.background
                            ? "30"
                            : ""
                        }
                      ></group>
                    </group>
                  ))}
                </group>
              </group>
            </group>
          </group>
        </group>

        <group
       

       data-elevation="2"

          data-radius="40"
          data-align="center"
        
          data-gap="30"
          data-space="30"

          data-direction="column"

        >


{/* <group data-position="absolute" data-height="fit" data-top="0" data-disabled="" data-space="20"> 

<group>




            <svg viewBox="0 0 48 48" data-height="0" data-length="0" data-position="absolute">
                             <defs>
                  <pattern
                    id="combined-svg-15"
                    width="48"
                    height="48"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                  >
                    <g opacity="0.1">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-0.64647 24.3536L24.3535 -0.646439L23.6464 -1.35355L-1.35358 23.6465L-0.64647 24.3536ZM-0.64647 36.3536L36.3535 -0.646439L35.6464 -1.35355L-1.35358 35.6464L-0.64647 36.3536ZM48.3535 -0.646439L-0.64647 48.3536L-1.35358 47.6465L47.6464 -1.35355L48.3535 -0.646439ZM10.3535 49.3536L49.3535 10.3536L48.6464 9.64645L9.64642 48.6464L10.3535 49.3536ZM49.3535 22.3535L22.3535 49.3535L21.6464 48.6464L48.6464 21.6464L49.3535 22.3535ZM34.3535 49.3536L49.3535 34.3536L48.6464 33.6465L33.6464 48.6464L34.3535 49.3536ZM49.3535 46.3536L46.3535 49.3536L45.6464 48.6465L48.6464 45.6465L49.3535 46.3536ZM-0.64647 12.3536L12.3535 -0.646439L11.6464 -1.35355L-1.35358 11.6465L-0.64647 12.3536Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </pattern>
                </defs>
            </svg>
            <svg width="100%" height="100%" >
              <rect
                width="100%"
                height="100%"
                fill="url(#combined-svg-15)"
              ></rect>
            </svg>
          </group>

</group> */}


<group data-height="45"></group>

          <Tooltip
            delay={DelayValue}
            distance={GapValue}
            content="I am a tooltip"
            placement={selectedPlacement}
            data-radius={RadiusValue}
            data-background={selectedColor.background}
            data-color={selectedColor.color}
            
          >
            <button  data-index="1" data-type="group" data-width="auto" data-cursor="pointer" data-position="center" data-background="adaptive-gray" data-color="default" data-interactive="" data-space-vertical="15" data-space-horizontal="20" data-radius="15">
              <text>Hover or Touch</text>
            </button>
          </Tooltip>

<group data-height="45">

          {hasChanged  && (

  <group data-gap="30" data-width="auto">


                <group
                 data-space-vertical="15" data-space-horizontal="20"
                 
                 data-radius="15"
                  data-align="center"
                  data-justify="center"
             
data-background="adaptive-gray"

data-height="45"
data-direction="column"


                  data-width="auto" 
                  data-interactive=""
                  data-over-color="neutral"
                  
                  data-cursor="pointer"


                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration="2.25"

                  onClick={resetValues}
                >
              
                  <text>Reset</text>
                </group>
</group>
              )}

</group>



        </group>

        <group
          data-radius="40"
          data-background="context"
          data-border=""
          data-theme="dark"
          data-text-size="14"
          data-user-select="text"
        >
          <pre data-scroll="" data-space="30">
            <code>
              <span data-color="grey">{`<`}</span>
              <span data-color="teal-light">Tooltip</span>
              <br />
              <span>  </span>
              <span data-color="blue-light">content</span>
              <span data-color="grey">=</span>
              <span data-color="peach">"I am a tooltip"</span>
              <br />
              <span>  </span>
              <span data-color="blue-light">placement</span>
              <span data-color="grey">=</span>
              <span data-color="peach">"{selectedPlacement}"</span>
              <br />
              <span>  </span>
              <span data-color="blue-light">distance</span>
              <span data-color="grey">=</span>
              <span data-color="peach">"{GapValue}"</span>
              <br />
              {DelayValue !== 0 && (
                <>
                  <span>  </span>
                  <span data-color="blue-light">delay</span>
                  <span data-color="grey">=</span>
                  <span data-color="peach">"{DelayValue}"</span>
                  <br />
                </>
              )}
              {RadiusValue !== 10 && (
                <>
                  <span>  </span>
                  <span data-color="blue-light">data-radius</span>
                  <span data-color="grey">=</span>
                  <span data-color="peach">"{RadiusValue}"</span>
                  <br />
                </>
              )}
              {selectedColor.background !== "tooltip" && (
                <>
                  <span>  </span>
                  <span data-color="blue-light">data-background</span>
                  <span data-color="grey">=</span>
                  <span data-color="peach">"{selectedColor.background}"</span>
                  <br />
                </>
              )}
              <span data-color="grey">{`>`}</span>
              <br />
              <span>  </span>
              <span data-color="grey">{`<`}</span>
              <span data-color="blue">button</span>
              <span data-color="grey">{`>`}</span>
              <br />
              <span>    </span>Hover or Touch
              <br />
              <span>  </span>
              <span data-color="grey">{`</`}</span>
              <span data-color="blue">button</span>
              <span data-color="grey">{`>`}</span>
              <br />
              <span data-color="grey">{`</`}</span>
              <span data-color="teal-light">Tooltip</span>
              <span data-color="grey">{`>`}</span>
            </code>
          </pre>
        </group>
      </group>
    </>
  );
};
export default TooltipPropsDemo;