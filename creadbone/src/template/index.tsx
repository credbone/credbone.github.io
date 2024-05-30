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
import Switchable from "../components/Switchable";
import ThemePicker from "./themePicker";

const Template: React.FC = () => {
  return (
    <view data-scroll="" data-adaptive="" data-border="no">
      <group
        data-index="3"
        data-scroll-mask="false"
        data-elevation="1"
        data-background="main-background"
      >
        <Scroll>
          <SubNavigation />
        </Scroll>
      </group>



<view data-vertical>
<Switchable
        data-collapse-radius="30"
        data-float="20"
        closeOnOutsideClick={true}
          data-switch-size="60"
          defaultExpanded={false}
          icon="opacity"
          data-type="overlap"
          data-length="60"
          data-timing="fancy"
          data-duration=".225"
          togglerProps={{
            "data-adaptive": "mobile",
            "data-order": "2",
            "data-justify": "center",
          }}
        >
          <view
            data-border=""
            data-background="main-background"
            data-length="60"
          >
            <group
              data-width="auto"
              data-snap-button="15"
              data-height="fit"
              data-contain=""
            >
              <Scroll vertical>
                <ThemePicker />
              </Scroll>
            </group>
          </view>
        </Switchable>


      <view data-vertical>
        <Routes>
          <Route path="/" element={<Navigate replace to="Colors" />} />
          <Route path="Typeface" element={<Typeface />} />
          <Route path="Icons" element={<Icons />} />
          <Route path="Buttons" element={<Buttons />} />
          <Route path="CheckboxSwitchers" element={<CheckboxSwitchers />} />
          <Route path="Colors" element={<Colors />} />
          <Route path="Layout" element={<Layout />} />
          <Route path="Navigation" element={<Landing />} />
          <Route path="InputsAndForms" element={<InputsAndForms />} />
        </Routes>
      </view>
</view>

    </view>
  );
};

export default Template;
