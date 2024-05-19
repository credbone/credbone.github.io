import React from "react";
import { NavLink } from 'react-router-dom';
import Ripple from "./Ripple";








function Navigation() {
  return (

    <group group data-type="grid" data-weight="600" data-grid-template="100" data-gap="5" data-space="10" data-adaptive-order="2" data-index="3" data-elevation="1" data-background="context" >




      <NavLink data-type="group" to="/" data-width="auto"data-name="nav-item" data-radius="10"  data-contain="" data-interactive="" >
        <Ripple>
          <group   data-direction="column" data-align="center" data-space="10" data-gap="5">
            <icon data-length="30">space_dashboard</icon>
            <text data-ellipsis="">Home</text> 
          </group>
        </Ripple>
      </NavLink>



      <NavLink data-type="group" to="/About" data-width="auto"data-name="nav-item" data-radius="10"  data-contain="" data-interactive="" >
        <Ripple>
          <group   data-direction="column" data-align="center" data-space="10" data-gap="5">
            <icon data-length="30">lightbulb</icon>
            <text data-ellipsis="">About</text> 
          </group>
        </Ripple>
      </NavLink>

      <NavLink data-type="group" to="/Settings" data-width="auto"data-name="nav-item" data-radius="10"  data-contain="" data-interactive="" >
        <Ripple>
          <group   data-direction="column" data-align="center" data-space="10" data-gap="5">
            <icon data-length="30">apps</icon>
            <text data-ellipsis="">Settings</text> 
          </group>
        </Ripple>
      </NavLink>



    </group>

  );
}






export default Navigation;