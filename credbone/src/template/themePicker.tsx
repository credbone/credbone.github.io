import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";

import { democolors } from "../styles/colorData";
import { getPalette } from "../styles/skin";


const ThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;

  const handleColorSelection = (color: string) => {
    const newTheme = getPalette(color); // Primary color will update and secondary will adjust automatically
    setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <group data-align="center" data-type="grid"  data-grid-template-columns="5" data-radius="20" data-gap="3" data-contain="" >
    {democolors.map((color, index) => (
      <group
        data-ratio="1:1"
        data-interactive=""
        data-over-color="none"
        key={color.code}
        onClick={() => handleColorSelection(color.code)}
        data-animation-name="zoom-in"
        data-fill-mode="backwards"
        data-animation-duration={1 + index * 0.25}
      >
        <group
          data-radius={theme.colorPrimary === color.code ? "40" : ""}
          data-margin={theme.colorPrimary === color.code ? "5" : ""}
          data-duration=".125"
          data-transition-prop="border-radius-margin"
          data-interact=""
          data-over-color="neutral-10"
          data-cursor="pointer"
          data-direction="column"
          style={{ backgroundColor: color.code }}

        >



        </group>
      </group>
    ))}
  </group>
  );
};

export default ThemePicker;
