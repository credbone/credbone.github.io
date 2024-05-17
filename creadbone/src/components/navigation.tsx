import React from "react";
import { NavLink } from 'react-router-dom';
import Ripple from "./Ripple";
import ThemeToggle from "./themeToggle";







function Navigation() {
  return (

    <group data-space="15" data-gap="10" data-align="center" data-wrap="no">


      <NavLink data-type="group" to="/" data-width="auto"data-name="nav-item" data-radius="5"  data-contain="" 
      >
        <Ripple>
          <group  data-interactive=""  data-space="5">
            <icon data-length="30">home</icon>
          </group>
        </Ripple>
      </NavLink>

      <separator data-vertical=""></separator>

      <NavLink to="/about" data-width="auto" data-name="nav-item" data-radius="5"  data-contain="">
        <Ripple>
          <group data-align="center"  data-weight="600" data-height="40" data-interactive="" data-space-horizontal="10" >
            <text>About</text>
          </group>
        </Ripple>
      </NavLink>


<group  data-position="right" data-width="auto" data-weight="600">
  <ThemeToggle/>
</group>

    </group>

  );
}






export default Navigation;