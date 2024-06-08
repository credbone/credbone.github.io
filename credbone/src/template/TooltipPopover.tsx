import React from "react";
import Ripple from "../components/Ripple";
import sampleImage from "../styles/images/samples/res_18.jpg";
import Popover from "../components/popover";
import Button from "../components/button";
import Tooltip from "../components/tooltip";


import sampleImage2 from "../styles/images/samples/p_6.png";

const TooltipPopover: React.FC = () => {
  return (
    <view data-scroll="" data-space="30" data-gap="15" data-align="start">
      <group data-gap="15" data-align="start">


<group data-gap="15">

<group
          data-length="600"
          data-height="auto"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group data-direction="column" data-space="30">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
              Tooltip & Popover
            </text>
            <text
              data-wrap="wrap"
              data-length="300"
              data-line="1.5"
              data-light=""
            >
              Tooltips display informative text when users hover over, focus on,
              or tap an element, while a popover is a floating card that appears
              when users click or hover over an element.
            </text>
          </group>

          <group
            data-background="main-dark"
            data-contain=""
            // data-dark=""
            data-align="center"
          >
            <picture data-position="absolute" data-name="color-demo">
              <img src={sampleImage} alt="" />
            </picture>

            <group data-length="fit" data-space="30">
              <Popover
                data-elevation="2"
                placement="top"
                data-width="auto"
                data-space="20"
                content={(closePopover) => (
                  <group data-direction="column" data-gap="15">
                    <text data-weight="700" data-text-size="large">
                      Popover
                    </text>
                    <text
                      data-line="1.5"
                      data-wrap="wrap"
                      data-max-length="300"
                    >
                      Comparing with
                      <Tooltip content="Sample Tooltip">
                        <text data-weight="700"> Tooltip</text>
                      </Tooltip>
                      , besides information Popover card can also provide action
                      elements like links and buttons.
                    </text>
                    <separator data-horizontal=""></separator>
                    <Button
                      onClick={closePopover}
                      primary
                      large
                      text="Got It"
                    ></Button>
                  </group>
                )}
              >
                <group data-width="auto">
                  <Ripple>
                    <group
                      data-wrap="no"
                      data-ink-color="secondary"
                      data-align="center"
                      data-cursor="pointer"
                      data-contain=""
                      data-background="secondary"
                      data-color="secondary-text"
                      data-interactive=""
                      data-space-horizontal="30"
                      data-radius="15"
                      data-height="120"
                      data-gap="20"
                    >
                      <icon data-index="1" data-icon-size="large">
                        more_horiz
                      </icon>
                      {/* <text
                  data-ellipsis=""
                  data-weight="700"
                  data-text-size="36"
                  data-index="1"
                >
                  Button
                </text> */}
                    </group>
                  </Ripple>
                </group>
              </Popover>
            </group>
          </group>
        </group>


<group  

data-width="auto"
          data-height="auto"
          data-radius="10"
          data-elevation="1"
          data-contain=""
          data-direction="column"
          >
  
  
  <group data-space="20" data-border="" data-weight="700" data-background="context" >
<Popover content="Sample Popover" data-width="auto" >
<group data-interactive="" data-interact="popover" data-space="15" data-radius="10" data-cursor="pointer">
    <text decoration="" >Show Sample Popover</text>
    </group>
</Popover>
  </group>

  <group data-space="20" data-border="" data-weight="700" data-background="context" >
<Popover
placement="right"
data-radius="10"
data-space="0"
data-elevation="2"

content={

<group
          data-length="600"
          data-height="auto"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group data-direction="column" data-space="30">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
              Tooltip & Popover
            </text>
            <text
              data-wrap="wrap"
              data-length="300"
              data-line="1.5"
              data-light=""
            >
              Tooltips display informative text when users hover over, focus on,
              or tap an element, while a popover is a floating card that appears
              when users click or hover over an element.
            </text>
          </group>

          <group
            data-background="main-dark"
            data-contain=""
            // data-dark=""
            data-align="center"
          >
            <picture data-position="absolute" data-name="color-demo">
              <img src={sampleImage} alt="" />
            </picture>

            <group data-length="fit" data-space="30">
              <Popover
                data-elevation="2"
                placement="top"
                data-width="auto"
                data-space="20"
                content={(closePopover) => (
                  <group data-direction="column" data-gap="15">
                    <text data-weight="700" data-text-size="large">
                      Popover
                    </text>
                    <text
                      data-line="1.5"
                      data-wrap="wrap"
                      data-max-length="300"
                    >
                      Comparing with
                      <Tooltip content="Sample Tooltip">
                        <text data-weight="700"> Tooltip</text>
                      </Tooltip>
                      , besides information Popover card can also provide action
                      elements like links and buttons.
                    </text>
                    <separator data-horizontal=""></separator>
                    <Button
                      onClick={closePopover}
                      primary
                      large
                      text="Got It"
                    ></Button>
                  </group>
                )}
              >
                <group data-width="auto">
                  <Ripple>
                    <group
                      data-wrap="no"
                      data-ink-color="secondary"
                      data-align="center"
                      data-cursor="pointer"
                      data-contain=""
                      data-background="secondary"
                      data-color="secondary-text"
                      data-interactive=""
                      data-space-horizontal="30"
                      data-radius="15"
                      data-height="120"
                      data-gap="20"
                    >
                      <icon data-index="1" data-icon-size="large">
                        more_horiz
                      </icon>
                      {/* <text
                  data-ellipsis=""
                  data-weight="700"
                  data-text-size="36"
                  data-index="1"
                >
                  Button
                </text> */}
                    </group>
                  </Ripple>
                </group>
              </Popover>
            </group>
          </group>
        </group>
}

data-length="300" >
<group data-interactive="" data-interact="popover" data-space="15" data-radius="10" data-cursor="pointer">
    <text decoration="" >Show Rich Popover</text>
    </group>
</Popover>
  </group>


</group>

</group>

        {/* <group
          data-length="400"
          data-height="auto"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group data-space="30" data-gap="30">
            <Tooltip content="Plain Tooltip">
              <Button
                outline
                wide
                large
                text="Hover For Simple Tooltip"
              ></Button>
            </Tooltip>
            <separator data-horizontal=""></separator>
            <Tooltip
              content={
                <group data-direction="column" data-gap="10" data-space="5">
                  <text data-weight="700">Rich Tooltip</text>
                  <text data-wrap="wrap" data-max-length="200">
                    The tip is shown on mouse enter, and is hidden on mouse
                    leave
                  </text>
                </group>
              }
            >
              <Button outline wide large text="Hover For Rich Tooltip"></Button>
            </Tooltip>
          </group>
        </group> */}
      </group>
      <group data-height="200" data-width="auto" data-shrink="no"></group>
    </view>
  );
};
export default TooltipPopover;
