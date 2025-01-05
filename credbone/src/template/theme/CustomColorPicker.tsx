import React, { useState, useContext, useEffect } from "react";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import { ThemeContext } from "../../components/ThemeProvider";
import { HexColorPicker } from "react-colorful";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";

interface CustomColorPickerProps {
  target: "primary" | "secondary";
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ target }) => {
  const { addSnackbar } = useSnackbar();
  const themeContext = useContext(ThemeContext);

  const [customColor, setCustomColor] = useState("");

  useEffect(() => {
    if (themeContext) {
      setCustomColor(
        target === "primary"
          ? themeContext.theme.colorPrimary
          : themeContext.theme.colorSecondary
      );
    }
  }, [themeContext?.theme, target]);

  if (!themeContext) {
    return null;
  }

  const { theme, setTheme } = themeContext;

  const handleColorSelection = (color: string) => {
    const newTheme = {
      colorPrimary: target === "primary" ? color : theme.colorPrimary,
      colorSecondary: target === "secondary" ? color : theme.colorSecondary,
    };
    setTheme(newTheme);

    addSnackbar(
      <text>
        <text data-opacity="60">
          {target === "primary" ? "Primary" : "Secondary"} color set to
        </text>{" "}
        <text data-weight="700">{color}</text>
      </text>,
      3000,
      "theme-picker",
      true
    );

    localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  };

  return (
    <Popover
      data-space="5"
      data-radius="10"
      data-elevation="2"
      data-contain="visible"
    
      data-backdrop="10"
      content={(closePopover) => (
        <group
        
          data-direction="column"
          data-name="cred-react-colorful"
          data-width="auto"
            data-gap="5"
        >



          <HexColorPicker color={customColor} onChange={setCustomColor} />




<Ripple>
<group
            onClick={() => {
              handleColorSelection(customColor);
              closePopover();
            }}
           
            data-contain=""
            data-space="15"
            data-interactive=""
            data-cursor="pointer"
            data-radius="5"
            data-align="center"
            data-direction="column"
                data-over-color="neutral"
                data-ink-color="neutral"
           // data-background="highlight"
          >
            <text>
              Set as {target === "primary" ? "Primary" : "Secondary"}
            </text>
          </group>
</Ripple>
        </group>
      )}
    >
      <group
        data-width="auto"
        data-over-color="none"
        data-interactive=""
    
        data-cursor="pointer"
        data-align="center"
        data-wrap="no"
        data-gap="20"
      >
        <group
          data-interact=""
          data-length="30"
          data-height="60"
          data-radius="5"
          style={{ backgroundColor: customColor }}
        ></group>

        <group data-direction="column" data-width="auto">
          <text data-weight="600">
            Custom 
            {/* {target === "primary" ? "Primary" : "Secondary"} */}
          </text>
          <text data-opacity="30">Design your own</text>
        </group>
      </group>
    </Popover>
  );
};

export default CustomColorPicker;
