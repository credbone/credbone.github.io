import React, { useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import RegularNavItems from "./RegularNavItems";
import SideNav from "./sideNav";
import StuckReporter from "../../components/StuckReporter";



const Landing: React.FC = () => {


  return (
    <>
      <group data-height="30"></group>
<group data-direction="column" data-space-horizontal="30" data-gap="10">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-ellipsis=""
              data-color="main"
            >
              Navigation
            </text>

            <text
              data-wrap="wrap"
              data-length="300"
              data-line="1.5"
              data-opacity="60"
            >
              Navigation bars allow movement between primary destinations in an
              app.
            </text>
          </group>

      <group data-height="10"></group>

      <StuckReporter>
        {(isSticky) => (
          <group
           data-direction="column"
            data-space-horizontal={isSticky ? "":"30"}
            data-duration=".125"
             data-sticky="top"
             data-background="main-background"
             >
                    <group data-height="20"></group>
            <group data-space-horizontal="20">
              <NavLink data-type="group" data-drag="none" data-width="auto" data-name="tab" data-interactive="" data-space-vertical="15" data-space-horizontal="20" to="./BarsAndTiles" > <text data-weight="600">Bars & Tiles</text> </NavLink>
              <NavLink data-type="group" data-drag="none" data-width="auto" data-name="tab" data-interactive="" data-space-vertical="15" data-space-horizontal="20" to="./SideBar" > <text data-weight="600">SideBar</text> </NavLink>
            </group> 

            <group data-background="main" data-height="2"></group>
          </group>
        )}
      </StuckReporter>



      <group data-align="start">
        <group
          data-space="30"
          data-gap="30"
          data-direction="column"
          data-shrink="0"
          data-contain=""
          data-wrap="no"
          data-fit="1"
          data-align="start"
        >


          <group>
            <Routes>
              <Route
                path="/"
                element={<Navigate replace to="BarsAndTiles" />}
              />

              <Route path="BarsAndTiles" element={<RegularNavItems />} />
              <Route path="SideBar" element={<SideNav />} />
            </Routes>
          </group>
        </group>
      </group>
    </>
  );
};
export default Landing;
