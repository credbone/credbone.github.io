import Ripple from "../components/Ripple";
import { SvgHamburgerToLeft } from "../components/svg";
import React, { useState } from "react";
import { LeftNavigation } from "../components/navigation";


const VerticalNav: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <group
       
        data-placement="left"
        data-shrink="no"
        data-name="side_nav"
        data-background="main-background"
        data-expanded={isNavOpen ? "open" : "close"}
        data-width="auto"
        data-height="fit"
        data-elevation="1"
        data-index="2"
        data-align="start"
        data-wrap="no"
        data-direction="column"
        data-scroll=""
      data-scrollbar="none"
        {...props}
      >
        <group
          data-height="autofit"
          data-weight="600"
          data-space="15"
          data-direction="column"
          data-gap="5"
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
                <SvgHamburgerToLeft />
              </icon>
              <text data-ellipsis="" data-adaptive="open-state">
                Close
              </text>
            </group>
          </Ripple>
          <separator data-horizontal=""></separator>
          <LeftNavigation />

          <group data-position="bottom"></group>
          <separator data-horizontal=""></separator>
          <group
            data-contain=""
            data-space="10"
            data-gap="10"
            data-radius="10"
            data-align="center"
            data-wrap="no"
          >
            <icon data-length="30">info</icon>
            <text data-ellipsis="" data-adaptive="open-state">
              Version
            </text>
            <separator
              data-vertical=""
              data-height="20"
              data-adaptive="open-state"
            ></separator>
            <text data-adaptive="open-state" data-weight="700">
              3.0
            </text>
          </group>
        </group>
      </group>
      <group
        data-name="side_nav-space"
        data-length="80"
        data-adaptive="desktop"
      ></group>
    </>
  );
};

export default VerticalNav;
