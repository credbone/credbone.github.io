import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { defaultPrimaryColor, defaultSecondaryColor } from "../styles/skin";
import Scroll from "../components/scroll";
import Button from "../components/button";
import { colors, seccolors } from "../styles/colorData";
import Tooltip from "../components/tooltip";

const ThemePicker: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;

  const handleColorSelection = (color: string, isPrimary: boolean) => {
    const newTheme = {
      colorPrimary: isPrimary ? color : theme.colorPrimary,
      colorSecondary: isPrimary ? theme.colorSecondary : color,
    };
    setTheme(newTheme);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <group
      //data-width="auto"
      data-snap-button="15"
      data-height="fit"
      data-contain=""
      data-direction="column"
      data-max-height="fit"
    >
      <Scroll vertical>
        <group
          data-wrap="no"
          data-align="center"
          data-direction="column"
          data-name="themes"
        >
          <text data-space="20" data-orientation="vertical">
            Theme Primary Color
          </text>
          {colors.map((c) => (
            <Tooltip
              content={
                <group data-direction="column">
                  <text data-weight="700">{c.name}</text>
                  <text>{c.description}</text>
                </group>
              }
              placement="right"
            >
              <Button
                key={c.code}
                mini
                rounded
                onClick={() => handleColorSelection(c.code, true)}
                data-background={
                  theme.colorPrimary === c.code ? "main-lighter" : ""
                }
              >
                <icon>
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" fill={c.code}></circle>
                  </svg>
                </icon>
              </Button>
            </Tooltip>
          ))}
          <text data-space="20" data-orientation="vertical">
            Secondary Color
          </text>
          {seccolors.map((c) => (
                        <Tooltip
                        content={
                          <group data-direction="column">
                            <text data-weight="700">{c.name}</text>
                            <text>{c.description}</text>
                          </group>
                        }
                        placement="right"
                      >
            <Button
            data-ink-color="secondary-light"
              key={c.code}
              mini
              rounded
              onClick={() => handleColorSelection(c.code, false)}
              data-background={
                theme.colorSecondary === c.code ? "secondary-lighter" : ""
              }
            >
              <icon>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill={c.code}></circle>
                </svg>
              </icon>
            </Button>
            </Tooltip>
          ))}
          <space data-height="10"></space>
        </group>
      </Scroll>
    </group>
  );
};

export default ThemePicker;
