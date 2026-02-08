import Ripple from "../components/Ripple";
import { SvgHamburgerToLeft } from "../components/svg";
import React, { useState, useEffect } from "react";
import Tooltip from "../components/tooltip";
import { LeftNavigation } from "../components/navigation";
import buildInfo from "../buildInfo.json";
import ThemeToggle from "../components/themeToggle";
import Popover from "../components/popover";
//import ThemeIcon from "../components/ThemeIcon";

import ThemeIcon from "../components/ThemeIcon";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

import { useNavContext } from "../components/NavProvider";
import VerticalSubNav from "../pages/navigation/verticalSubNav";

import { Info } from "lucide-react";

const VerticalNav: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  const [isSubNavOpen, setSubNavOpen] = useState(false); // Lift the state up to the parent
  const toggleNav = () => setSubNavOpen((prev) => !prev); // Function to toggle
  const closeNav = () => setSubNavOpen(false);

  const { isNavOpen, setIsNavOpen, navRef, toggleRef  } = useNavContext();
  //const navRef = useRef<HTMLDivElement>(null);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const handleClickOutside = (event: MouseEvent) => {
    
  //   if (navRef.current && !navRef.current.contains(event.target as Node)) {
  //     setIsNavOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const { addSnackbar } = useSnackbar();

  const targetTapCount = 8; // Number of taps to trigger alert
  const timeout = 1000; // Timeout in milliseconds to reset tap count
  const [tapCount, setTapCount] = useState(0);
  const [showCounter, setShowCounter] = useState(false);

  // Reset tap count after the timeout
  useEffect(() => {
    if (tapCount > 0) {
      const timer = setTimeout(() => {
        setTapCount(0);
        setShowCounter(false); // Hide counter on reset
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [tapCount]);

  // Handle tap on the element
  const handleTap = () => {
    if (tapCount + 1 === targetTapCount) {
      if (isNavOpen) {
        handleNavToggle();
      }
      addSnackbar(
        <group data-align="center" data-gap="5">
          <text data-ellipsis="">Build Date & Time</text>

          <text data-ellipsis="" data-weight="700">
            {buildInfo.buildDateTime}
          </text>
        </group>,
        3000,
        "theme-picker",
        true
      );
      setTapCount(0);
      setShowCounter(false); // Hide counter after reaching the goal
    } else {
      setTapCount(tapCount + 1);
      setShowCounter(true); // Show counter on first tap
    }
  };

  return (
    <>
      <group
        data-position="absolute"
        data-background="dim"
        data-height="fit"
        data-index="2"
        data-visibility={isNavOpen ? "visible" : "hidden"}
        data-adaptive="mobile"
      ></group>
      <group
      
        ref={navRef}
        data-placement="left"
        data-shrink="no"
        data-name="side_nav"
        data-radius={isNavOpen ? "25-desktop" : "15-desktop"}
        data-float="30-desktop"
        data-margin-right="0"
        data-background="main-background"
        data-expanded={isNavOpen ? "open" : "close"}
        data-sub-expanded={isSubNavOpen ? "open" : "close"}
        //data-width="auto"
        //data-length={isNavOpen ? "300" : "70"}
        data-height="fit"
        //data-elevation={isNavOpen ? "2" : ""}
        data-border=""
        data-index="4"
        data-align="start"
        data-wrap="no"
        //data-direction="column"
        data-contain=""
        
       // data-transition-prop="border-radius"
        {...props}
      >
        <group
        
          // data-length={isSubNavOpen ? "70" : "fit"}
          data-name="side_nav-inner"
          data-height="fit"
          data-scroll=""
          data-scrollbar="none"
          data-direction="column"
          data-border=""
          data-index="2"
        >
          <group
         // data-delay={isNavOpen ? "2.25" : "0"}
             data-name="side_nav-wrapper"
            data-height="autofit"
            data-weight="600"
           // data-space={isNavOpen && !isSubNavOpen ? "20" : "10"}

            data-space="nav-space-10-20"
           // data-special-space={isSubNavOpen ? "10" : undefined}



            data-direction="column"
            data-gap="5"
            data-duration="2.25"
            
            data-transition-prop="padding"
          >
            <Tooltip content={isNavOpen ? "" : "Open"} placement="right">
              <group data-adaptive="desktop">
                <Ripple>
                  <group
                    className={isNavOpen ? "open" : ""}
                    data-name="side_nav_switch"
                    onClick={handleNavToggle}
                    data-contain=""
                    data-cursor="pointer"
                    data-interactive=""
                    data-space="10"
                    data-gap="10"
                    data-radius="10"
                    data-align="center"
                    data-wrap="no"
                  >
                    <icon data-length="30">
                      <SvgHamburgerToLeft />
                    </icon>
                    <text data-ellipsis="" data-adaptive="open-state">
                      Close
                    </text>
                  </group>
                </Ripple>
              </group>
            </Tooltip>
            <separator
              data-horizontal=""
              data-interval="nav-interval-5-15"

               data-duration="2.25"
            data-transition-prop="margin"

              data-adaptive="desktop"
            ></separator>
            <LeftNavigation isSubNavOpen={isSubNavOpen} onToggle={toggleNav} />






            <Popover
            
              data-width="auto"
              data-space="5"
              data-radius="15"
              content={isSubNavOpen && isNavOpen ? <group ref={toggleRef}> <ThemeToggle /></group> : ""}
            >

<group            data-position="bottom"       data-adaptive="mobile">
{isSubNavOpen ? 
                
               
                <group
             
                data-cursor="pointer"
                data-interactive="color"
              
                data-contain=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"

              >
                <ThemeIcon /> </group> : <ThemeToggle /> }
</group>


            </Popover>


            <Popover
            data-radius="15"
              data-width="auto"
              data-space="5"
              content={isNavOpen ? "" : <ThemeToggle />}
            >
              <group
              
                data-position="bottom"
              //  data-background="red"
                data-contain=""

                data-align="center"
                data-wrap="no"
                data-adaptive="desktop"
              >
                {isNavOpen ? <ThemeToggle /> : <group data-cursor="pointer" data-interactive="color" data-space="10" data-gap="10"  data-radius="10"><ThemeIcon /></group>}
                {/* {isSubNavOpen && isNavOpen ? <ThemeIcon /> : isNavOpen ? <ThemeToggle /> : <ThemeIcon />} */}
              </group>
            </Popover>


            <separator
              data-horizontal=""
                            data-interval="nav-interval-5-15"

               data-duration="2.25"
            data-transition-prop="margin"
        //      data-adaptive="desktop"
            ></separator>
            <Tooltip
              placement="right"
              content={
                isNavOpen ? null : (
<group data-align="center" data-gap="10" data-wrap="no">
                        <text data-ellipsis="">Version</text>
                        <separator
                          data-vertical=""
                          data-height="20"
                        ></separator>

                        <text data-weight="700">{buildInfo.version}</text>
                      </group>
                )
              }
            >
              <group
           //     data-adaptive="desktop"
                data-cursor="pointer"
                data-interactive=""
                data-contain=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"
                onClick={handleTap}
              >
                <group data-length="30" data-interact="" data-height="30" data-align="center" data-justify="center">
               <Info size={20}/>
                </group>
                <group
                  data-align="center"
                  data-adaptive="open-state"
                  data-gap="10"
                  data-wrap="no"
                >
                  <text data-ellipsis="">Version</text>
                  <separator data-vertical="" data-height="20"></separator>

                  <text data-weight="700">{buildInfo.version}</text>

                  {showCounter && (
                    <text
                      data-space-horizontal="10"
                      data-position="right"
                      data-animation-name="appear-bottom"
                      data-fill-mode="backwards"
                      data-animation-duration="2"
                    >
                      {targetTapCount - tapCount}
                    </text>
                  )}
                </group>
              </group>
            </Tooltip>




<group data-adaptive="mobile" data-duration="2.25" data-height={isSubNavOpen ? "100" : "90"}>

</group>


          </group>
        </group>

        <group
          data-width="auto"
          data-adaptive="mobile"
          data-height="fit"
          data-index="1"
          data-wrap="no"
          data-contain=""
        >
          <VerticalSubNav
            isOpen={isSubNavOpen}
            onClose={closeNav}
            // navRef={navRef}
          />

        </group>




      </group>

      <group
        data-name="side_nav-space"
        data-length="100"
        data-adaptive="desktop"
      ></group>
    </>
  );
};

export default VerticalNav;
