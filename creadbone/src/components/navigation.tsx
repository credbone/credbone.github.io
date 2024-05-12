import React from "react";
import { Link, NavLink } from 'react-router-dom';





function Navigation() {
  return (

    <group data-space="10" data-gap="10" data-align="center">

      <NavLink  data-type="group" to="/" data-width="auto" 
      >
        <group data-interactive=""  data-space="5"  data-radius="5">
          <icon data-length="30">home</icon>
        </group>
      </NavLink>
      <separator data-vertical=""></separator>

      <NavLink to="/about" data-width="auto">
        <group data-interactive="" data-space="10" data-radius="5">
          <text>About</text>
        </group>
      </NavLink>
    </group>

  );
}






export default Navigation;