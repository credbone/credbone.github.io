import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";

import { democolors } from "../styles/colorData";
import { getComplementaryColor } from "../styles/skin";
import Ripple from "../components/Ripple";
import Tooltip from "../components/tooltip";

const ThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;

  const handleColorSelection = (color: string) => {
  //  const newTheme = getPalette(color); 
    
      const newTheme = {
            colorPrimary: color,
            colorSecondary: getComplementaryColor(color), // Automatically update secondary with complementary color
          };
    
    // Primary color will update and secondary will adjust automatically
    setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <group
      data-align="center"
      data-type="grid"
      data-grid-template-columns="5"
      data-radius="20"
      data-contain=""
    >
      {democolors.map((color, index) => (
        <Tooltip content={color.name} delay={500} key={color.code}>
          <group
            data-ratio="1:1"
            // data-interactive=""
            data-over-color="none"
            key={color.code}
            onClick={() => handleColorSelection(color.code)}
            data-animation-name="zoom-in"
            data-fill-mode="backwards"
            data-animation-duration={1 + index * 0.25}
            data-ink-color="dark-shade-10"
          >
            <Ripple>
              <group
                data-radius={theme.colorPrimary === color.code ? "40" : ""}
                data-margin={theme.colorPrimary === color.code ? "5" : ""}
                data-duration=".125"
                data-transition-prop="border-radius-margin"
                // data-interact=""
                data-over-color="neutral-10"
                data-cursor="pointer"
                data-direction="column"
                style={{ backgroundColor: color.code }}
                data-contain=""
              ></group>
            </Ripple>
          </group>
        </Tooltip>
      ))}
    </group>
  );
};

export default ThemePicker;
