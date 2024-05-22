import React from "react";
import { NavLink } from 'react-router-dom';
import Ripple from "./Ripple";


interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink data-type="group"  to={to} data-width="auto" data-name="nav-item" data-radius="5" data-contain="" data-interactive="">
      <Ripple>
        <group  data-wrap="no" data-align="center" data-space="10" data-gap="5">
         
          <text data-ellipsis="">{label}</text>
        </group>
      </Ripple>
    </NavLink>
  );
};

const SubNavigation: React.FC = () => {
  return (
    <group group  data-weight="600" data-grid-template="100" data-gap="5" data-space="10" data-adaptive-order="2" data-index="3" >
      <NavItem to="Typeface" icon="star" label="Typeface" />
      <NavItem to="Icons" icon="star" label="Icons" />
      <NavItem to="Buttons" icon="star" label="Buttons" />
      <NavItem to="Colors" icon="star" label="Colors" />
      <NavItem to="Layout" icon="star" label="Layout" />
      <NavItem to="Navigation" icon="star" label="Navigation" />
    </group>


    

  );
};

export default SubNavigation;
