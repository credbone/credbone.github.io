import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Ripple from "./Ripple";
import Tooltip from "./tooltip";
import { NavContext } from "../template/verticalNav";
import { IconHome, IconSearch } from "./icon/credIcons";


const navItems = [
  { to: "/Home", icon: <IconHome size={20} />, label: "Home" },
  { to: "/About", icon: "lightbulb", label: "About" },
  { to: "/Settings", icon: "tune", label: "Settings", vertical: "true" },
  { to: "/Search", icon: <IconSearch size={20}/>, label: "Search"},
];



const Navigation: React.FC = () => {
  return (
    <>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          data-type="group"
          to={item.to}
          data-width="auto"
          //  data-max-length="120"
          data-name="nav-item"
          data-select-theme="main"
          data-radius="30"
          data-contain=""
          data-interactive=""
          data-weight="600"
          data-shrink="0"
          //  className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) => (
            <group
              data-justify="center"
              // data-direction="column"
              //  data-gap="5"
              data-align="center"
              data-space="10"
              data-height="45"
              data-space-horizontal="15"
              data-wrap="no"
              // {...(isActive ? { 'data-ink-color': 'main-dark', } : {})}
            >
              <icon data-length="30" data-height="auto">
                {item.icon }
              </icon>
              <text
                data-space-horizontal="5"
                data-ellipsis=""
                data-name="dinamic-text"
              >
                {item.label}
              </text>
              {/* {isActive ? (
                  ""
              ) : (
                ""
              )} */}
            </group>
          )}
        </NavLink>
      ))}
    </>
  );
};

const LeftNavigation: React.FC = () => {
  const context = useContext(NavContext);

  if (!context) {
    throw new Error("LeftNavigation must be used within a NavProvider");
  }

  const { isNavOpen } = context;

  const location = useLocation();
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const updateIndicator = () => {
      const currentIndex = navItems.findIndex((item) =>
        location.pathname.startsWith(item.to)
      );
      const activeItem = navRefs.current[currentIndex];

      if (activeItem) {
        const rect = activeItem.getBoundingClientRect();
        const parentRect = activeItem.parentElement?.getBoundingClientRect();
        const parentScrollTop = activeItem.parentElement?.scrollTop || 0;

        const top = rect.top - (parentRect?.top || 0) + parentScrollTop;
        const height = rect.height ?? 0;

        setIndicatorTop(top);
        setIndicatorHeight(height);
      }
    };

    if (document.fonts.ready) {
      document.fonts.ready.then(updateIndicator);
    } else {
      updateIndicator();
    }

    // Optional: Recalculate on window resize to handle responsive layouts
    window.addEventListener("resize", updateIndicator);

    const parentElement = navRefs.current[0]?.parentElement;
    let resizeObserver: ResizeObserver | null = null;

    if (parentElement) {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(parentElement);
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      if (resizeObserver && parentElement) {
        resizeObserver.unobserve(parentElement);
      }
    };
  }, [location.pathname]);

  return (
    <>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          ref={(el: HTMLAnchorElement | null) => (navRefs.current[index] = el)}
          data-type="group"
          data-width="auto"
          data-name="nav-item"
          data-radius="10"
          data-contain=""
          data-interactive=""
          // className={({ isActive }) => isActive ? 'active' : ''}
        >
          <Tooltip
            content={isNavOpen ? "" : item.vertical ? "" : item.label}
            placement="right"
          >
            <group>
              <Ripple>
                <group
                  data-align="center"
                  data-space="10"
                  data-gap="10"
                  data-wrap="no"
                  data-adaptive-direction={item.vertical ? "column" : ""}
                >
                  <icon data-length="30">{item.icon}</icon>
                  <text
                    data-adaptive={
                      item.vertical ? "vertical-state" : "open-state"
                    }
                    data-ellipsis=""
                  >
                    {item.label}
                  </text>
                  {item.vertical === "true" && (
                    <group data-width="auto"></group>
                  )}
                </group>
              </Ripple>
            </group>
          </Tooltip>
        </NavLink>
      ))}

      <group
        //data-timing="fancy"
        data-name="vertical-indicator"
        data-position="absolute"
        data-background="main"
        style={{
          transform: `translateY(${indicatorTop}px)`,
          height: `${indicatorHeight}px`,
        }}
      ></group>
    </>
  );
};

export { Navigation, LeftNavigation };
