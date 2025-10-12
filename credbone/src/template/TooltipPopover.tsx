import React from "react";
import Ripple from "../components/Ripple";
import Popover from "../components/popover";

import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";

import Calculator from "../tools/Calculator";

import sampleImage from "../styles/images/samples/wide_res_68.webp";
import sectionImage from "../styles/images/samples/wide_res_72.webp";
import TooltipPropsDemo from "./TooltipPropsDemo";
import TemplatePageHeader from "./TemplatePageHeader";

const SimplePopover = (
  <group
    data-direction="column"
    data-gap="10"
    data-length="200"
    data-space="20"
  >
    <text data-weight="700" data-text-size="large">
      Popover
    </text>
    <text data-wrap="wrap" data-line="1.3">
     A floating card that appears on click and can flexibly display any content.
    </text>
  </group>
);


const SemiSimplePopover = ({ closePopover }: { closePopover: () => void }) => (
      <group data-direction="column" data-gap="20">
        <group data-direction="column" data-gap="15" data-space="20" data-space-bottom="10">
          <text         data-weight="700"
      
       
       
        data-ellipsis=""


                             data-font-type="hero"
                     data-text-size="large"
                      data-wrap="preline"
                      data-line="1">
                        Sample
                         {"\n"}
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
          //  data-ink-color="main"
            data-align="center"
            data-cursor="pointer"
            data-contain=""
           // data-background="main"
          //  data-color="main-text"
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
);

const ShowPopover = (
  <Popover
    data-elevation="2"
    placement="auto"
    data-length="200"
    data-space="15"
    data-radius="20"
    content={(closePopover) => (
<SemiSimplePopover closePopover={closePopover} />
    )}
  >
        <group
       
data-contain=""
              data-width="auto"
              data-interactive=""
             data-over-color="neutral"
              data-space="15"
              data-space-horizontal="25"
              data-radius="15"
              data-cursor="pointer"
              data-background="text"
              data-color="main-background"
        >
           <text data-weight="700">Show Popover</text>
        </group>
  </Popover>
);



const showinsidepopover = (
  <Popover
    data-elevation="2"
    placement="auto"
    data-length="200"
    data-space="15"
    data-radius="20"
    content={(closePopover) => (
<SemiSimplePopover closePopover={closePopover} />
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
          data-radius="15"
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

    data-height="auto"
    data-radius="10"
    data-border=""
    data-contain=""
  >
    <group data-space="10">
      <picture
     data-object-position="left"
        data-contain=""
        data-brightness="adaptive"
        //  data-position="absolute"
        data-background="grey-light"
        data-radius="20"
        data-height="160"
      >
        <img src={sampleImage} alt="" />  
      </picture>
    </group>

    <group data-direction="column" data-space="30" data-gap="15">
      <text
        data-weight="700"
      
       
        data-color="main"
        data-ellipsis=""


                             data-font-type="hero"
                     data-text-size="large"
                      data-wrap="preline"
                      data-line="1"
      >
        Rich
       {"\n"}
        Content
      </text>
      <text data-wrap="wrap"  data-line="1.5" data-opacity="60">
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
    
      <group data-length="fit" data-space="15">
        {showinsidepopover}
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



      <TemplatePageHeader
        title="Tooltip & Popover"
        description="Tooltips display informative text when users hover over, focus on, or
          tap an element, while a popover is a floating card that appears when
          users click or hover over an element."
        version="2.1.0"
        type="Component"
        descriptionProps={{"data-length":"600"}}
      />


      <group>
        <picture
        data-object-position="left"
          data-radius="40"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
        >
          <img src={sectionImage} alt="" />
        </picture>

        <group data-space="30" data-width="auto" data-direction="column" data-align="start" data-gap="30">
          <group
            data-direction="column"
            data-radius="15"
            data-background="main-background"
            data-contain=""
            data-align="center"
            data-space="30"
            data-gap="20"
          >


            <group>
              <text data-wrap="wrap" data-line="1.5" data-max-length="400">
                Click to view a sample popover. The default placement is on top,
                but if there's not enough space, it will find a way to display
                itself.
              </text>
            </group>
          </group>

                        {ShowPopover}
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
          data-radius="30"
          data-elevation="2"
          data-index="2"
          data-contain=""
          data-background="context"
        >
          <group data-space="20" data-gap="15" data-weight="600">
            <group>
              <Popover content={SimplePopover} data-width="auto" data-radius="20">
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
                data-radius="30"
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
          data-radius="30"
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
                data-radius="20"
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
