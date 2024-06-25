import Marquee from "../components/Marquee";
import Ripple from "../components/Ripple";
import { SvgHamburgerToRight } from "../components/svg";
import React, { useEffect, useRef, useState } from "react";

import sampleImage from "../styles/images/samples/p_6.png";
import sampleImage2 from "../styles/images/samples/p_1.png";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const bottomRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <group
       
        ref={navRef}
        data-placement="right"
         data-float={isNavOpen ? "15" : "20"}
         data-radius="10"
        //   data-length={isNavOpen ? "500" : "80"}
        data-shrink="no"
        data-name="side_nav"
        data-background="context"
        data-expanded={isNavOpen ? "open" : "close"}
        //  data-width="auto"
        data-height={isNavOpen ? "fit" : ""}
        // data-max-length="300"
        data-elevation="2"
        data-index="999"
        data-align="start"
        data-wrap="no"
        data-direction="column"
        data-scrollbar="none"
        data-scroll=""
     
        data-position="absolute"

      >

        <group
          // data-adaptive="open-state"
          data-background="main"
          data-color="white"
          data-ratio="1:1"
          data-align="end"
          data-contain=""
          data-shrink="no"
          data-cursor="pointer"
          data-interactive=""
          onClick={handleNavToggle}
          data-adaptive={isNavOpen ? "" : "600"}
        >



          <picture data-position="absolute" data-type="interact">
            <img src={sampleImage} alt="" />
          </picture>
          <group
            data-direction="column"
            data-gap="10"
            data-adaptive="open-state"
            data-max-length="300"
          >
            <Marquee auto={isNavOpen ? true : false}>
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-ellipsis=""
                data-space="30"
              >
                Jane Rosemary Smith
              </text>
            </Marquee>

          </group>
        </group>

        <group
          data-height="autofit"
          data-weight="600"
          data-space="15"
          data-direction="column"
        >
          <Ripple>
            <group
            data-touch-action="manipulation"
              className={isNavOpen ? "open" : ""}
              data-name="side_nav_switch"
              onClick={handleNavToggle}
              data-contain=""
              data-cursor="pointer"
              data-interactive=""
              data-space="10"
              data-gap="10"
              data-radius={isNavOpen ? "10" : "5"}
              data-align="center"
              data-wrap="no"
            >
              <icon data-length="30">
                <SvgHamburgerToRight />
              </icon>
              <text data-ellipsis="" data-adaptive="open-state">
                Close
              </text>
            </group>
          </Ripple>
          <group
            data-direction="column"
            data-align="start"
            data-fit="1"
            data-gap="5"
          >
            <separator data-horizontal="" data-interval="10"></separator>
            <Ripple>
              <group
                data-contain=""
                data-cursor="pointer"
                data-interactive=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"
              >
                <icon data-length="30">chair</icon>
                <text data-ellipsis="" data-adaptive="open-state">
                  Home
                </text>
              </group>
            </Ripple>
            <Ripple>
              <group
                data-contain=""
                data-cursor="pointer"
                data-interactive=""
                data-space="10"
                data-gap="10"
                data-radius="10"
                data-align="center"
                data-wrap="no"
              >
                <icon data-length="30">apps</icon>
                <text data-ellipsis="" data-adaptive="open-state">
                  Collections
                </text>
              </group>
            </Ripple>
            <separator data-horizontal="" data-interval="10"></separator>
            <group
              data-interactive=""
              data-space="10"
              data-gap="10"
              data-radius="10"
              data-align="center"
              data-wrap="no"
              data-cursor="pointer"
            >
              <icon data-adaptive="open-state" data-length="30">
                shopping_basket
              </icon>
              <text data-light="" data-ellipsis="" data-adaptive="open-state">
                Cart
              </text>
              <dot data-adaptive="open-state"></dot>
              <group data-length="30" data-height="30" data-direction="column">
                <group
                  data-position="center"
                  data-length="25"
                  data-ratio="1:1"
                  data-radius="20"
                  data-color="white"
                  data-justify="center"
                  data-align="center"
                  data-background="red"
                >
                  <text data-weight="700">3</text>
                </group>
              </group>
            </group>
            <group data-position="bottom" ref={bottomRef}>
            <group ></group>

<separator data-horizontal="" data-interval="10"></separator>
</group>
            <Ripple>
              <group
                // data-space="10"
                data-space={isNavOpen ? "10" : ""}
                data-gap="15"
                data-radius={isNavOpen ? "10" : "30"}
                data-align="center"
                data-interactive=""
                data-cursor="pointer"
                data-wrap="no"
                data-contain=""
              >
                <group
                  data-type="interact"
                  data-width="auto"
                  data-ratio="1:1"
                  data-background="main"
                  data-height="50"
                  data-radius="30"
                  data-contain=""
                  onClick={() => {
                    handleNavToggle();
                    setTimeout(() => {
                      //    console.log("Timeout reached, scrolling...");
                      if (bottomRef.current) {
                        bottomRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }, 325);
                  }}
                >
                  <picture data-position="absolute">
                    <img src={sampleImage2} alt="" />
                  </picture>
                </group>

                <group
                  data-width="auto"
                  data-direction="column"
                  data-adaptive="open-state"
                  data-contain=""
                >
                  <text data-ellipsis="" data-weight="700">
                    Jane Smith
                  </text>

                  <text data-ellipsis="" data-light="">
                    Sample Organization
                  </text>
                </group>
              </group>
            </Ripple>
          </group>
        </group>
      </group>
      
    </>
  );
};

export default SideNav;
