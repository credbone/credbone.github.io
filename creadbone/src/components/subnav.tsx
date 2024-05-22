import React from "react";
import { NavLink } from 'react-router-dom';
import Ripple from "./Ripple";

const navItems = [
  { to: "Typeface", icon: "star", label: "Typeface" },
  { to: "Icons", icon: "star", label: "Icons" },
  { to: "Buttons", icon: "star", label: "Buttons" },
  { to: "Colors", icon: "star", label: "Colors" },
  { to: "Layout", icon: "star", label: "Layout" },
  { to: "Navigation", icon: "star", label: "Navigation" },
];

const SubNavigation: React.FC = () => {
  return (
    <>
    
    <group data-weight="600" data-gap="5" data-space="10" data-wrap="no">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          data-type="group"
          to={item.to}
          data-width="auto"
          data-name="nav-item"
          data-radius="5"
          data-contain=""
          data-shrink="no"
          data-interactive=""
        >
          <Ripple>
            <group data-wrap="no" data-align="center" data-space="10" data-gap="5">
              <text data-ellipsis="">{item.label}</text>
            </group>
          </Ripple>
        </NavLink>
      ))}
    </group>
    {/* <group data-name="indicator" data-position="absolute" data-background="main"></group> */}
      
    </>
  );
};

export default SubNavigation;
