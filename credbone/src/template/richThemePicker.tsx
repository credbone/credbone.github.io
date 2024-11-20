import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider";
import { colors, seccolors } from "../styles/colorData";
import Scroll from "../components/scroll";
import Tooltip from "../components/tooltip";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";


interface RichThemePickerProps {
  pickerType?: "primary" | "secondary";
}


const RichThemePicker: React.FC<RichThemePickerProps> = ({ pickerType }) => {
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
    addSnackbar(<text><text data-opacity="60">{colorType} color set to</text> <text data-weight="700">{colorName}</text></text>,3000,'theme-picker', true);
    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };


  const renderPrimaryPicker = () => {
    return (
      <group data-scroll-mask="false" data-snap-button="15" data-width="auto">
        <Scroll wheelEnabled={true}>
          <group
            data-position="left"
            data-wrap="no"
            data-radius="5"
            data-width="auto"
          >
            {colors.map((c, index) => (
              <Tooltip
                key={index}
                content={
                  theme.colorPrimary === c.code ? (
                    ""
                  ) : (
                    <group data-direction="column">
                      <text data-weight="700">{c.name}</text>
                      <text data-opacity="50">{c.description}</text>
                    </group>
                  )
                }
              >
                <group
                 data-group-end={c.separator ? "true":""}
                  key={index}
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
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration={2 + index * 0.25}
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
    );
  };

  const renderSecondaryPicker = () => {
    return (
      <group data-scroll-mask="false" data-snap-button="15" data-width="auto">
        <Scroll wheelEnabled={true}>
          <group
            data-position="left"
            data-wrap="no"
            data-radius="5"
            data-width="auto"
            data-align="start"
            data-grid-template="50"
          >
            {seccolors.map((c, index) => (
              <Tooltip
                key={index}
                content={
                  theme.colorSecondary === c.code ? (
                    ""
                  ) : (
                    <group data-direction="column">
                      <text data-weight="700">{c.name}</text>
                      <text data-opacity="50">{c.description}</text>
                    </group>
                  )
                }
              >
                <group
                  key={index}
                  data-name="theme-item"
                  data-group-end={c.separator ? "true":""}
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
                  data-animation-name="appear-bottom"
                  data-fill-mode="backwards"
                  data-animation-duration={2 + index * 0.25}
                >
                  <group
                    data-shrink="no"
                    style={{ backgroundColor: c.code }}
                    data-space="15"
                  >
                    <group
                      data-justify="end"
                      data-duration=".125"
                      data-contain=""
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
    );
  };

  return (
    < >
      {(pickerType === "primary" || !pickerType) && renderPrimaryPicker()}
      {(pickerType === "secondary" || !pickerType) && renderSecondaryPicker()}
    </>
  );
};





export default RichThemePicker;
