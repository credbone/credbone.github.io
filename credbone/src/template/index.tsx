import React, { useEffect, useRef, useState } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Colors from "./../template/Colors";
import Layout from "./../template/layout";

import Icons from "./../template/icons";
import "./../styles/demo.css";

import Buttons from "./buttons";
import Typeface from "./typeface";
import Landing from "./nav";

import CheckboxSwitchers from "./CheckboxSwitchers";
import InputsAndForms from "./InputsAndForms";

import TooltipPopover from "./TooltipPopover";
import Cards from "./Cards";
import Miscellaneous from "./Miscellaneous";
import { isDesktop } from "react-device-detect";

import Dashboard from "./Dashboard";
import Modal from "./Modal";
import VerticalSubNav from "../pages/navigation/verticalSubNav";

import StuckReporter from "../components/StuckReporter";
import Ripple from "../components/Ripple";
import QuickDemos from "./quickDemos";
import Overview from "./Overview";


const Template: React.FC = () => {
  const location = useLocation();
  const viewRef = useRef<HTMLDivElement>(null);

  const [isSubNavOpen, setIsNavOpen] = useState(true); // Lift the state up to the parent
  const toggleNav = () => setIsNavOpen((prev) => !prev); // Function to toggle
  const closeNav = () => setIsNavOpen(false);
  // const navRef = useRef<HTMLDivElement | null>(null);
  // const toggleBtnRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;

  //     if (
  //       navRef.current &&
  //       toggleBtnRef.current &&
  //       !navRef.current.contains(target) &&
  //       !toggleBtnRef.current.contains(target)
  //     ) {
  //       setIsNavOpen(false);
  //     }
  //   };

  //   if (isSubNavOpen) {
  //     document.addEventListener("click", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("click", handleOutsideClick);
  //   }

  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, [isSubNavOpen]);

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
      <view data-vertical="" data-border="none">
        {/* <group data-adaptive-order="2">
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
        </group> */}

<group data-width="auto" data-adaptive="desktop" data-wrap="no">
<VerticalSubNav
          isOpen={isSubNavOpen}
          onClose={closeNav}
          // navRef={navRef}
        />
        <group data-space-vertical="30" data-width="auto" ><separator data-vertical="" data-height="fit"></separator></group>
</group>

        <group data-scroll="" data-scrollbar-gutter="stable" data-align="start" ref={viewRef}>
          <group data-max-length="1200">
            <Routes>
            
              <Route path="/" element={<Navigate replace to="Overview" />} />
              <Route path="Overview" element={<Overview />} />
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
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Modal" element={<Modal />} />
              <Route path="QuickDemos" element={<QuickDemos/>} />

            </Routes>
          </group>

          {/* <StuckReporter>
            {(isSticky) => (
              <group
                data-print="hide"
                data-index="3"
                data-left="30"
                data-sticky="bottom"
                data-width="auto"
                data-space-bottom="30"
                data-adaptive="mobile"
              >
                <group data-width="auto">
                  <Ripple>
                    <group
                      onClick={toggleNav}
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
                      data-gap={isSticky ? "0" : "15"}
                    >
                      <group data-length={isSticky ? "60" : "20"}>
                        <icon data-position="center">left_panel_open</icon>
                      </group>

                      <separator
                        data-vertical=""
                        data-visibility={isSticky ? "hidden" : ""}
                      ></separator>

                      <text
                        data-weight="600"
                        data-duration=".225"
                        data-opacity={isSticky ? "0" : ""}
                        data-transition-prop="font-size"
                        data-text-size={isSticky ? "0" : ""}
                      >
                        Open Panel
                      </text>
                    </group>
                  </Ripple>
                </group>
              </group>
            )}
          </StuckReporter> */}

          <group data-height="120" data-adaptive="mobile"></group>
        </group>
      </view>
    </>
  );
};

export default Template;
