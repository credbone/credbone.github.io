import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Ripple from "./Ripple";

const navItems = [
  { to: "/Home", icon: "space_dashboard", label: "Home" },
  { to: "/About", icon: "lightbulb", label: "About" },
  { to: "/Settings", icon: "tune", label: "Settings", vertical: "true" },
];

const Navigation: React.FC = () => {
  return (
    <>
      {navItems.map((item, index) => (
        <NavLink key={index} data-type="group" to={item.to} data-width="autofit" data-max-length="120" data-name="nav-item" data-select-theme="main" data-radius="10" data-contain="" data-interactive="" data-weight="600">
          <Ripple>
            <group data-direction="column" data-gap="5" data-align="center" data-space="10" >
              <icon data-length="30" data-height="auto">{item.icon}</icon>
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
    const updateIndicator = () => {
      const currentIndex = navItems.findIndex(item => location.pathname.startsWith(item.to));
      const activeItem = navRefs.current[currentIndex];
  
      if (activeItem) {
        const rect = activeItem.getBoundingClientRect();
        const parentRect = activeItem.parentElement?.getBoundingClientRect();
        const parentScrollTop = activeItem.parentElement?.scrollTop || 0;
  
        const top = (rect.top - (parentRect?.top || 0)) + parentScrollTop;
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
    window.addEventListener('resize', updateIndicator);
  
    const parentElement = navRefs.current[0]?.parentElement;
    let resizeObserver: ResizeObserver | null = null;
  
    if (parentElement) {
      resizeObserver = new ResizeObserver(() => updateIndicator());
      resizeObserver.observe(parentElement);
    }
  
    return () => {
      window.removeEventListener('resize', updateIndicator);
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
          ref={(el: HTMLAnchorElement | null) => navRefs.current[index] = el}
          data-type="group"
          data-width="auto"
          data-name="nav-item"
          data-radius="10"
          data-contain=""
          data-interactive=""
          // className={({ isActive }) => isActive ? 'active' : ''}
        >
          <Ripple>
            <group data-align="center" data-space="10" data-gap="10" data-wrap="no" data-adaptive-direction={item.vertical ? "column" : ""} >
              <icon data-length="30">{item.icon}</icon>
              <text data-adaptive={item.vertical ? "vertical-state" : "open-state"} data-ellipsis="" >{item.label}</text>
             
            </group>
          </Ripple>
        </NavLink>
      ))}
        
        <group
      //data-timing="fancy"
        data-name="vertical-indicator"
        data-position="absolute"
        data-background="main"
        style={{ transform: `translateY(${indicatorTop}px)`, height: `${indicatorHeight}px` }}
      ></group>


      

    </>
  );
};

export { Navigation, LeftNavigation };