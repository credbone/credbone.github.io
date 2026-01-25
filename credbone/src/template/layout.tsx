import React, { useEffect, useState } from "react";

import { SvgHamburgerToRight, SvgPlus } from "../components/svg";
import Switchable from "../components/Switchable";
import { Columns2 } from "lucide-react";
import TemplatePageHeader from "./TemplatePageHeader";
import CustomSlider from "../components/inputs/slider";
import StuckReporter from "../components/StuckReporter";

const Layout: React.FC = () => {
  const [count, setCount] = useState(8);
  const [template, settemplate] = useState(120);
  const [gap, setgap] = useState(10);

  const [isshowoverlay, setshowoverlay] = useState(true);

  const toggleoverlay = () => {
    setshowoverlay((prev) => !prev);
  };

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (count !== 8 || template !== 120 || gap !== 10) {
      setHasChanged(true);
    }
  }, [count, template, gap]);

  const resetValues = () => {
    setCount(8);
    settemplate(120);
    setgap(10);
    setshowoverlay(true);
    setHasChanged(false);
  };

  return (
    <>
      <group
        data-position="absolute"
        data-height="fit"
        data-justify="space-between"
        data-disabled="true"
        //   data-opacity="20"
        data-space="30"
        data-opacity="20"
        data-hide={isshowoverlay ? undefined : "true"}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <group
            key={index}
            data-length={gap}
            data-justify="space-between"
            data-height="fit"
            data-wrap="no"
            data-adaptive={index >= 5 ? "desktop" : undefined}
          >
            <group
              data-length="1"
              data-height="fit"
              data-background="red"
            ></group>

            <group
              data-length="1"
              data-height="fit"
              data-background="red"
            ></group>
          </group>
        ))}
      </group>

      <group data-gap="30" data-space="30" data-border="no" data-align="start">
        <TemplatePageHeader
          title="Layout & Switches"
          description="Concerns the arrangement and organization of elements in a design,
        often utilizing grids."
          version="2.0.0"
          type="Token"
          descriptionProps={{ "data-length": "300" }}
        />

        <StuckReporter>
          {(isSticky) => (
            <group
              data-sticky="top"
              //data-space-vertical="30"
              data-space-horizontal={isSticky ? gap : undefined}
              data-duration=".125"
              data-width="auto"
            >
              <group
                data-backdrop="20"
                data-contain=""
                data-radius="20"
                data-width="auto"
                data-top={isSticky ? "30" : undefined}
              >
                <group
                  data-align="center"
                  data-gap="15"
                  data-space="15"
                  data-wrap="no"
                >
                  <group
                    data-width="auto"
                    //data-min-length="80"
                    data-contain=""
                  >
                    <group data-space="10" data-width="auto">
                      <text data-ellipsis="">Guides</text>
                    </group>
                  </group>

                  <separator data-vertical=""></separator>

                  <group
                    data-fit="1"
                    data-gap="5"
                    data-wrap="no"
                    data-contain=""
                  >
                    <group
                      onClick={toggleoverlay}
                      data-align="center"
                      data-justify="center"
                      data-background="text"
                      data-color="main-background"
                      data-width="auto"
                      data-interactive=""
                      data-over-color="neutral"
                      data-radius="10"
                      data-cursor="pointer"
                      data-space-vertical="10"
                      data-space-horizontal="15"
                      data-contain=""
                    >
                      <text data-ellipsis="">
                        {isshowoverlay ? "Hide" : "Show"}
                      </text>
                    </group>

                    {hasChanged && (
                      <group
                        data-align="center"
                        data-justify="center"
                        data-width="auto"
                        data-interactive=""
                        data-over-color="neutral"
                        data-radius="10"
                        data-cursor="pointer"
                        data-space-vertical="10"
                        data-space-horizontal="15"
                        data-contain=""
                        data-animation-name="appear-bottom"
                        data-fill-mode="backwards"
                        data-animation-duration="1.25"
                        onClick={resetValues}
                      >
                        <text data-ellipsis="">Reset</text>
                      </group>
                    )}
                  </group>
                </group>
              </group>
            </group>
          )}
        </StuckReporter>

        <separator data-horizontal=""></separator>
        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-font-type="hero" data-text-size="large">
              Auto grid layout example
            </text>
          </group>
          <group data-gap="30" data-wrap="no">
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="400"
            >
              Adjust the item count and container template to see it in action.
              Some template values may be less noticeable on smaller viewports
              due to auto adjustment.
            </text>
          </group>
        </group>

        <group data-gap="15" data-type="grid" data-grid-template="300">
          <group
            data-border=""
            data-background="main-background"
            data-contain=""
            data-radius="15"
          >
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
                  <text>Grid Gap</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={5}
                  start={5}
                  end={20}
                  value={gap}
                  onValueChange={(value) => setgap(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
          </group>

          <group
            data-border=""
            data-background="main-background"
            data-contain=""
            data-radius="15"
          >
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
                  <text>Items</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={1}
                  start={1}
                  end={20}
                  value={count}
                  onValueChange={(value) => setCount(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
          </group>

          <group
            data-border=""
            data-background="main-background"
            data-contain=""
            data-radius="15"
          >
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
                  <text>Column Size</text>
                </group>
              </group>

              <separator data-vertical=""></separator>

              <group data-fit="1">
                <CustomSlider
                  handlerWidth={50}
                  step={20}
                  start={60}
                  end={300}
                  value={template}
                  onValueChange={(value) => settemplate(value)}
                  handlerProps={{
                    "data-background": "none",
                    "data-color": "text",
                    "data-border": "inset",
                    "data-radius": "10",
                    "data-height": "initial",
                    "data-space-vertical": "10",
                  }}
                  trackLeftProps={{ "data-margin": "0", "data-height": "1" }}
                  trackRightProps={{ "data-opacity": "10", "data-height": "1" }}
                />
              </group>
            </group>
          </group>
        </group>

        {/* 

    <group data-sticky="top"  data-justify="space-between" data-disabled="true" data-top="30" data-index="0">





{Array.from({ length: 7 }).map((_, index) => (
  <group key={index} data-length={gap} data-justify="space-between"  data-wrap="no">


<group data-background="main-background" data-space-vertical="10" data-text-align="center" data-justify="center" data-color="red" >
<group data-opacity="30" data-background="red" data-color="main-background" data-width="auto" data-max-length="auto" data-space="5">
<text >{gap}</text>
  </group>
</group>
</group>

      ))}


</group> */}

        <group
          data-radius="20"
          data-border=""
          data-contain=""
          data-space={gap}
          data-type="grid"
          data-grid-template={template}
          data-gap={gap}
        >
          {Array.from({ length: count }).map((_, index) => (
            <group
              key={index}
              data-radius={20 - gap}
              data-ratio="1:1"
              data-background="adaptive-gray"
              data-align="center"
              data-justify="center"
              data-animation-name="appear-top"
              data-animation-duration="1.25"
            >
              {/* <text > {index + 1 < 10 ? `0${index + 1}` : index + 1}</text> */}
            </group>
          ))}
        </group>

        <group data-gap={gap} data-wrap="no" data-direction="column-1200">
          <group
            data-height="400"
            data-direction="row"
            data-radius="20"
            data-border=""
            data-contain=""
            data-elevation="2"
            data-index="2"
          >
            <view data-direction="row">
              <group data-name="switch-gap" data-shrink="no"></group>
              <Switchable
                data-radius={20 - gap}
                data-adaptive-float={gap}
                defaultExpanded={false}
                data-type="overlap"
                icon={
                  <>
                    <SvgPlus />
                  </>
                }
                title={"Switchable To The Left"}
                data-index="3"
              >
                <>
                  <group
                    data-align="center"
                    data-justify="center"
                    data-position="center"
                    data-background="context"
                    data-height="fit"
                    data-direction="column"
                    data-gap="30"
                    data-space="30"
                    data-wrap="no"
                  >
                    <text
                      data-text-align="center"
                      data-wrap="wrap"
                      data-line="1.5"
                      data-length="200"
                    >
                      This section adapts and overlaps the next one if there's
                      not enough space to fit side by side.
                    </text>
                  </group>
                </>
              </Switchable>

              <group data-direction="column" data-align="start">
                <group data-scroll="" data-align="start" data-position="center">
                  <group
                    data-direction="column"
                    data-gap="30"
                    data-space="30"
                    data-align="center"
                    data-justify="center"
                    data-position="center"
                  >
                    <text
                      data-text-align="center"
                      data-wrap="wrap"
                      data-line="1.5"
                      data-max-length="200"
                    >
                      No extra manipulations are required to add or remove
                      layout sections.
                    </text>
                  </group>
                </group>
              </group>
              <Switchable
                data-float={gap}
                //   closeOnOutsideClick={true}
                data-radius={20 - gap}
                data-type="adaptive"
                data-placement="right"
                icon={
                  <>
                    <SvgHamburgerToRight />
                  </>
                }
                defaultExpanded={false}
                title={"Switchable To The Right"}
              >
                <view>
                  <view data-scroll="">
                    <group
                      data-direction="column"
                      data-gap="10"
                      data-space="20"
                      data-position="center"
                    >
                      <group
                        data-direction="column"
                        data-gap="30"
                        data-space="30"
                        data-align="center"
                        data-justify="center"
                      >
                        <text
                          data-text-align="center"
                          data-wrap="wrap"
                          data-line="1.5"
                          data-max-length="200"
                        >
                          No extra manipulations are required to add or remove
                          layout sections.
                        </text>
                      </group>
                    </group>
                  </view>

                  <Switchable
                    // data-adaptive-float="10"
                    data-radius={20 - 2 * gap}
                    defaultExpanded={false}
                    data-type="overlap"
                    // data-elevation="1"
                    data-switch-direction="horizontal"
                    data-direction="column"
                    icon={<Columns2 size={20} />}
                    togglerProps={
                      {
                        //    "data-background": "main",
                        //   "data-color": "main-text",
                        //   "data-ink-color": "main-dark",
                        //   "data-order": "2",
                      }
                    }
                    title={"Switchable To The Top"}
                  >
                    <group data-position="center">
                      <group
                        data-direction="column"
                        data-gap="30"
                        data-space="30"
                        data-align="center"
                        data-justify="center"
                      >
                        <text
                          data-text-align="center"
                          data-wrap="wrap"
                          data-line="1.5"
                          data-max-length="200"
                        >
                          No extra manipulations are required to add or remove
                          layout sections.
                        </text>
                      </group>
                    </group>
                  </Switchable>
                </view>
              </Switchable>
              <group data-name="switch-gap" data-shrink="no"></group>
            </view>
          </group>

          <group
            //  data-width="auto"
            data-height="400"
            data-contain=""
            //  data-gap="20"
            //   data-border="no"
            data-radius="20"
            data-border=""
          >
            <group
              data-height="fit"
              data-wrap="no"
              data-space={gap}
              data-gap={gap}
            >
              <Switchable
                data-radius={20 - gap}
                // data-adaptive-float="10"
                defaultExpanded={false}
                icon={<SvgPlus />}
                title={"Switchable To The Left"}
                //  data-type="overlap"
                //     data-length="400"
                closeOnOutsideClick={true}
                data-index="3"
                // togglerProps={{
                //   "data-background": "main",
                //   "data-color": "main-text",
                // }}
              >
                <>
                  <group
                    data-direction="column"
                    data-gap="30"
                    data-space="30"
                    data-align="center"
                    data-justify="center"
                    data-position="center"
                  >
                    <text
                      data-text-align="center"
                      data-wrap="wrap"
                      data-line="1.5"
                      data-length="200"
                    >
                      This is an adaptive switchable section that will overlap
                      the neighboring section if there is not enough room to
                      display them side by side.
                    </text>
                  </group>
                </>
              </Switchable>

              <Switchable
                data-border=""
                data-radius={20 - gap}
                defaultExpanded={false}
                icon={<SvgPlus />}
                title={"Adaptive Switchable To The Left"}
                // data-type="overlap"
                //   data-length="400"
                closeOnOutsideClick={true}
                data-index="3"
                // togglerProps={{
                //   "data-background": "main-dark",
                //   "data-color": "white",
                // }}
              >
                <>
                  <group
                    data-direction="column"
                    data-gap="30"
                    data-space="30"
                    data-align="center"
                    data-justify="center"
                    data-position="center"
                  >
                    <text
                      data-text-align="center"
                      data-wrap="wrap"
                      data-line="1.5"
                      data-length="200"
                    >
                      This is an adaptive switchable section that will overlap
                      the neighboring section if there is not enough room to
                      display them side by side.
                    </text>
                  </group>
                </>
              </Switchable>
            </group>
          </group>
        </group>

        <group data-gap="15" data-align="center" data-space="30">
          <group data-direction="column" data-gap="10">
            <text data-wrap="wrap" data-font-type="hero" data-text-size="large">
              Basic page layout example
            </text>
          </group>
          <group data-gap="30" data-wrap="no">
            <text
              data-wrap="wrap"
              data-light=""
              data-line="20"
              data-max-length="300"
            >
              A simple setup showcasing how blocks adapt to different scenarios,
              making the layout ready for various use cases.
            </text>
          </group>
        </group>

        <group
          data-height="400"
          data-radius="20"
          data-border=""
          data-contain=""
          data-space={gap}
          data-gap={gap}
          data-wrap="no"
          // data-elevation="2"
          data-index="3"
          data-direction="column"
          // data-background="adaptive-gray"
        >
          {/* <group
          data-height="60"
          data-radius={20 - gap}
          data-border=""
          data-contain=""
      //    data-background="context"
          data-shrink="no"
          data-align="center"
          data-justify="center"
        >
          <text data-opacity="60">Header</text>
        </group> */}

          <group data-gap={gap} data-height="fit" data-wrap="no">
            <group
              data-length="60"
              data-height="fit"
              data-radius={20 - gap}
              data-background="adaptive-gray"
              data-align="center"
              data-justify="center"
            >
              {/* <text data-orientation="vertical" data-opacity="60">
            Sidebar
          </text> */}
            </group>

            <group data-gap={gap} data-wrap="no" data-direction="column">
              <group
                data-gap={gap}
                data-wrap="no"
                data-height="fit"
                data-direction="column-1000"
              >
                <group
                  data-height="fit"
                  data-direction="column"
                  data-gap={gap}
                  data-wrap="no"
                >
                  {/* <group
              data-height="60"
              data-radius={20 - gap}
              data-shrink="no"
              data-border=""
              data-contain=""
              data-background="context"
            ></group> */}

                  <group
                    data-height="fit"
                    data-radius={20 - gap}
                    data-background="adaptive-gray"
                    data-contain=""
                  ></group>
                </group>

                <group
                  data-height="fit"
                  data-radius={20 - gap}
                  data-background="adaptive-gray"
                ></group>
              </group>

              <group
                data-height="60"
                data-radius={20 - gap}
                data-background="adaptive-gray"
                data-contain=""
                data-shrink="no"
                data-align="center"
                data-justify="center"
              >
                {/* <text data-opacity="60">Footer</text> */}
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
};
export default Layout;
