import React from "react";
import DemoThemeToggle from "../components/DemoThemeToggle";

import ThemePickerVertical from "./themePickerVertical";
import Tooltip from "../components/tooltip";
import Ripple from "../components/Ripple";

import sampleImage_3 from "../styles/images/samples/wide_res_70.webp";
import { Link } from "react-router-dom";

const Content: React.FC = () => {
  return (
    <>
      {/* <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group>
      <group data-radius="10" data-ratio="1:1" data-align="center" data-justify="center" data-background="highlight"></group> */}

      <group>
        {/* <group
          data-position="absolute"
          data-type="grid"
          data-grid-template-columns="dynamic"
          // data-radius="110"
          // data-background="adaptive-gray"
          data-space="30"
        >
{Array.from({ length: 12 }).map((_, index) => {
  const radiusMap: Record<number, string> = {
    0: "full-top-left",
    1: "full-top-right",
      2: "full-top-right",
      3: "full-top-right",
      5: "full-top-right",
    6: "full-bottom-left",
    7: "full-bottom-right",
    8: "full-bottom-left",
    9: "full-bottom-left",
     11: "full-bottom-right",
  };


  return (
    <group
      key={index}
      data-adaptive={index >= 8 ? "desktop-500" : undefined}
      data-radius={radiusMap[index] ?? ""}
      data-ratio="1:1"
      data-border="30-neutral-lighter"
    />
  );
})}
        </group> */}

        <group
          data-position="absolute"
          data-type="grid"
          data-grid-template-columns="dynamic"
          data-space="30"
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
        </group>

        <group >
          <group
            data-type="grid"
            data-grid-template-columns="dynamic"
            data-radius="130"
            data-background="neutral-lighter"
            data-space="30"
          >
            <group
              data-column-end="2"
              data-direction="column-600"
              data-wrap="no"
            >
              <group data-direction="row-600" data-contain="" data-wrap="no">
                <group
                  data-ratio="1:1"
                  data-radius="full"
                  data-background="context"
                ></group>

                <group
                  data-ratio="1:1"
                  data-radius="full"
                  data-background="text"
                  data-color="main-background"
                  data-contain=""
                >
                  <DemoThemeToggle />
                </group>
              </group>

              <group data-ratio="2:1-600">
                <group

                //    data-background="context"
                >
                  <ThemePickerVertical />
                </group>
              </group>
            </group>

            <group data-column-end="2-500">
              <Ripple>
                <group
                  data-interactive=""
                  data-react="scale"
                  data-over-color="neutral"
                  data-ink-color="neutral"
                //  data-ratio="2:1"
                  //       data-length="200"
                  data-radius="100"
                  //  data-background="context"
                  data-align="end"
                  data-wrap="no"
                  data-contain=""
                  data-direction="row-500"
                  data-cursor="pointer"
                >
                  <picture
                    data-mask="top"
                    data-radius="60"
                    data-brightness="adaptive"
                    data-position="absolute"
                    data-background="grey-light"
                  >
                    {/* <source media="(max-width: 700px)" srcSet={sampleImage_3}></source> */}
                    <img src={sampleImage_3} alt=""></img>
                  </picture>

                  <group
                    data-order="2-500"
                    data-ratio="1:1"
                    data-align="center"
                    data-justify="center"
                  ></group>
                  <group
                    data-interact=""
                    //         data-position="absolute"
                    //  data-length="100%"
                    data-ratio="1:1"
                    data-align="center"
                    data-justify="center"
                  >
                    <Tooltip
                      placement="right"
                      data-contain="visible"
                      data-color="text"
                      data-background="none"
                      data-backdrop="10"
                      data-space="20"
                      data-radius="20"
                      content={
                        <text
                          data-max-length="180"
                          data-wrap="wrap"
                          // data-text-size="medium"
                          // data-font-type="hero"
                        >
                          Start exploring how interactive elements shape the
                          experience.
                        </text>
                      }
                    >
                      <Link
                        data-drag="none"
                        to={"/Components/Overview"}
                        data-type="group"
                        data-theme="dark"
                        data-ratio="1:1"
                        //  data-background="text"
                        data-radius="100"
                        data-length="60"
                      >
                        <group
                          data-border="20"
                          data-height="20"
                          data-position="center"
                          data-length="20"
                          data-radius="20"
                          //    data-background="neutral-lighter"
                        ></group>
                      </Link>
                    </Tooltip>
                  </group>
                </group>
              </Ripple>
            </group>

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
                  data-background="context"
                ></group>

                <group
                  data-length="50%"
                  data-ratio="1:1"
                  //     data-length="200"
                  data-radius="full"
                  data-background="context"
                  data-space="20"
                  data-contain=""
                  data-direction="column"
                >
                  <svg
                    width="100%"
                    height="100%"
                    data-opacity="20"
                    viewBox="0 0 160 160"
                    fill="currentcolor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="55" cy="105" r="4" />
                    <circle cx="65" cy="95" r="4" />
                    <circle cx="75" cy="85" r="4" />
                    <circle cx="85" cy="85" r="4" />
                    <circle cx="85" cy="75" r="4" />
                    <circle cx="95" cy="75" r="4" />
                    <circle cx="95" cy="65" r="4" />
                    <circle cx="75" cy="95" r="4" />
                    <circle cx="65" cy="105" r="4" />
                    <circle cx="55" cy="115" r="4" />
                    <circle cx="105" cy="65" r="4" />
                    <circle cx="105" cy="55" r="4" />
                    <circle cx="115" cy="55" r="4" />
                    <circle cx="115" cy="65" r="4" />
                    <circle cx="115" cy="75" r="4" />
                    <circle cx="115" cy="85" r="4" />
                    <circle cx="115" cy="105" r="4" />
                    <circle cx="115" cy="95" r="4" />
                    <circle cx="105" cy="45" r="4" />
                    <circle cx="95" cy="45" r="4" />
                    <circle cx="85" cy="45" r="4" />
                    <circle cx="75" cy="45" r="4" />
                    <circle cx="55" cy="45" r="4" />
                    <circle cx="65" cy="45" r="4" />
                    <circle cx="115" cy="45" r="4" />
                    <circle cx="125" cy="45" r="4" />
                    <circle cx="125" cy="55" r="4" />
                    <circle cx="125" cy="65" r="4" />
                    <circle cx="125" cy="105" r="4" />
                    <circle cx="125" cy="95" r="4" />
                    <circle cx="125" cy="85" r="4" />
                    <circle cx="125" cy="75" r="4" />
                    <circle cx="55" cy="35" r="4" />
                    <circle cx="65" cy="35" r="4" />
                    <circle cx="75" cy="35" r="4" />
                    <circle cx="85" cy="35" r="4" />
                    <circle cx="95" cy="35" r="4" />
                    <circle cx="105" cy="35" r="4" />
                    <circle cx="115" cy="35" r="4" />
                    <circle cx="125" cy="35" r="4" />
                    <circle cx="95" cy="55" r="4" />
                    <circle cx="85" cy="65" r="4" />
                    <circle cx="75" cy="75" r="4" />
                    <circle cx="65" cy="85" r="4" />
                    <circle cx="55" cy="95" r="4" />
                    <circle cx="45" cy="105" r="4" />
                    <circle cx="45" cy="115" r="4" />
                    <circle cx="35" cy="115" r="4" />
                    <circle cx="45" cy="125" r="4" />
                    <circle cx="115" cy="115" r="4" />
                    <circle cx="125" cy="115" r="4" />
                    <circle cx="45" cy="35" r="4" />
                    <circle cx="45" cy="45" r="4" />
                  </svg>
                </group>
              </group>

              <group data-ratio="2:1" data-align="start">
                <group
                  data-radius="100"
                  data-background="context"
                  data-opacity="50"
                  data-height="fit"
                >
                  
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
                    data-radius="100"
                    data-length="60"
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
                    data-radius="100"
                    data-length="60"
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
                    data-radius="100"
                    data-length="60"
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
                    data-radius="100"
                    data-length="60"
                  ></group>
                </group>

                <group
                  data-ratio="1:1"
                  data-background="border-color"
                  data-radius="100"
                  data-length="60"
                ></group>
              </group>

              {/* Resize Section */}

              <group
                data-index="2"
                data-ratio="1:1"
                data-radius="full"
                data-background="context"
                data-ink-color="neutral"
              >
                <group data-border="outline" data-height="fit">
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

                  <Ripple>
                    <group
                      data-height="fit"
                      data-radius="full"
                      data-interactive=""
                      data-contain=""
                      data-over-color="none"
                    >
                      <Tooltip
                        placement="left"
                        data-contain="visible"
                        //   data-color="text"
                        //    data-background="none"
                        //   data-backdrop="10"
                        data-space="20"
                        data-radius="20"
                        data-text-align="right"
                        content={
                          <text data-length="150" data-wrap="wrap">
                            Create & Experiment. Explore the system tools.
                          </text>
                        }
                      >
                        <Link
                          data-drag="none"
                          to={"/Tools"}
                          data-type="group"
                          data-animation-name="appear-bottom"
                          data-fill-mode="backwards"
                          data-animation-duration="2.25"
                          data-animation-timing="fancy"
                          data-appear="hover"
                          data-interact=""
                          data-cursor="pointer"
                          data-ratio="1:1"
                          data-position="center"
                          data-radius="100"
                          data-length="60"
                          data-background="adaptive-gray"
                        >
                          <group
                            //   data-border="20"
                            data-height="20"
                            data-position="center"
                            data-length="20"
                            data-radius="20"
                            data-background="context"
                          ></group>
                        </Link>
                      </Tooltip>
                    </group>
                  </Ripple>
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
