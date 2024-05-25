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
        <label>
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
        </label>
        <label>
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
        </label>
        <Tooltip
          data-space="15"
          data-space-horizontal="20"
          data-radius="10"
          data-weight="600"
          data-max-length="300"
          content={
            <text  data-line="20" data-wrap="wrap">
              Enable Auto Theme Toggle to switch between light and dark modes
              based on your system settings.
            </text>
          }
        >
          <label data-fit="true">
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
          </label>
        </Tooltip>
      </div>
    </group>
  );
};

export default ThemeToggle;
