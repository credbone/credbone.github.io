import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { colors, seccolors } from "../styles/colorData";
import Scroll from "../components/scroll";
import Tooltip from "../components/tooltip";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

const RichThemePicker: React.FC = () => {
  const { addSnackbar } = useSnackbar();
  const themeContext = useContext(ThemeContext);

  // Check if themeContext is undefined
  if (!themeContext) {
    return null; // or return a fallback UI
  }

  const { theme, setTheme } = themeContext;

  const handleColorSelection = (color: string, colorName: string, isPrimary: boolean) => {
    const newTheme = {
      colorPrimary: isPrimary ? color : theme.colorPrimary,
      colorSecondary: isPrimary ? theme.colorSecondary : color,
    };
    setTheme(newTheme);
    const colorType = isPrimary ? 'Primary' : 'Secondary';
    addSnackbar(`${colorType} color set to ${colorName}.`);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <group data-gap="5" data-width="auto" data-direction="column">
      <group data-scroll-mask="false" data-snap-button="15" data-width="auto">
        <Scroll>
          <group
            data-position="left"
            data-wrap="no"
            data-radius="5"
            data-width="auto"
          >
            {colors.map((c) => (
              <Tooltip
                content={
                  theme.colorPrimary === c.code ? (
                    ""
                  ) : (
                    <group data-direction="column">
                      <text data-weight="700">{c.name}</text>
                      <text>{c.description}</text>
                    </group>
                  )
                }
              >
                <group
                  data-shrink="no"
                  data-interactive=""
                  data-width="auto"
                  data-cursor="pointer"
                  className={theme.colorPrimary === c.code ? "selected" : ""}
                  data-color={theme.colorPrimary === c.code ? "main-text" : ""}
                  data-height="60"
                  data-wrap="no"
                  data-contain=""
                  data-name="theme-item"
                  onClick={() => handleColorSelection(c.code, c.name, true)}

                >
                  <group style={{ backgroundColor: c.code }} data-space="15">
                    <group
                      data-justify="end"
                      data-contain=""
                      data-duration=".125"
                      key={c.code}
                      data-direction="column"
                    >
                      <text data-ellipsis="" data-weight="700">
                        {c.name}
                      </text>
                      <text data-wrap="wrap" data-light="">
                        {c.description}
                      </text>
                    </group>
                  </group>
                </group>
              </Tooltip>
            ))}
          </group>
        </Scroll>
      </group>

      <group data-scroll-mask="false" data-snap-button="15" data-width="auto">
        <Scroll>
          <group
            data-position="left"
            data-wrap="no"

            data-radius="5"
            data-width="auto"

            data-align="start"
            data-grid-template="50"
          >
            {seccolors.map((c) => (
              <Tooltip
              content={
                theme.colorSecondary === c.code ? (
                  ""
                ) : (
                  <group data-direction="column">
                    <text data-weight="700">{c.name}</text>
                    <text>{c.description}</text>
                  </group>
                )
              }
              >
                <group
                  data-name="theme-item"
                  data-shrink="no"
                  data-interactive=""
                  data-width="auto"
                  data-cursor="pointer"
                  className={theme.colorSecondary === c.code ? "selected" : ""}
                  data-color={
                    theme.colorSecondary === c.code ? "secondary-text" : ""
                  }
                  data-height="60"
                  data-wrap="no"
                  data-contain=""
                  onClick={() => handleColorSelection(c.code, c.name, false)}
                >
                  <group
                    data-shrink="no"
                    style={{ backgroundColor: c.code }}
                    data-space="15"
                  >
                    <group
                      data-justify="end"
                      data-duration=".125"
                      //   data-text-size={theme.colorSecondary === c.code ? "" : "0"}
                      data-contain=""
                      key={c.code}
                      data-direction="column"
                    >
                      <text
                        data-ellipsis=""
                        data-weight="700"

                        // data-height="120"
                        // data-orientation="vertical-bottom"
                      >
                        {c.name}
                      </text>
                      <text
                        data-wrap="wrap"
                        data-light=""
                        // data-height="120"
                        // data-orientation="vertical-bottom"
                      >
                        {c.description}
                      </text>
                    </group>
                  </group>
                </group>
              </Tooltip>
            ))}
          </group>
        </Scroll>
      </group>
    </group>
  );
};

export default RichThemePicker;
