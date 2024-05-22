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
    <NavLink data-type="group" to={to} data-width="auto" data-name="nav-item" data-radius="10" data-contain="" data-interactive="">
      <Ripple>
        <group data-direction="column" data-align="center" data-space="10" data-gap="5">
          <icon data-length="30">{icon}</icon>
          <text data-ellipsis="">{label}</text>
        </group>
      </Ripple>
    </NavLink>
  );
};

const Navigation: React.FC = () => {
  return (
    <group group data-type="grid" data-weight="600" data-grid-template="100" data-gap="5" data-space="10" data-adaptive-order="2" data-index="3" data-border="overprint">
      <NavItem to="/Home" icon="space_dashboard" label="Home" />
      <NavItem to="/About" icon="lightbulb" label="About" />
      <NavItem to="/Settings" icon="apps" label="Settings" />
    </group>
  );
};

export default Navigation;
