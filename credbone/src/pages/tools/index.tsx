import React, { useEffect, useRef } from "react";
import { Link, Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import DotIconMaker from "./DotIconMaker";

import { links } from "./toolData";
import { ChevronLeft, Grip } from "lucide-react";
import Popover from "../../components/popover";
import BlobGenerator from "./BlobGenerator";
import PatternMaker from "./PatternMaker";
import StuckReporter from "../../components/StuckReporter";
import ColorMixer from "./ColorMixer";
import Ripple from "../../components/Ripple";
import ColorSpaceConverter from "./ColorSpaceConverter";

import PathBulder from "./PathBuilder/PathBulder";
import Marquee from "../../components/Marquee";
import AvatarMaker from "./avatars/AvatarMaker";

function ToolsCollection() {


    const location = useLocation();
    const viewRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (viewRef.current) {
        viewRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, [location]);


  return (
    <group
      data-wrap="no"
      data-direction="column"
      data-scroll=""
      data-index="1"
      data-space="adaptive-30-50"
      // data-gap="30"
      data-align="start"
      data-min-height="fit"
      data-space-top="0"
      ref={viewRef}
    >
      <group data-height="30" data-shrink="no" data-adaptive="desktop"></group>
      <group data-height="20" data-shrink="no" data-adaptive="600"></group>

      <StuckReporter>
        {(isSticky) => (
          <group data-sticky="top" data-width="auto" data-adaptive="desktop">
            <group
              data-top={isSticky ? "adaptive-30-50" : "0"}
              // data-left={isSticky ? "0" : ""}
              data-elevation="2"
              data-space="10"
              data-gap="10"
              data-radius="20"
              data-background="fg"
              data-width="auto"
              data-align="center"
              data-duration="2.25"
              data-transition-prop="position"
              data-wrap="no"
            >
              <Link
                data-type="group"
                data-space="15"
                data-radius="10"
                data-width="auto"
                //  data-background="adaptive-gray"
                data-interactive=""
                data-height="fit"
                data-align="center"
                to="./"
                data-wrap="no"
                data-contain=""
              >
                <group data-interact="" data-hidden={isSticky ? "true" : ""}>
                  <ChevronLeft size={20} />
                </group>
                <text
                  data-hidden={isSticky ? "" : "true"}
                  data-opacity={isSticky ? "0" : ""}
                  data-ellipsis=""
                >
                  Tools & Resources
                </text>
              </Link>
              <separator data-vertical=""></separator>
              <Popover
                data-radius="30"
                data-space="0"
                placement="bottom"
                data-contain=""
                data-elevation="2"
                content={(closePopover) => (
                  <group
                    onClick={closePopover}
                    data-type="grid"
                    data-grid-template="100"
                    data-gap="1"
                    data-length="360"
                    data-contain=""
                  >
                    {links.map((link, index) => (
                      <group key={index} data-border="">
                        <Ripple>
                          <group data-ink-color="neutral">
                            <NavLink
                              to={link.url}
                              data-type="group"
                              data-drag="none"
                            >
                              {({ isActive }) => (
                                <group
                                  data-space="10"
                                  data-interactive=""
                                  data-over-color="neutral"
                                  data-background={
                                    isActive ? "adaptive-gray" : ""
                                  }
                                >

                  {link.new === "true" && (
                    <group
                      data-background="red"
                      data-space="3"
                      data-position="absolute"
                      data-width="auto"
                      data-radius="5"
                      data-right="20"
                      data-top="20"
                    ></group>
                  )}

                                  <group
                                    data-contain=""
                                    data-space="15"
                                    data-width="auto"
                                    data-animation-name="appear-top"
                                    data-fill-mode="backwards"
                                    data-animation-duration={2 + index * 0.5}
                                    data-animation-timing="fancy"
                                    // data-name="nav-item"
                                    data-direction="column"
                                    data-gap="10"
                                  >
                                    <group data-ratio="1:1" data-interact="">
                                      {link.content}
                                    </group>
                                    <group data-pointer-event="none">
                                      <Marquee auto={isActive}>
                                        <text
                                          data-ellipsis=""
                                          data-opacity={isActive ? "" : "40"}
                                          data-text-align="center"
                                        >
                                          {link.title}
                                        </text>
                                      </Marquee>
                                    </group>
                                  </group>
                                </group>
                              )}
                            </NavLink>
                          </group>
                        </Ripple>
                      </group>
                    ))}
                  </group>
                )}
              >
                <group
                  data-interactive=""
                  data-cursor="pointer"
                  data-space="15"
                  data-radius="10"
                  data-width="auto"
                >
                  <group data-interact="">
                    <Grip size={20} />
                  </group>
                </group>
              </Popover>
            </group>
          </group>
        )}
      </StuckReporter>

      <group data-height="30" data-shrink="no"></group>
      <group data-max-length="1200">
        <Routes>
          <Route path="/*" element={<Navigate replace to="./" />} />
          <Route path="DotIconMaker" element={<DotIconMaker />} />
          <Route path="BlobGenerator" element={<BlobGenerator />} />
          <Route path="PatternMaker" element={<PatternMaker />} />
          <Route path="ColorMixer" element={<ColorMixer />} />
          <Route path="ColorSpaceConverter" element={<ColorSpaceConverter />} />
          <Route path="PathBuilder" element={<PathBulder />} />
          <Route path="AvatarMaker" element={<AvatarMaker />} />
        </Routes>
      </group>
      <group data-position="bottom" data-height="200" data-shrink="no"></group>
    </group>
  );
}

export default ToolsCollection;
