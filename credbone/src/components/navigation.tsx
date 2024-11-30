import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Ripple from "./Ripple";
import Tooltip from "./tooltip";

import { useNavContext } from "../components/NavProvider";

import { IconBook, IconFold, IconHome, IconSearch, IconSettings } from "./icon/credIcons";
import { SvgHamburger } from "./svg";



const navItems = [
  { to: "/Home", icon: <IconHome size={20} />, label: "Home" },
  { to: "/Components", icon: <IconFold size={20}/>, label: "Components",vertical: "true", },
  { to: "/About", icon: <IconBook size={20}/>, label: "About", },

  { to: "/Settings", icon: <IconSettings size={20} />, label: "Settings" },
  { to: "/Search", icon: <IconSearch size={20} />, label: "Search" },
];

const Navigation: React.FC = () => {


  const { isNavOpen, setIsNavOpen } = useNavContext();


  const handleNavToggle = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents event from bubbling up
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>

<group data-gap="10" data-align="center">

<group   className={isNavOpen ? "open" : ""}   onClick={handleNavToggle} data-cursor="pointer"  data-width="auto" data-space="10" data-interactive="" data-radius="10" data-contain="" data-name="nav-item">
<group>
<icon data-length="30" >
<SvgHamburger />
</icon>
</group>
</group>

<separator data-vertical=""></separator>

  <NavLink data-type="group" data-width="auto" data-space="10" data-interactive="" data-radius="10" data-contain="" data-name="nav-item" to="/Home">
<group  data-length="30" data-height="30" data-align="center" data-justify="center">
<IconHome size={20} />
</group>
  </NavLink>


  <NavLink data-position="right" data-type="group" data-width="auto" data-space="10" data-interactive="" data-radius="10" data-contain="" data-name="nav-item" to="/Search">
<group  data-length="30" data-height="30" data-align="center" data-justify="center">
<IconSearch size={20} />
</group>
  </NavLink>


</group>
    


    </>
  );
};

const LeftNavigation: React.FC = () => {
  const context = useNavContext();

  if (!context) {
    throw new Error("LeftNavigation must be used within a NavProvider");
  }

  const { isNavOpen, setIsNavOpen } = context;

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

  const handleItemClick = () => {
    setIsNavOpen(false);
  };

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
          onClick={handleItemClick} // Close the nav on item click
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
                  <group data-length="30" data-height="30" data-align="center" data-justify="center">{item.icon}</group>
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
