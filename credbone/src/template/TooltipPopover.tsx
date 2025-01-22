import React from "react";
import Ripple from "../components/Ripple";
import Popover from "../components/popover";

import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";

import Calculator from "../tools/Calculator";

import sampleImage from "../styles/images/samples/wide_res_74.jpg";
import sectionImage from "../styles/images/samples/wide_res_72.webp";
import TooltipPropsDemo from "./TooltipPropsDemo";

const SimplePopover = (
  <group
    data-direction="column"
    data-gap="10"
    data-length="200"
    data-space="10"
  >
    <text data-weight="700" data-text-size="large">
      Popover
    </text>
    <text data-wrap="wrap" data-line="1.5">
      The floating card pops up when clicking an element.
    </text>
  </group>
);

const ClosePopover = (
  <Popover
    data-elevation="2"
    placement="auto"
    data-length="200"
    data-space="30"
    data-radius="20"
    content={(closePopover) => (
      <group data-direction="column" data-gap="30">
        <group data-direction="column" data-gap="15">
          <text data-weight="700" data-text-size="large">
            Popover
          </text>
          <text data-line="1.5" data-wrap="wrap" data-max-length="300">
            Comparing with
            <Tooltip content="Sample Tooltip">
              <text data-weight="700"> Tooltip</text>
            </Tooltip>
            , besides information Popover card can also provide action elements
            like links and buttons.
          </text>
        </group>
        <separator data-horizontal=""></separator>

        <Ripple>
          <group
            data-wrap="no"
            data-ink-color="main-deep"
            data-align="center"
            data-cursor="pointer"
            data-contain=""
            data-background="main"
            data-color="main-text"
            data-interactive=""
            data-space="15"
            data-radius="10"
            // data-height="80"
            data-gap="20"
            onClick={closePopover}
            data-direction="column"
          >
            <text data-weight="700">Got It</text>
          </group>
        </Ripple>
      </group>
    )}
  >
    <group>
      <Ripple>
        <group
       
          data-wrap="no"
          data-ink-color="main-deep"
          data-align="center"
          data-cursor="pointer"
          data-contain=""
          data-background="main"
          data-color="main-text"
          data-interactive=""
          data-space="15"
          data-radius="10"
          // data-height="80"
          data-gap="20"
          data-justify="center"
        >
           <text data-weight="700">Show Popover</text>
        </group>
      </Ripple>
    </group>
  </Popover>
);

const SampleData = (
  <group
    data-length="600"
    data-height="auto"
    data-radius="10"
    data-border=""
    data-contain=""
  >
    <group>
      <picture
        data-contain=""
        data-brightness="adaptive"
        //  data-position="absolute"
        data-background="grey-light"
        data-height="160"
      >
        <img src={sampleImage} alt="" />
      </picture>
    </group>

    <group data-direction="column" data-space="30" data-gap="15">
      <text
        data-weight="700"
        data-text-size="large"
        data-wrap="wrap"
        data-color="main"
        data-ellipsis=""
      >
        Rich Content
      </text>
      <text data-wrap="wrap" data-length="280" data-line="1.5" data-light="">
        Tooltips display informative text when users hover over, focus on, or
        tap an element, while a popover is a floating card that appears when
        users click or hover over an element.
      </text>
    </group>

    <group
      //  data-background="main"
      data-contain=""
      // data-theme="dark"
      data-align="center"
    >
      <separator data-horizontal=""></separator>
      <group data-length="fit" data-space="30">
        {ClosePopover}
      </group>
    </group>
  </group>
);

const SampleTooltipData = (
  <group data-direction="column" data-gap="15">
    <text data-weight="700" data-text-size="xxx-large">
      <Count from={0} duration={1500} to={128} />
    </text>
    <text
      data-weight="700"
      data-text-size="large"
      data-wrap="wrap"
      data-ellipsis=""
    >
      Rich Contect
    </text>
    <text data-wrap="wrap" data-length="300" data-line="1.5" data-light="">
      Tooltips display informative text when users hover over, focus on, or tap
      an element.
    </text>
  </group>
);

const TooltipPopover: React.FC = () => {
  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group
        data-direction="column"
        data-gap="10"
        data-background="adaptive-gray"
        data-radius="20"
        data-justify="end"
        data-space="30"
      >
        <group data-height="100" data-adaptive="desktop"></group>
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          //  data-color="main"
          data-ellipsis=""
        >
          Tooltip & Popover
        </text>
        <text data-wrap="wrap" data-length="600" data-line="1.5">
          Tooltips display informative text when users hover over, focus on, or
          tap an element, while a popover is a floating card that appears when
          users click or hover over an element.
        </text>
      </group>

      <group>
        <picture
          data-radius="30"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
        >
          <img src={sectionImage} alt="" />
        </picture>

        <group data-space="30" data-width="auto">
          <group
            data-direction="column"
            data-radius="15"
            data-background="main-background"
            data-contain=""
            data-align="center"
            data-space="30"
            data-gap="20"
          >
            <group data-width="auto" data-position="left">
              {ClosePopover}
            </group>

            <group>
              <text data-wrap="wrap" data-line="1.5" data-max-length="400">
                Click to view a sample popover. The default placement is on top,
                but if there's not enough space, it will find a way to display
                itself.
              </text>
            </group>
          </group>
        </group>
      </group>

      <group
        data-gap="15"
        data-align="start"
        data-type="column"
        data-column-gap="15"
      >
        <group
          data-height="auto"
          data-radius="20"
          data-elevation="2"
          data-index="2"
          data-contain=""
          data-background="context"
        >
          <group data-space="20" data-gap="15" data-weight="600">
            <group>
              <Popover content={SimplePopover} data-width="auto">
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Simple Popover</text>
                </group>
              </Popover>
            </group>

            <separator data-horizontal=""></separator>

            <group>
              <Popover
                placement="right"
                data-radius="20"
                data-space="0"
                data-elevation="2"
                content={SampleData}
                data-length="300"
              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Rich Popover</text>
                </group>
              </Popover>
            </group>
            <separator data-horizontal=""></separator>

            <group
              data-gap="5"
              data-align="start"
              data-wrap="no"
              data-direction="column"
            >
              <Popover
                placement="right"
                content={<Calculator />}
                data-length="260"
                data-radius="20"
                data-elevation="2"
              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Mini App</text>
                </group>
              </Popover>

              <text
                data-space="15"
                data-max-length="300"
                data-wrap="wrap"
                data-opacity="40"
                data-line="1.5"
              >
                The popover content can be a separate fully functional
                component.
              </text>
            </group>
          </group>
        </group>

        <group
          data-height="auto"
          data-radius="20"
          data-border=""
          data-contain=""
          data-background="context"
        >
          <group data-space="20" data-gap="15" data-weight="600">
            <group>
              <Tooltip content="This is Simple Tooltip">
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Simple Tooltip</text>
                </group>
              </Tooltip>
            </group>

            <separator data-horizontal=""></separator>

            <group>
              <Tooltip
                // delay={0}
                placement="auto"
                data-radius="15"
                data-space="30"

               // data-elevation="2"
                content={SampleTooltipData}
                data-length="200"
              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Rich Tooltip</text>
                </group>
              </Tooltip>
            </group>
          </group>
        </group>
      </group>

<TooltipPropsDemo/>
    </group>
  );
};
export default TooltipPopover;
