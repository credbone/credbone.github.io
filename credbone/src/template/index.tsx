import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Colors from "./../template/Colors";
import Layout from "./../template/layout";

import Icons from "./../template/icons";
import "./../styles/demo.css";

import Buttons from "./buttons";
import Typeface from "./typeface";
import Landing from "./nav";
import Scroll from "../components/scroll";
import SubNavigation from "../components/subnav";
import CheckboxSwitchers from "./CheckboxSwitchers";
import InputsAndForms from "./InputsAndForms";

import Components from "./components";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";
import TooltipPopover from "./TooltipPopover";

const Template: React.FC = () => {
  return (
    <view data-scroll="" data-adaptive="" data-border="no">
      <group
        data-index="3"
        data-scroll-mask="false"
        data-elevation="1"
        data-background="main-background"
        data-contain=""
        data-shrink="no"
      >
        <Scroll>
          <SubNavigation />
        </Scroll>
      </group>

      <view data-vertical>
        <group
          data-position="absolute"
          data-index="3"
          data-margin="30"
          data-bottom="0"
          data-width="auto"
          data-direction="column"
        >
          <Popover
          hideOnScroll={false}
            content={<RichThemePicker />}
           // data-length="600"
            data-space="5"
            data-radius="10"
            data-backdrop="10"
           // data-elevation="2"
            data-width="auto"
          >
                <group>
                  <Ripple>
                    <group
                      data-contain=""
                      data-length="60"
                      data-height="60"
                      data-radius="30"
                      data-background="context"
                      data-cursor="pointer"
                      data-shrink="no"
                      data-elevation="6"
                      data-interactive=""
                    >
                      <icon data-position="center">opacity</icon>
                    </group>
                  </Ripple>
                </group>
          </Popover>
        </group>

        <view data-vertical>
          <Routes>
            <Route path="/" element={<Navigate replace to="Components" />} />
            <Route path="Components" element={<Components />} />
            <Route path="Typeface" element={<Typeface />} />
            <Route path="Icons" element={<Icons />} />
            <Route path="Buttons" element={<Buttons />} />
            <Route path="CheckboxSwitchers" element={<CheckboxSwitchers />} />
            <Route path="Colors" element={<Colors />} />
            <Route path="Layout" element={<Layout />} />
            <Route path="Navigation" element={<Landing />} />
            <Route path="InputsAndForms" element={<InputsAndForms />} />
            <Route path="TooltipAndPopover" element={<TooltipPopover />} />
          </Routes>
        </view>
      </view>
    </view>
  );
};

export default Template;
