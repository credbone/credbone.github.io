import Marquee from "../components/Marquee";
import Ripple from "../components/Ripple";
import { SvgHamburgerToRight } from "../components/svg";
import React, { useRef, useState } from "react";

import sampleImage from "../styles/images/samples/p_6.png";
import sampleImage2 from "../styles/images/samples/p_1.png";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <group
        data-shrink="no"
        data-name="side_nav"
        data-background="main-background"
        data-expanded={isNavOpen ? "open" : "close"}
        data-width="auto"
        data-height="fit"
       // data-max-length="300"
        data-elevation="1"
        data-index="2"
        data-align="start"
        data-wrap="no"
        data-direction="column"
        data-scroll=""
       
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
        >
          <picture data-position="absolute" data-type="interact">
            <img src={sampleImage} alt=""  />
          </picture>
          <group data-direction="column" data-gap="10" data-adaptive="open-state" data-max-length="300">
            <Marquee>
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-ellipsis=""
                data-space="30" 
              >
                Jane Rosemary Smith
              </text>
            </Marquee>
            {/* <text
              data-adaptive="open-state"
              data-wrap="wrap"
              data-length="300"
              data-line="1.5"
              data-light=""
            >
              Navigation bars allow movement between primary destinations in an
              app.
            </text> */}
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
                <SvgHamburgerToRight />
              </icon>
              <text data-ellipsis="" data-adaptive="open-state">
                Close
              </text>
            </group>
          </Ripple>
          <separator data-horizontal=""></separator>
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
          <separator data-horizontal=""></separator>
          {/* <group
            data-interactive=""
            data-space="10"
            
            data-gap="10"
            data-radius="10"
            data-align="center"
            data-wrap="no"
          >
            <icon data-length="30">logout</icon>
            <text data-ellipsis="" data-adaptive="open-state">
              Warranty
            </text>
          </group>
          <separator data-horizontal=""></separator> */}
          <group
            data-interactive=""
            data-space="10"
            
            data-gap="10"
            data-radius="10"
            data-align="center"
            data-wrap="no"
          >
            <icon data-length="30">shopping_basket</icon>
            <text data-light="" data-ellipsis="" data-adaptive="open-state">
              Cart
            </text>
            <dot data-adaptive="open-state"></dot>
            <group data-adaptive="open-state"  data-length="25" data-ratio="1:1" data-radius="20" data-color="white" data-justify="center" data-align="center" data-background="red"><text data-weight="700">3</text> </group> 
          </group>
          <group data-position="bottom"  ref={bottomRef}></group>

          <separator data-horizontal=""></separator>
          <Ripple>
          <group
              // data-space="10"
              data-space="open-state"
            data-gap="15"
            data-radius="open-state"
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
                      bottomRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 325); 
                }}
              
            >
              <picture data-position="absolute" >
                <img src={sampleImage2} alt="" />
              </picture>
            </group>

            <group data-width="auto" data-direction="column" data-adaptive="open-state" data-contain="">
            <text data-ellipsis=""  data-weight="700">
              Jane Smith
              </text>
              
              <text data-ellipsis=""  data-light="">
             Sample Organization
            </text>
</group>
          </group>
</Ripple>
        </group>
      </group>
      <group data-name="side_nav-space" data-length='80' >

      </group>
    </>
  );
};

export default SideNav;
