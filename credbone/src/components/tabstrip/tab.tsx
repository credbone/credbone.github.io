import React, { PropsWithChildren, ReactElement } from "react";

export interface TabProps {
  title?: string;
  icon?: string;
  primary?: boolean;
}

/**
 * Tab component for the TabStrip component
 * @param {string} props.title - (optional) the title of the tab
 * @param {string} props.icon - (optional) the icon of the tab
 * @param {boolean} props.primary - (optional) boolean indicating whether the tab should be considered primary
 * @param {React.ReactNode} children - the content of the tab
 */
const Tab: React.FC<PropsWithChildren<TabProps>> = ({
  children,
  title,
  icon,
  primary = false,
}) => {
  return React.cloneElement(children as ReactElement, { title, icon, primary });
};

export default Tab;
