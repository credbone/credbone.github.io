import React, { useState } from "react";
import TemplatePageHeader from "./TemplatePageHeader";
import Ripple from "../components/Ripple";
import { Pause, Play } from "lucide-react";
import Popover from "../components/popover";
import CustomSlider from "../components/inputs/slider";

const Motion: React.FC = () => {
  const [isrunning, setisrunning] = useState(true);
  const togglerun = () => {
    setisrunning((prev) => !prev);
  };

  const [isrunning_2, setisrunning_2] = useState(true);
  const togglerun_2 = () => {
    setisrunning_2((prev) => !prev);
  };

  const [DurationValue, setDurationValue] = useState(4.25);

  const timingFunction = [
    { value: "linear", name: "Linear" },
    { value: "ease", name: "Ease" },
    { value: "ease-in", name: "Ease In" },
    { value: "ease-out", name: "Ease Out" },
    { value: "ease-in-out", name: "Ease In Out" },
  ];

  const [selectedTiming, setselectedTiming] = useState<string>("ease");

  const handleWeightSelect = (weight: string) => {
    setselectedTiming(weight);
  };

  const stateOptions = [
    { value: "running", title: "Running" },
    { value: "paused", title: "Paused" },
  ];

  const [selectedState, setselectedState] = useState<string>("running");

  const handleStateSelect = (alignment: string) => {
    setselectedState(alignment);
  };

  return (
    <group
      data-space="30"
      data-gap="30"
      data-direction="column"
      data-align="start"
    >
      <TemplatePageHeader
        title="Motion & Animation"
        description="Motion establishes relationships and smooth transitions, guiding users through changes and helping them progress toward their goals."
        version="2.0.0"
        type="Token"
      />

      <group data-gap="30">
        <group data-gap="15" data-direction="column" data-space="30">
          <text data-wrap="wrap" data-weight="700" data-text-size="large">
            Foundations
          </text>
          <text
            data-wrap="wrap"
            data-light=""
            data-line="20"
            data-max-length="400"
          >
            Motion should feel natural, meaningful, and enhance clarity without
            distraction.
          </text>
        </group>

        <group data-type="grid" data-grid-template="300" data-gap="15">
          {/* animation - 1 */}

          <group
            data-space="30"
            data-radius="20"
            data-direction="column"
            data-wrap="no"
            data-gap="30"
          >
            <group
              data-ratio="1:1"
              data-radius="full"
              data-background="adaptive-gray"
            >
              <group
                data-height="fit"
                //  data-radius="full"
                data-space="50"
                data-contain=""
              >
                <group
                  data-top="-50%"
                  data-animation-interation="infinite"
                  data-animation-name="to-top"
                  data-animation-duration="28"
                  data-animation-play-state={isrunning ? "running" : "paused"}
                  data-gap="10"
                  data-direction="column"
                  data-wrap="no"
                >
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>

                  <group></group>
                </group>

                <group
                  data-top="-50%"
                  data-animation-interation="infinite"
                  data-animation-name="to-top"
                  data-animation-duration="28"
                  data-animation-play-state={isrunning ? "running" : "paused"}
                  data-gap="10"
                  data-direction="column"
                  data-wrap="no"
                >
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>
                  <group
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                  ></group>
                  <group></group>
                </group>
              </group>
              <group
                onClick={togglerun}
                data-align="center"
                data-justify="center"
                data-background="text"
                data-color="main-background"
                //   data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="30"
                data-cursor="pointer"
                data-space="15"
                data-contain=""
                data-position="absolute"
                data-bottom="0"
                data-left="0"
                data-length="60"
                data-height="60"
              >
                <group
                  data-interact=""
                  data-align="center"
                  data-justify="center"
                >
                  {isrunning ? (
                    <Pause strokeWidth={0} fill="currentColor" size={20} />
                  ) : (
                    <Play strokeWidth={0} fill="currentColor" size={20} />
                  )}
                </group>
              </group>
            </group>

            <group data-direction="column" data-gap="15">
              <text data-wrap="wrap" data-weight="700" data-text-size="large">
                Purpose & Intent
              </text>
              <text
                data-wrap="wrap"
                data-light=""
                data-line="20"
                data-max-length="400"
              >
                Creates meaningful connections and guides focus through
                intentional movement.
              </text>
            </group>
          </group>

          {/* animation - 2 */}
          <group
            data-space="30"
            data-radius="20"
            data-direction="column"
            data-wrap="no"
            data-gap="30"
          >
            <group
              data-ratio="1:1"
              data-radius="full"
              data-background="adaptive-gray"
              data-space="50"
            >
              <group
                data-height="fit"
                data-align="center"
                data-gap="10"
                data-type="grid"
                data-grid-template-columns="3"
              >
                {Array.from({ length: 9 }).map((_, index) => (
                  <group
                    key={index}
                    data-background="main-background"
                    data-radius="full"
                    data-ratio="1:1"
                    data-animation-name="to-bottom"
                    data-fill-mode="backwards"
                    data-animation-duration="28"
                    data-animation-delay={index * 0.5}
                    data-animation-interation="infinite"
                    data-animation-play-state={
                      isrunning_2 ? "running" : "paused"
                    }
                  ></group>
                ))}
              </group>
              <group
                onClick={togglerun_2}
                data-align="center"
                data-justify="center"
                data-background="text"
                data-color="main-background"
                // data-width="auto"
                data-interactive=""
                data-over-color="neutral"
                data-radius="30"
                data-cursor="pointer"
                data-space="15"
                data-contain=""
                data-position="absolute"
                data-bottom="0"
                data-left="0"
                data-length="60"
                data-height="60"
              >
                <group
                  data-interact=""
                  data-align="center"
                  data-justify="center"
                >
                  {isrunning_2 ? (
                    <Pause strokeWidth={0} fill="currentColor" size={20} />
                  ) : (
                    <Play strokeWidth={0} fill="currentColor" size={20} />
                  )}
                </group>
              </group>
            </group>

            <group data-direction="column" data-gap="15" data-align="start">
              <text data-wrap="wrap" data-weight="700" data-text-size="large">
                Harmony & Continuity
              </text>
              <text
                data-wrap="wrap"
                data-light=""
                data-line="20"
                data-max-length="400"
              >
                Ensures choreographed movement for smooth, consistent, and
                connected experiences.
              </text>
            </group>
          </group>
        </group>
      </group>

      <TemplatePageHeader
        title="Tokens"
        description="Motion parameters applicable for shape, including timing, duration, and state properties."
      />

      <group data-gap="15" data-align="start">
        <group data-space="20">
          <text
            data-wrap="wrap"
            data-line="1.5"
            //   data-opacity="60"
            data-max-length="400"
          >
            This demo showcases token functionality for value demonstration
            only. Combine tokens thoughtfully to create valid and effective
            designs.
          </text>
        </group>
      </group>

      <group data-type="grid" data-grid-template="300" data-gap="30">
        <group data-gap="15">
          <group data-border="" data-radius="15" data-contain="">
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
                  {timingFunction.map(({ value, name }, index) => (
                    <group
                      key={value}
                      onClick={() => handleWeightSelect(value)}
                      data-background={selectedTiming === value ? "main" : ""}
                      data-color={selectedTiming === value ? "main-text" : ""}
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration={2 + index * 0.5}
                      data-align="center"
                      data-interactive=""
                      data-over-color="neutral"
                      //  data-radius="5"
                      data-cursor="pointer"
                      data-space="15"
                      data-gap="10"
                    >
                      {/* <text data-weight={value}>{value}</text> */}
                      <text>{name}</text>
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
                    data-space="15"
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
                        <text>Timing</text>
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
                        <text data-ellipsis="">{selectedTiming}</text>
                      </group>
                    </group>
                  </group>
                </Ripple>
              </group>
            </Popover>

            <separator data-horizontal=""></separator>

            <group data-align="center" data-gap="15" data-space="15">
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
                  <text>Duration</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={0.25}
                  start={2.25}
                  end={7.25}
                  showvalue={false}
                  unit={`${DurationValue * 100}`}
                  value={DurationValue}
                  onValueChange={(value) => setDurationValue(value)}
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

          <group data-border="" data-radius="15" data-contain="">
            <group data-align="center" data-gap="15" data-space="15">
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
                  <text>State</text>
                </group>
              </group>

              <separator data-vertical="adaptive"></separator>

              <group data-gap="5" data-width="auto" data-wrap="no">
                {stateOptions.map(({ value, title }) => (
                  <group
                    key={value}
                    onClick={() => handleStateSelect(value)}
                    data-align="center"
                    data-justify="center"
                    data-background={selectedState === value ? "highlight" : ""}
                    data-border={selectedState === value ? "none" : "outline"}
                    data-width="auto"
                    data-interactive=""
                    data-over-color="neutral"
                    data-radius="10"
                    data-cursor="pointer"
                    data-space-vertical="10"
                    data-space-horizontal="15"
                  >
                    <text>{value}</text>
                  </group>
                ))}
              </group>
            </group>
          </group>
        </group>

        <group
          data-sticky="top"
          data-top="15"
          data-direction="column"
          data-align="start"
          data-border=""
          data-radius="20"
          data-justify="center"
        >
          <group
            data-space="30"
            data-align="center"
            data-direction="column"
            data-contain=""
            data-justify="center"
          >
            <group
              data-animation-interation="infinite"
              data-animation-name="to-right"
              data-animation-duration={DurationValue}
              data-animation-direction="alternate"
              data-animation-timing={selectedTiming}
              data-animation-play-state={selectedState}
            >
              <group
                data-height="60"
                data-length="60"
                data-radius="full"
                data-background="text"
              ></group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Motion;
