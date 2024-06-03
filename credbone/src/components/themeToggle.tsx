import React from "react";
import { useTheme } from "../components/ThemeProvider";
import Tooltip from "./tooltip";

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setThemeMode(value);
  };

  return (
    <group>
      <div
        className="option_bar compact dynamic"
        data-length="autofit"
        data-height="40"
      >
        <label data-background="context">
          <input
            type="radio"
            name="theme-mode"
            value="light"
            checked={themeMode === "light"}
            onChange={handleModeChange}
          />
          <wrap>
            <icon data-length="30">light_mode</icon>
            <text>Light Mode</text>
          </wrap>
          <group data-name="option-decor"></group>
        </label >
        <label data-background="context">
          <input
            type="radio"
            name="theme-mode"
            value="dark"
            checked={themeMode === "dark"}
            onChange={handleModeChange}
          />
          <wrap>
            <icon data-length="30">dark_mode</icon>
            <text>Dark Mode</text>
          </wrap>
          <group data-name="option-decor"></group>
        </label>
        <Tooltip
          data-space="15"
          data-width=""
          data-length="300"
          content={
            <group data-gap="10">
              <text data-weight="700">Auto Mode</text>
              <text data-line="1.3" data-wrap="wrap">
                Enable Auto Theme Toggle to switch between light and dark modes
                based on your system settings.
              </text>
            </group>
          }
        >
          <label data-fit="true" data-background="context">
            <input
              type="radio"
              name="theme-mode"
              value="auto"
              checked={themeMode === "auto"}
              onChange={handleModeChange}
            />
            <wrap>
              <text>Auto Mode</text>
            </wrap>
            <group data-name="option-decor"></group>
          </label>
        </Tooltip>
      </div>
    </group>
  );
};

export default ThemeToggle;
