import React, { useEffect, useRef } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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

import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";

import TooltipPopover from "./TooltipPopover";
import Cards from "./Cards";
import Miscellaneous from "./Miscellaneous";
import { isDesktop } from "react-device-detect";
import StuckReporter from "../components/StuckReporter";

const Template: React.FC = () => {
  const location = useLocation();
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTo({
        top: 0,
        behavior: isDesktop ? "smooth" : "auto",
      });
    }
  }, [location]);

  return (
    <>
      <view>
        <group data-adaptive-order="2">
          <group
            data-index="3"
            data-scroll-mask="false"
            data-elevation="1"
            data-background="main-background"
            data-contain=""
            data-shrink="no"
            data-snap-button="15"
          >
            <Scroll wheelEnabled={true}>
              <SubNavigation />
            </Scroll>
          </group>
        </group>
        <group data-scroll="" data-align="start" ref={viewRef}>
          <Routes>
            <Route path="/" element={<Navigate replace to="Typeface" />} />

            <Route path="Typeface" element={<Typeface />} />
            <Route path="Icons" element={<Icons />} />
            <Route path="Buttons" element={<Buttons />} />
            <Route path="CheckboxSwitchers" element={<CheckboxSwitchers />} />
            <Route path="Colors" element={<Colors />} />
            <Route path="Layout" element={<Layout />} />
            <Route path="Navigation" element={<Landing />} />
            <Route path="InputsAndForms" element={<InputsAndForms />} />
            <Route path="TooltipAndPopover" element={<TooltipPopover />} />
            <Route path="CardsAndList" element={<Cards />} />
            <Route path="Miscellaneous" element={<Miscellaneous />} />
          </Routes>
          <StuckReporter>
            {(isSticky) => (
              <group
                data-index="3"
                data-left="30"
                data-bottom="30"
                data-sticky="bottom"
                data-width="auto"
                data-space-bottom="30"
              >
                <Popover
                  content={
                    <group
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration="1.25"
                    >
                      <RichThemePicker />
                    </group>
                  }
                  data-space="5"
                  data-radius="10"
                  data-backdrop="10"
                  data-width="auto"
                >
                  <group data-width="auto">
                    <Ripple>
                      <group
                        data-contain=""
                        data-width="auto"
                        data-height={isSticky ? "60" : "50"}
                        data-radius={isSticky ? "30" : "10"}
                        data-background="context"
                        data-cursor="pointer"
                        data-shrink="no"
                        data-elevation={isSticky ? "6" : "1"}
                        data-interactive=""
                        data-align="center"
                        data-wrap="no"
                        data-space={isSticky ? "0" : "15"}
                        data-gap={isSticky ? "0" : "10"}
                      >
                        <group data-length={isSticky ? "60" : "20"}>
                          <icon data-position="center">opacity</icon>
                        </group>

                        <text
                          data-weight="600"
                          data-duration=".225"
                          data-opacity={isSticky ? "0" : ""}
                          data-transition-prop="font-size"
                          data-text-size={isSticky ? "0" : ""}
                        >
                          Change Theme
                        </text>
                      </group>
                    </Ripple>
                  </group>
                </Popover>
              </group>
            )}
          </StuckReporter>
          <group data-height="100"></group>
        </group>
      </view>
    </>
  );
};

export default Template;
