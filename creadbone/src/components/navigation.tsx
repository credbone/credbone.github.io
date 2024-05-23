import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Ripple from "./Ripple";

const navItems = [
  { to: "/Home", icon: "space_dashboard", label: "Home" },
  { to: "/About", icon: "lightbulb", label: "About" },
  { to: "/Settings", icon: "tune", label: "Settings" },
];

const Navigation: React.FC = () => {
  return (
    <>
      {navItems.map((item, index) => (
        <NavLink key={index} data-type="group" to={item.to} data-width="auto" data-name="nav-item" data-radius="10" data-contain="" data-interactive="" data-weight="600">
          <Ripple>
            <group data-direction="column" data-align="center" data-space="10" data-gap="5">
              <icon data-length="30">{item.icon}</icon>
              <text data-ellipsis="">{item.label}</text>
            </group>
          </Ripple>
        </NavLink>
      ))}
    </>
  );
};

const LeftNavigation: React.FC = () => {
  const location = useLocation();
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => location.pathname.startsWith(item.to));
    if (navRefs.current[currentIndex]) {
      const activeItem = navRefs.current[currentIndex];
      const top = activeItem?.offsetTop ?? 0;
      const height = activeItem?.offsetHeight ?? 0;
      setIndicatorTop(top);
      setIndicatorHeight(height);
    }
  }, [location.pathname]);

  return (
    <>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          ref={(el: HTMLAnchorElement | null) => navRefs.current[index] = el}
          data-type="group"
          data-width="auto"
          data-name="nav-item"
          data-radius="10"
          data-contain=""
          data-interactive=""
          //className={({ isActive }) => isActive ? 'active' : ''}
        >
          <Ripple>
            <group data-align="center" data-space="10" data-gap="10" data-wrap="no">
              <icon data-length="30">{item.icon}</icon>
              <text data-adaptive="open-state" data-ellipsis="">{item.label}</text>
            </group>
          </Ripple>
        </NavLink>
      ))}
      <group
            data-timing="fancy"
            data-duration=".325"
        data-name="vertical-indicator"
        data-position="absolute"
        data-background="main"
        style={{ top: `${indicatorTop}px`, height:`${indicatorHeight}px`, }}
      ></group>
    </>
  );
};

export { Navigation, LeftNavigation };

