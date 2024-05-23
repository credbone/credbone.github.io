import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Ripple from "./Ripple";

const navItems = [
  { to: "Typeface", icon: "star", label: "Typeface" },
  { to: "Icons", icon: "star", label: "Icons" },
  { to: "Buttons", icon: "star", label: "Buttons" },
  { to: "Colors", icon: "star", label: "Color System" },
  { to: "Layout", icon: "star", label: "Layout & Switches" },
  { to: "Navigation", icon: "star", label: "Navigation & Tabs" },
];

const SubNavigation: React.FC = () => {

  const location = useLocation();
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorLength, setIndicatorLength] = useState(0);
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => location.pathname.endsWith(item.to));
    if (navRefs.current[currentIndex]) {
      const activeItem = navRefs.current[currentIndex];


      const calculateLength = () => {

        const left = activeItem?.offsetLeft ?? 0;
        const length = activeItem?.offsetWidth ?? 0;
        setIndicatorLeft(left);
        setIndicatorLength(length);
      }

        // Check if fonts are loaded, then calculate the length
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            calculateLength();
          });
        } else {
          calculateLength();
        }



    }
  }, [location.pathname]);

  

  return (
    <group>
    
    <group data-weight="600"   data-wrap="no">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          data-type="group"
          to={item.to}
          ref={(el: HTMLAnchorElement | null) => navRefs.current[index] = el}
          data-width="auto"
          data-name="nav-item"
         
          data-contain=""
          data-shrink="no"
          data-interactive=""
        >
          <Ripple>
            <group data-height="50"  data-space="15" data-radius="5" data-wrap="no" data-align="center"  data-gap="5">
              <text data-ellipsis="">{item.label}</text>
            </group>
          </Ripple>
        </NavLink>
      ))}
    </group>
    <group data-name="horizontal-indicator" data-width="auto" data-position="absolute" data-background="main"
     style={{ left: `${indicatorLeft}px`, width:`${indicatorLength}px`, }}
    ></group>
      
    </group>
  );
};

export default SubNavigation;
