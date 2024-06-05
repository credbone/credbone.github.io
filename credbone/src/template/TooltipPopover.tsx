import React from "react";
import Ripple from "../components/Ripple";
import sampleImage from "../styles/images/samples/res_15.jpg";
import Popover from "../components/popover";
import Button from "../components/button";
import { Link } from "react-router-dom";
import Tooltip from "../components/tooltip";

const TooltipPopover: React.FC = () => {
  return (
    <view
      data-vertical=""
      data-adaptive=""
      data-space="30"
      data-gap="15"
      data-align="start"
    >
      <view
        data-size="medium"
        data-height="auto"
        data-max-height="fit"
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

          <group data-length="fit">
            <group data-space="40"></group>
            <Popover
              placement="right"
              data-width="auto"
              data-space="20"
              content={(closePopover) => (
                <group data-direction="column" data-gap="15">
                  <text data-weight="700" data-text-size="x-large">Popover Example</text>
                  <text data-line="1.5" data-wrap='wrap' data-max-length="300">
                    Comparing with <Tooltip content="Sample Tooltip"><text data-weight="700">Tooltip</text></Tooltip>, besides information Popover card can also provide action elements like <Tooltip content="Go to Home"><text><Link data-link="" data-weight="700" to="/">links</Link></text></Tooltip> and buttons.
                  </text>
                  <separator data-horizontal="" ></separator>
                  <Button onClick={closePopover} primary large text="Got It"></Button>
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
                data-radius-top-right="15"
                data-height="120"
                data-gap="20"
              >
                <icon data-index="1" data-icon-size="large">
                lightbulb
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
      </view>
    </view>
  );
};
export default TooltipPopover;
