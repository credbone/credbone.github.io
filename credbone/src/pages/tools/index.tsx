import React from "react";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
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

function ToolsCollection() {
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
              data-background="context"
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
                data-radius="25"
                data-space="10"
                placement="bottom"
                data-elevation="2"
                content={(closePopover) => (
                  <group
                    onClick={closePopover}
                    data-type="grid"
                    data-grid-template="90"
                    data-gap="10"
                    data-length="400"
                  >
                    {links.map((link, index) => (
                      <group key={index}>
                        <Ripple>
                          <NavLink
                            data-contain=""
                            data-type="group"
                            data-space="15"
                            data-radius="15"
                            data-width="auto"
                            data-interactive=""
                            // data-background="adaptive-gray"

                            to={link.url}
                            data-name="nav-item"
                            data-direction="column"
                            data-gap="10"
                          >
                            <group data-ratio="1:1" data-interact="">
                              {link.content}
                            </group>
                            <text data-wrap="wrap" data-text-align="center">
                              {link.title}
                            </text>
                          </NavLink>
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
        </Routes>
      </group>
      <group data-position="bottom" data-height="200" data-shrink="no"></group>
    </group>
  );
}

export default ToolsCollection;
