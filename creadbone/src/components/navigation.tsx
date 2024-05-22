import React from "react";
import { NavLink } from 'react-router-dom';
import Ripple from "./Ripple";

const Navigation: React.FC = () => {
  const navItems = [
    { to: "/Home", icon: "space_dashboard", label: "Home" },
    { to: "/About", icon: "lightbulb", label: "About" },
    { to: "/Settings", icon: "apps", label: "Settings" },

  ];

  return (
    <>
      {navItems.map((item, index) => (
        <NavLink key={index} data-type="group" to={item.to} data-width="auto" data-name="nav-item" data-radius="10" data-contain="" data-interactive="">
          <Ripple>
            <group data-direction="column" data-align="center" data-space="10" data-gap="5">
              <icon data-length="30">{item.icon}</icon>
              <text data-ellipsis="">{item.label}</text>
            </group>
          </Ripple>
        </NavLink>
      ))}
    </>
  );
};

export default Navigation;
