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

import Components from "./components";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";

import TooltipPopover from "./TooltipPopover";
import Cards from "./Cards";
import Miscellaneous from "./Miscellaneous";
import { isDesktop } from "react-device-detect";


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
          >
            <Scroll wheelEnabled={true}>
              <SubNavigation />
            </Scroll>
          </group>
        </group>
        <group data-scroll="" data-align="start" ref={viewRef}>
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
            <Route path="CardsAndList" element={<Cards />} />
            <Route path="Miscellaneous" element={<Miscellaneous />} />
          </Routes>
          <group
            //    data-position="absolute"
            data-index="3"
            data-space-horizontal="30"
            data-bottom="30"
            data-width="auto"
            data-direction="column"
            data-sticky="bottom"
            
          >
            <Popover
              //hideOnScroll={false}
              content={

                <group
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                //data-animation-delay="1.25"
                data-animation-duration="1.25"
                >
                  <RichThemePicker />
                </group>

              }
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
          <group data-height="100"></group>
        </group>
      </view>
    </>
  );
};

export default Template;
