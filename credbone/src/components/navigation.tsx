import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Ripple from "./Ripple";
import Tooltip from "./tooltip";

import { useNavContext } from "../components/NavProvider";


import { SvgHamburger, SvgPlus } from "./svg";
import { Bolt, BookOpen, Box, House, PencilRuler, Search } from "lucide-react";
import { useCurrentHeader } from "./TitleUpdater";


const navItems = [
  { to: "", icon: <House size={20}/> , label: "Home",type:"link"  },
  { to: "/Components", icon: <Box size={20}/>, label: "Components",vertical: "true", adaptive:"desktop",type:"link" },
  { to: "/Components/Typography", icon: <Box size={20}/>, label: "Components",adaptive:"mobile",  type:"toggle" },
  { to:"/Components", type:"separator"},
  { to: "/Tools", icon: <PencilRuler size={20}/> , label: "Tools",type:"link"  },
  { to: "/About", icon: <BookOpen size={20}/>, label: "About",type:"link" },

  { to: "/Settings", icon: <Bolt size={20} />, label: "Settings",type:"link" },
  { to: "/Search", icon: <Search size={20} />, label: "Search",type:"link" },
];

const Navigation: React.FC = () => {


  const { isNavOpen, setIsNavOpen, buttonRef } = useNavContext();


  const handleNavToggle = () => {
   // event.stopPropagation(); // Prevents event from bubbling up
    setIsNavOpen(!isNavOpen);
  };
  const header = useCurrentHeader();
  return (
    <>

<group data-gap="10" data-align="center"       data-wrap="no">

<group  ref={buttonRef}  className={isNavOpen ? "open" : ""}   onClick={handleNavToggle} data-cursor="pointer"  data-width="auto" data-space="10" data-interactive="" data-radius="30" data-contain="" data-name="nav-item">
<group>
<icon data-length="30"  >
<SvgHamburger />
</icon>
</group>
</group>

<separator data-vertical=""></separator>

  <NavLink data-type="group"  data-width="auto" data-space="10" data-align="center" data-interactive="" data-radius="30" data-contain=""  to="/">
<group  data-interact="" data-length="30" data-height="30" data-align="center" data-justify="center">
<House size={20} />
</group>
{/* <text data-name="dinamic-text" data-weight="600" data-space-horizontal="5">Home</text> */}
  </NavLink>


  {header && 
  

  <>
  
  <separator data-vertical=""></separator>

<group  data-width="auto" data-space="10" data-align="center" data-contain="">
<text data-opacity="40" data-ellipsis="">
{header}
</text>
</group>

  </>
  
  
  } {/* Only render if header is available */}



  <NavLink  data-position="right" data-align="center" data-type="group" data-width="auto" data-space="10" data-interactive="" data-radius="30" data-contain="" data-name="nav-item" to="/Search">
  {/* <text data-name="dinamic-text" data-weight="600" data-space-horizontal="5">Search</text> */}
<group data-interact="" data-length="30" data-height="30" data-align="center" data-justify="center">
<Search size={20} />
</group>
  </NavLink>


</group>
    


    </>
  );
};

const LeftNavigation: React.FC<{ isSubNavOpen: boolean; onToggle: () => void }> = ({ isSubNavOpen, onToggle }) => {
 


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
      const currentIndex = navItems.findIndex((item) => {
        // If `item.to` is missing, treat it as "Home" and check for empty path or "/"
        if (!item.to) {
          return location.pathname === "/" || location.pathname === "";
        }
        return location.pathname.startsWith(item.to);
      });
    
      if (currentIndex === -1) {
        // No matching item found; exit early
        return;
      }
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

      {navItems.map((item, index) =>
      
      item.type === "toggle" ? (
        // Custom markup for "adaptive: mobile"
        <group
        
         key={index}
       
         data-background={isSubNavOpen ? "main":""}
         data-color={isSubNavOpen ? "main-text":""}
          data-width="auto"
          data-name="nav-item"
          data-radius="10"
          data-contain=""
          data-interactive=""
          data-adaptive={item.adaptive}
          onClick={onToggle}
          data-cursor="pointer"
         
          
          
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
                  <group data-length="30" data-interact="" data-height="30" data-align="center" data-justify="center">{item.icon}</group>
                  <text
                    data-adaptive={
                      item.vertical ? "vertical-state" : "open-state"
                    }
                    data-ellipsis=""
                  >
                    {item.label}
                  </text>
                  <group data-width="auto" data-position="right" >
                  <icon data-length="30"><SvgPlus/></icon>
                  </group>
                  {item.vertical === "true" && (
                    <group data-width="auto"></group>
                  )}
                </group>
              </Ripple>
            </group>
        </group>
      )

      :

      item.type === "separator" ? (

        <group
        
         key={index}

          >
<separator data-interval="5" data-horizontal=""></separator>
        </group>
      )
      
      :

      (
        <NavLink
        aria-label={item.label}
          key={index}
          to={item.to}
          data-adaptive={item.adaptive}
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
          <Tooltip content={isNavOpen ? "" : item.vertical ? "" : item.label} placement="right" >
            <group>
              <Ripple>
                <group
                  data-align="center"
                  data-space="10"
                  data-gap="10"
                  data-wrap="no"
                  data-adaptive-direction={item.vertical ? "column" : ""}
                >
                  <group data-interact="" data-length="30" data-height="30" data-align="center" data-justify="center">{item.icon}</group>
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
