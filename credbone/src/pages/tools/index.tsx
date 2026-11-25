import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  matchPath,
  useLocation,
} from "react-router-dom";
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

  // Rail indicator: the same bar as in the main navigation
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  const selected = links.findIndex((link) =>
    matchPath({ path: link.url, end: false }, location.pathname),
  );

  // Tile box in the rail's content coordinates, so it stays correct at any scroll.
  // The tile is the item's last child (the separator comes first).
  const getSelectedBox = useCallback(() => {
    if (selected < 0) return null;
    const list = listRef.current;
    const item = list?.children[selected] as HTMLElement | undefined;
    const tile = item?.lastElementChild as HTMLElement | null | undefined;
    if (!list || !item || !tile) return null;

    return {
      top: list.offsetTop + item.offsetTop + tile.offsetTop,
      height: tile.offsetHeight,
    };
  }, [selected]);

  const updateIndicator = useCallback(() => {
    setIndicatorStyle(getSelectedBox() ?? { top: 0, height: 0 });
  }, [getSelectedBox]);

  // Follow the selection and any size change (viewport, font size)
  useEffect(() => {
    updateIndicator();

    const ro = new ResizeObserver(updateIndicator);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
  }, [updateIndicator]);

  // Scroll the selected tile into the center of the rail
  useEffect(() => {
    const rail = railRef.current;
    const box = getSelectedBox();
    if (!rail || !box) return;

    rail.scrollTo({
      top: box.top - (rail.clientHeight - box.height) / 2,
      behavior: "smooth",
    });
  }, [getSelectedBox]);

  return (
    <group
      data-wrap="no"
      //data-direction="column"
      //  data-scroll=""
      data-index="1"
      // data-gap="30"
      data-align="start"
      data-height="fit"
      data-space-top="0"
      
    >
      {/* <StuckReporter>
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
      </StuckReporter> */}

      <group
        data-width="auto"
        data-shrink="no"
        data-height="fit"
        data-wrap="no"
        data-adaptive="desktop"
      >
        <group
          ref={railRef}
          data-space="30"
          data-scroll=""
          data-scrollbar="none"
          data-align="start"
        >
          <group
            ref={listRef}
            data-length="100"
            data-direction="column"
            data-contain=""
            data-gap="5"
          >
            {links.map((link, index) => (
              <group
                key={index}
                data-name="autoseparation"
                data-selected={index === selected ? "true" : undefined}
                data-gap="5"
              >
                <separator data-horizontal=""  ></separator>
  
                  <group
                    data-ink-color="neutral"
                    data-contain=""
                   
                    
                  >
                    <NavLink to={link.url} data-type="group" data-drag="none">
                      {({ isActive }) => (
                        <group
                          data-space="10"
                          data-interactive=""
                          data-over-color="neutral"
                           data-radius="20"
                          data-background={isActive ? "main-alpha-15" : undefined}

                                                  data-animation-name="appear-left"
                            data-fill-mode="backwards"
                            data-animation-duration={2 + index * 0.5}
                             data-animation-timing="fancy"
                         
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
                            data-space="10"
                            data-width="auto"
     
                           
                            // data-name="nav-item"
                            data-direction="column"
                            data-gap="15"
                          >
                            <group data-position="center" data-space="5" data-width="auto" data-interact="">
                              {link.icon}
                            </group>
                            <group data-pointer-event="none" >

                                <text
                                  data-wrap="wrap"
                                  data-opacity={isActive ? "" : "40"}
                                  data-text-align="center"
                                >
                                  {link.title}
                                </text>

                            </group>
                          </group>
                        </group>
                      )}
                    </NavLink>
                  </group>
        
              </group>
            ))}
          </group>

          {/* Mounts once measured, so it doesn't slide in from the top on load */}
          {indicatorStyle.height > 0 && (
            <group
              data-pointer-event="none"
              data-name="vertical-indicator"
              data-position="absolute"
              data-background="main-color-font"
              style={{
                transform: `translateY(${indicatorStyle.top}px)`,
                height: `${indicatorStyle.height}px`,
              }}
            ></group>
          )}
        </group>

        <group data-space-vertical="30" data-width="auto">
          <separator data-vertical="" data-height="fit"></separator>
        </group>
      </group>

<group data-scroll="" data-height="fit" ref={viewRef} data-align="start">
      <group data-max-length="1200" data-space="adaptive-30-50" >
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
      </group>
    </group>
  );
}

export default ToolsCollection;
