import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Ripple from "./Ripple";


import {navItems} from "../pages/navigation/subroutesData" 



const SubNavigation: React.FC = () => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const updateIndicator = () => {
      const currentIndex = navItems.findIndex(item => location.pathname.endsWith(item.to));
      const activeItem = navRefs.current[currentIndex];
  
      if (activeItem) {
        const { left, width } = activeItem.getBoundingClientRect();
        const parentLeft = activeItem.parentElement?.getBoundingClientRect().left || 0;
        setIndicatorStyle({ left: left - parentLeft, width });
        
        // Scroll the active item into view
        window.requestAnimationFrame(() => {
          activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
      }
    };
    
    if (document.fonts.ready) {
      document.fonts.ready.then(updateIndicator);
    } else {
      updateIndicator();
    }



   
    // Optional: Recalculate on window resize to handle responsive layouts
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);


  }, [location.pathname]);

  return (
    <group >
      <group
        data-name="horizontal-indicator"
        data-width="auto"
        data-position="absolute"
        data-background="main"
        style={{ transform: `translateX(${indicatorStyle.left}px)`, width: `${indicatorStyle.width}px` }}
      />
      <group data-weight="600" data-wrap="no" data-space="10" data-gap="5" data-width="auto" data-max-length='auto'>
        {navItems.map((item, index) => (
          <NavLink
          data-touch-action="manipulation"
            key={index}
            data-type="group"
            to={item.to}
            ref={(el: HTMLAnchorElement | null) => navRefs.current[index] = el}
            data-width="auto"
            data-name="nav-item"
            data-contain=""
            data-shrink="no"
            data-interactive=""
            data-radius="5"
          >
            <Ripple>
              <group data-height="40" data-space="10" data-wrap="no" data-align="center" data-gap="5">
                <text data-ellipsis="">{item.label}</text>
              </group>
            </Ripple>
          </NavLink>
        ))}
      </group>
    </group>
  );
};

export default SubNavigation;
