import React, { useEffect, useState } from "react";
import DemoThemeToggle from "../components/DemoThemeToggle";

import ThemePickerVertical from "./themePickerVertical";
import Tooltip from "../components/tooltip";
import Ripple from "../components/Ripple";

import sampleImage_3 from "../styles/images/samples/wide_res_72.webp";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";
import DotDisplay from "./dotDisplay";
import { useCyclingDots } from "../pages/tools/DotCycler";


const Content: React.FC = () => {
  const [hidden, setHidden] = useState(true);


const activeDots = useCyclingDots();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // const [message, setMessage] = useState<string>("");
  // const phrases = ["welcome", "hello", "hi"];

  // useEffect(() => {
  //   const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  //   setMessage(randomPhrase);
  // }, []);

  return (
    <>
      <group data-max-length="1080">
        {/* <group
          data-position="absolute"
          data-type="grid"
          data-grid-template-columns="dynamic"
          data-space="30"
          data-align="start"
        >
          <group
            data-radius="full-top-left"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-top-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-top-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-top-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius=""
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-top-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-bottom-left"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-radius="full-bottom-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-adaptive="desktop-500"
            data-radius="full-bottom-left"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-adaptive="desktop-500"
            data-radius="full-bottom-left"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-adaptive="desktop-500"
            data-radius=""
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
          <group
            data-adaptive="desktop-500"
            data-radius="full-bottom-right"
            data-ratio="1:1"
            data-border="30-neutral-lighter"
          ></group>
        </group> */}

        <group data-align="start">
          <group
            data-type="grid"
            data-grid-template-columns="dynamic"
        //    data-radius="130"
        //    data-background="neutral-lighter"
         //   data-space="30"
            data-align="start"
          >
            <group
              data-column-end="2"
              data-direction="column-600"
              data-wrap="no"
              data-align="start"
            >
              <group
                data-direction="row-600"
                data-contain=""
                data-wrap="no"
                data-align="start"
              >
                <group
                  data-ratio="1:1"
                  data-radius="full"
                  data-background="adaptive-gray"
                ></group>

                <Tooltip
                  //  distance={-30}

                  placement="cursor"
                  data-contain="visible"
                  //data-color="text"
                  data-backdrop="20-dark"
                  data-space-vertical="20"
                  data-space-horizontal="25"
                  data-radius="20"
                  content={
                    isMobile ? undefined : (
                      <text data-wrap="preline">
                        Switch apperance.
                        <br></br>
                        Applicable tokens auto-handled.
                      </text>
                    )
                  }
                >
                  <group
                    data-ratio="1:1"
                    data-radius="full"
                    data-background="text"
                    data-color="main-background"
                    data-contain=""
                  >
                    <DemoThemeToggle />
                  </group>
                </Tooltip>
              </group>

              <group
                data-ratio="1:2/2:1-600"
                data-contain=""
                data-align="start"
              >
                <group data-height="fit" data-contain="" data-align="start">
                  <ThemePickerVertical />
                </group>
              </group>
            </group>
            <Tooltip
              //  distance={-30}

              placement="cursor"
              data-contain="visible"
              data-color="text"
              data-backdrop="20"
              data-space-vertical="20"
              data-space-horizontal="25"
              data-radius="20"
              content={
                isMobile ? undefined : (
                  <text data-wrap="preline">
                    Define & Structure.
                    <br></br>
                    Explore tokens and patterns.
                  </text>
                )
              }
            >
              <Link
                data-drag="none"
                to={"/Components/Overview"}
                data-type="group"
                data-column-end="2-500"
                data-align="start"
                data-contain=""
              >
                <Ripple>
                  <group
                    data-interactive=""
                    data-react="scale"
                    data-over-color="none"
                    data-ink-color="neutral"
                    data-radius="130"
                    data-align="start"
                    data-wrap="no"
                    data-contain=""
                    data-direction="row-500"
                    data-cursor="pointer"
                  >
                    <picture
                      data-mask="top"
                      // data-radius="60"
                      data-brightness="adaptive"
                      data-position="absolute"
                      //    data-background="grey-light"
                    >
                      <img src={sampleImage_3} alt=""></img>
                    </picture>
                    <group
                      data-order="2-500"
                      data-ratio="1:1"
                      data-align="center"
                      data-justify="center"
                    >


<group data-interact="" data-width="auto" data-space="20" data-contain="" >

</group>

                    </group>

                    <group
                      data-interact=""
                      //         data-position="absolute"
                      //  data-length="100%"
                      data-ratio="1:1"
                      data-align="center"
                      data-justify="center"
                      data-space="20"
                      data-theme="dark"
                      data-contain=""
                    //  data-shadow="crips"
                    >
                      {/* <group
                        data-theme="dark"
                        data-ratio="1:1"
                        //  data-background="text"
                        data-radius="130"
                        data-length="1/3"
                        data-contain=""
                      >
                        <group
                          data-border="50"
                          data-position="center"
                          data-height="1/3"
                          data-length="1/3"
                          data-radius="20"
                          //    data-background="neutral-lighter"
                        ></group>
                      </group> */}

  <DotDisplay size="fit" activeIndexes={activeDots} />

                    </group>
                  </group>
                </Ripple>
              </Link>
            </Tooltip>
            <group
              data-column-end="2"
              data-direction="column"
              data-adaptive="desktop-500"
              data-adaptive-section="800-1000"
              data-contain=""
              data-align="start"
            >
              <group data-wrap="no" data-ratio="2:1" data-align="start">
                <group
                  data-ratio="1:1"
                  //          data-length="200"
                  data-radius="full"
                 data-border="outline"
                ></group>

                <group
                  data-length="50%"
                  data-ratio="1:1"
                  //     data-length="200"
                  data-radius="full"
                  data-background="adaptive-gray"
                  //   data-space="20"
                  data-contain=""
                  data-direction="column"
                >
                  <Tooltip
                    //    delay={200}
                    placement="cursor"
                    data-contain="visible"
                    data-color="text"
                    data-background="none"
                    data-backdrop="20"
                    data-space-vertical="20"
                    data-space-horizontal="25"
                    distance={-30}
                    data-radius="20"
                    //  data-text-align="right"
                    content={
                      isMobile ? undefined : (
                        <text data-wrap="preline">
                          Explore Demos.
                          <br />
                          See the system in action.
                        </text>
                      )
                    }
                  >
                    <group
                      data-height="fit"
                      data-align="start"
                      data-direction="column"
                      data-contain=""
                      data-ink-color="neutral"
                    >
                      <Ripple>
                        <Link
                          data-drag="none"
                          data-type="group"
                          to={"/Components/QuickDemos"}
                          data-height="fit"
                          data-contain=""
                          //  data-radius="130"
                          data-interactive=""
                          data-over-color="none"
                          data-align="start"
                          data-direction="column"
                        >
                          <group
                            data-animation-name="appear-bottom"
                            data-appear={isMobile ? undefined : "hover-bottom"}
                            data-opacity={!isMobile && hidden ? "0" : undefined}
                            data-cursor="pointer"
                            data-ratio="1:1"
                            data-position="center"
                            data-radius="130"
                            //   data-length="60"
                            //  data-background="adaptive-gray"
                            data-contain=""
                            data-space="20"
                          >
                            {/* <group
                            //   data-border="20"
                            data-height="20"
                            data-position="center"
                            data-length="20"
                            data-radius="20"
                            data-background="context"
                          ></group> */}

                            <group
                              data-height="fit"
                              data-contain=""
                              data-interact=""
                              
                            >
                

 
    <svg width="100%" height="100%" viewBox="0 0 160 160" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="125" r="2"/>
<circle cx="75" cy="115" r="4"/>
<circle cx="75" cy="105" r="4"/>
<circle cx="75" cy="95" r="6"/>
<circle cx="45" cy="75" r="2"/>
<circle cx="55" cy="75" r="4"/>
<circle cx="75" cy="75" r="6"/>
<circle cx="55" cy="65" r="2"/>
<circle cx="75" cy="55" r="4"/>
<circle cx="75" cy="45" r="2"/>
<circle cx="75" cy="65" r="4"/>
<circle cx="65" cy="65" r="4"/>
<circle cx="105" cy="85" r="4"/>
<circle cx="105" cy="95" r="2"/>
<circle cx="95" cy="95" r="4"/>
<circle cx="95" cy="105" r="2"/>
<circle cx="85" cy="105" r="4"/>
<circle cx="85" cy="115" r="2"/>
<circle cx="85" cy="95" r="4"/>
<circle cx="85" cy="85" r="6"/>
<circle cx="85" cy="75" r="6"/>
<circle cx="85" cy="65" r="6"/>
<circle cx="85" cy="35" r="2"/>
<circle cx="65" cy="55" r="2"/>
<circle cx="65" cy="85" r="6"/>
<circle cx="95" cy="75" r="4"/>
<circle cx="55" cy="85" r="4"/>
<circle cx="105" cy="75" r="4"/>
<circle cx="95" cy="65" r="4"/>
<circle cx="95" cy="55" r="4"/>
<circle cx="95" cy="45" r="4"/>
<circle cx="95" cy="35" r="2"/>
<circle cx="65" cy="95" r="4"/>
<circle cx="85" cy="45" r="4"/>
<circle cx="85" cy="55" r="4"/>
<circle cx="95" cy="25" r="2"/>
<circle cx="65" cy="135" r="2"/>
<circle cx="65" cy="125" r="2"/>
<circle cx="65" cy="115" r="4"/>
<circle cx="65" cy="105" r="4"/>
<circle cx="115" cy="85" r="2"/>
<circle cx="75" cy="85" r="6"/>
<circle cx="35" cy="85" r="2"/>
<circle cx="45" cy="85" r="4"/>
<circle cx="115" cy="75" r="2"/>
<circle cx="125" cy="75" r="2"/>
<circle cx="65" cy="75" r="4"/>
<circle cx="95" cy="85" r="4"/>
    </svg>
  
  
                            </group>
                          </group>
                        </Link>
                      </Ripple>
                    </group>
                  </Tooltip>
                </group>
              </group>

              <group data-ratio="2:1" data-align="start">
                <group
                  data-radius="130"
                data-background="adaptive-gray"
                  data-height="fit"
                  data-align="center"
                  data-justify="center"
                  data-space="20"
                  data-direction="column"data-contain=""
                  data-gap="5"
                  data-wrap="no"
                >

<text data-wrap="preline"  data-line="1" data-length="200" data-font-type="hero" data-text-size="medium"  data-text-align="center" data-ellipsis=""> There’s More to Search.
Keep Exploring.</text>

                </group>
              </group>
            </group>

            <group
              data-direction="row-600"
              data-column-end="2-500"
              data-wrap="no-500"
              data-align="start"
              //  data-contain=""
            >
              {/* Circles Section */}

              <group
                data-pointer-event="none"
                data-index="2"
                data-ratio="1:1"
                data-radius="full"
                data-direction="column"
                data-align="center"
                data-justify="center"
              >
                <svg
                  data-position="absolute"
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    vectorEffect="non-scaling-stroke"
                    x1="0"
                    y1="100"
                    x2="50"
                    y2="50"
                    //  stroke="black"
                    strokeWidth="1"
                    data-stroke="outline"
                  />
                </svg>

                <group
                  data-position="absolute"
                  data-length="100%"
                  data-ratio="1:1"
                  data-animation-name="to-position"
                  data-animation-duration="7.25"
                  data-translate="50%,-50%"
                  data-align="center"
                  data-justify="center"
                  data-adaptive="desktop-500"
                >
                  <group
                    data-ratio="1:1"
                    data-background="text"
                    data-radius="130"
                    data-length="1/3"
                  ></group>
                </group>
                <group
                  data-position="absolute"
                  data-length="100%"
                  data-ratio="1:1"
                  // data-animation-name="to-position"
                  // data-animation-duration="6.25"
                  data-translate="-50%,50%"
                  data-align="center"
                  data-justify="center"
                >
                  <group
                    data-ratio="1:1"
                    data-background="adaptive-gray"
                    data-radius="130"
                    data-length="1/3"
                    data-direction="column"
                  >
                    <group
                      data-position="center"
                      data-background="text"
                      data-radius="10"
                      data-height="10"
                      data-length="10"
                    ></group>
                  </group>
                </group>

                <group
                  data-position="absolute"
                  data-length="100%"
                  data-ratio="1:1"
                  data-animation-name="to-position"
                  data-animation-duration="5.25"
                  data-translate="30px,-30px"
                  data-align="center"
                  data-justify="center"
                >
                  <group
                    data-ratio="1:1"
                    data-background="adaptive-gray"
                    data-radius="130"
                    data-length="1/3"
                  ></group>
                </group>

                <group
                  data-position="absolute"
                  data-length="100%"
                  data-ratio="1:1"
                  data-animation-name="to-position"
                  data-animation-duration="6.25"
                  data-translate="10px,-10px"
                  data-align="center"
                  data-justify="center"
                >
                  <group
                    data-ratio="1:1"
                    data-background="adaptive-gray"
                    data-radius="130"
                    data-length="1/3"
                  ></group>
                </group>

                <group
                  data-ratio="1:1"
                  data-backdrop="20"
                  data-radius="130"
                  data-length="1/3"
                ></group>
              </group>

              {/* Resize Section */}

              <group
                data-index="2"
                data-ratio="1:1"
                data-radius="full"
            data-border=""
                data-ink-color="neutral"
              >
                <group
                  data-border="outline"
                  data-height="fit"
                  data-radius-bottom-right="10"
                >
                  <group
                    data-position="absolute"
                    data-radius="10"
                    data-height="10"
                    data-length="10"
                    data-bottom="-5"
                    data-right="-5"
                    data-border="4"
                    //   data-background="main-background"
                  ></group>
                  <group
                    data-position="absolute"
                    data-radius="10"
                    data-height="10"
                    data-length="10"
                    data-background="text"
                    data-bottom="-5"
                    data-left="-5"
                  ></group>
                  <group
                    data-position="absolute"
                    data-radius="10"
                    data-height="10"
                    data-length="10"
                    data-background="text"
                    data-top="-5"
                    data-right="-5"
                  ></group>
                  <group
                    data-position="absolute"
                    data-radius="10"
                    data-height="10"
                    data-length="10"
                    data-background="text"
                    data-border="5-main-background"
                    data-top="-5"
                    data-left="-5"
                  ></group>

                  <Tooltip
                    //     delay={200}
                    placement="cursor"
                    data-contain="visible"
                    data-color="text"
                    data-backdrop="20"
                    distance={-30}
                    data-space-vertical="20"
                    data-space-horizontal="25"
                    data-radius="20"
                    // data-text-align="right"
                    content={
                      isMobile ? undefined : (
                        <text data-wrap="preline">
                          Create & Experiment.
                          <br />
                          Explore the system tools.
                        </text>
                      )
                    }
                  >
                    <group
                      data-height="fit"
                      data-align="start"
                      data-direction="column"
                      data-contain=""
                      data-radius="130"
                    >
                      <Ripple>
                        <Link
                          data-drag="none"
                          to={"/Tools"}
                          data-type="group"
                          data-height="fit"
                          data-contain=""
                          // data-radius="130"
                          data-interactive=""
                          data-over-color="none"
                          data-align="start"
                          data-direction="column"
                        >
                          <group
                            data-appear={isMobile ? undefined : "hover-bottom"}
                            data-opacity={!isMobile && hidden ? "0" : undefined}
                            data-interact=""
                            data-cursor="pointer"
                            data-ratio="1:1"
                            data-position="center"
                            data-radius="130"
                            data-contain=""
                            data-space="20"
                          >
                            <group
                              data-interact=""
                              data-height="fit"
                              data-contain=""
                            >
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 160 160"
                                fill="currentcolor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="55" cy="55" r="2" />
                                <circle cx="65" cy="65" r="4" />
                                <circle cx="75" cy="75" r="6" />
                                <circle cx="85" cy="85" r="6" />
                                <circle cx="95" cy="95" r="4" />
                                <circle cx="55" cy="105" r="2" />
                                <circle cx="65" cy="95" r="4" />
                                <circle cx="75" cy="95" r="4" />
                                <circle cx="85" cy="95" r="4" />
                                <circle cx="55" cy="95" r="2" />
                                <circle cx="75" cy="85" r="6" />
                                <circle cx="65" cy="75" r="4" />
                                <circle cx="55" cy="65" r="2" />
                                <circle cx="55" cy="75" r="2" />
                                <circle cx="55" cy="85" r="2" />
                                <circle cx="65" cy="85" r="4" />
                                <circle cx="55" cy="45" r="2" />
                                <circle cx="65" cy="55" r="4" />
                                <circle cx="75" cy="65" r="6" />
                                <circle cx="85" cy="75" r="6" />
                                <circle cx="95" cy="85" r="6" />
                                <circle cx="105" cy="95" r="4" />
                                <circle cx="55" cy="35" r="2" />
                                <circle cx="65" cy="45" r="4" />
                                <circle cx="75" cy="55" r="6" />
                                <circle cx="85" cy="65" r="6" />
                                <circle cx="95" cy="75" r="6" />
                                <circle cx="105" cy="85" r="6" />
                                <circle cx="115" cy="95" r="4" />
                                <circle cx="55" cy="125" r="2" />
                                <circle cx="55" cy="115" r="2" />
                                <circle cx="65" cy="105" r="4" />
                                <circle cx="75" cy="105" r="2" />
                                <circle cx="65" cy="115" r="2" />
                                <circle cx="55" cy="25" r="2" />
                                <circle cx="65" cy="35" r="4" />
                                <circle cx="75" cy="45" r="4" />
                                <circle cx="85" cy="55" r="4" />
                                <circle cx="105" cy="75" r="4" />
                                <circle cx="115" cy="85" r="4" />
                                <circle cx="125" cy="95" r="4" />
                                <circle cx="95" cy="65" r="4" />
                              </svg>
                            </group>
                          </group>
                        </Link>
                      </Ripple>
                    </group>
                  </Tooltip>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
};
export default Content;

{
  /* <Popover
            placement="mouse"
            content={
              <group
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="1.25"
              >
                <RichThemePicker pickerType="primary" />
              </group>
            }
            data-space="5"
            data-radius="10"
            data-backdrop="10"
            data-width="auto"
          >
            <group
              data-max-length="300"
              data-position="center"
              data-cursor="pointer"
            >
              <group data-space="10%">
                <group data-height="fit">
                  <group
                    data-position="absolute"
                    data-border="inset"
                    data-right="100%"
                    data-height="fit"
                    data-disabled="true"
                    data-radius="full"
                  ></group>

                  <Ripple>
                    <group
                      data-index="4"
                      data-contain=""
                      data-ink-color="main-dark"
                      data-ratio="1:1"
                      data-background="main"
                      data-color="main-text"
                      data-radius="full"
                    >
                      <ThemNameDisplay/>
                    </group>
                  </Ripple>
                </group>
              </group>
              <group
                data-position="absolute"
                data-disabled="true"
                data-height="fit"
                data-index="4"
              >
                <picture
                //    data-brightness="adaptive"

                // data-background="grey-light"
                //    data-min-height="300"
                >
                  <img src={sampleImage_3} alt="" />
                </picture>
              </group>
            </group>
          </Popover> */
}
