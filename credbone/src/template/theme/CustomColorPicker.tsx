import React, { useState, useContext, useEffect } from "react";
import { useSnackbar } from "../../components/snackbar/SnackbarContainer";
import { ThemeContext } from "../../components/ThemeProvider";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Popover from "../../components/popover";
import Ripple from "../../components/Ripple";
import { getComplementaryColor } from "../../styles/skin";

import { isMobile } from "react-device-detect";

interface CustomColorPickerProps {
  target: "primary" | "secondary";
}

// Function to check for unsupported colors
const isColorUnsupported = (color: string): boolean => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Define white range and black range thresholds
  if (r > 220 && g > 220 && b > 220) return true; // Too close to white
  if (r < 30 && g < 30 && b < 30) return true; // Too close to black

  return false; // Supported
};

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ target }) => {
  const { addSnackbar } = useSnackbar();
  const themeContext = useContext(ThemeContext);

  const [customColor, setCustomColor] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (themeContext) {
      setCustomColor(
        target === "primary"
          ? themeContext.theme.colorPrimary
          : themeContext.theme.colorSecondary
      );
    }
  }, [themeContext?.theme, target]);

  useEffect(() => {
    setIsDisabled(isColorUnsupported(customColor));
  }, [customColor]);

  if (!themeContext) {
    return null;
  }

  const { theme, setTheme } = themeContext;

  // const handleColorSelection = (color: string) => {
  //   const newTheme = {
  //     colorPrimary: target === "primary" ? color : theme.colorPrimary,
  //     colorSecondary: target === "secondary" ? color : theme.colorSecondary,
  //   };
  //   setTheme(newTheme);

  //   addSnackbar(
  //     <text>
  //       <text data-opacity="60">
  //         {target === "primary" ? "Primary" : "Secondary"} color set to
  //       </text>{" "}
  //       <text data-weight="700">{color}</text>
  //     </text>,
  //     3000,
  //     "theme-picker",
  //     true
  //   );

  //   localStorage.setItem("selectedColors", JSON.stringify(newTheme));
  // };

  const handleColorSelection = (color: string) => {
    let newTheme;

    if (target === "primary") {
      // If primary color is being changed, update primary and set complementary secondary color
      newTheme = {
        colorPrimary: color,
        colorSecondary: getComplementaryColor(color), // Automatically set complementary secondary color
      };
    } else {
      // If secondary color is being changed, update only secondary
      newTheme = {
        colorPrimary: theme.colorPrimary, // Keep the primary color unchanged
        colorSecondary: color,
      };
    }

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

  const copyHexClipboard = async () => {
    try {
      await navigator.clipboard.writeText(customColor);

      addSnackbar(
        <text>
          <text data-weight="700">{customColor.toUpperCase()}</text>{" "}
          <text data-opacity="60">Color copied</text>
        </text>,
        1000
      );
    } catch (err) {
      addSnackbar("Failed to copy", 1000);
    }
  };

  return (
    <Popover
      data-space="5"
      data-radius="15"
      data-elevation="2"
      data-contain="visible"
      content={(closePopover) => (
        <group
          data-direction="column"
          data-name="cred-react-colorful"
          data-width="auto"
          data-gap="5"
        >
          <HexColorPicker color={customColor} onChange={setCustomColor} />

          <group data-direction="column" data-align="center" data-gap="5">
            {!isMobile && (

<>

              <group
                
                data-wrap="no"
                data-radius="10"
                data-contain=""
                data-direction="column"
                data-interactive=""
                data-over-color="neutral"
                data-font-feature="tnum"
               data-width="auto"
               data-max-length="160"
                // data-length="80"
              >
                <HexColorInput
                data-length="content"
                  color={customColor}
                  onChange={setCustomColor}
                  data-name="input-reset"
                  data-space="15"
                  data-text-align="center"
                 
                  data-font-feature="tnum"
                  // data-background="adaptive-gray"
                  name="theme-color-hex"
                  data-weight="700"
                />

              
                {/* <Ripple>
                <group
                  data-contain=""
                  data-ink-color="neutral"

 data-space="15"
                  data-width="auto"
                  data-interactive=""
                  data-radius="5"
                  data-cursor="pointer"
                  onClick={copyHexClipboard}
                  data-over-color="neutral"
                  data-length="30"
                >
                  <group >
                   <text>Copy</text>
                  </group>
                </group>
              </Ripple> */}
              </group>


<group data-length="80">
    <separator data-horizontal=""></separator>
</group>

</>


            )}

            <Ripple>
              <group
                onClick={() => {
                  if (!isDisabled) {
                    handleColorSelection(customColor);
                    closePopover();
                  }
                }}
                data-space="15"
                data-interactive=""
                data-over-color="neutral"
                data-cursor={isDisabled ? "" : "pointer"}
                data-radius="10"
                data-align="center"
                data-direction="column"
                data-contain=""
                data-ink-color="neutral"
                data-disabled={isDisabled ? "true" : ""}
                 data-max-length="160"
              >
                <text>
                  {isDisabled
                    ? "Unsupported Color"
                    : `Set as ${
                        target === "primary" ? "Primary" : "Secondary"
                      }`}
                </text>
              </group>
            </Ripple>
          </group>
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
        data-gap="10"
        data-autofit="1-800"
      >
        <group
          data-interact=""
          data-length="30"
          data-height="60"
          data-radius="5"
          data-border="outline-soft"
          style={{ backgroundColor: customColor }}
        ></group>

        <group
          data-interact=""
          data-direction="column"
          data-react="background"
          data-over-color="neutral"
          data-space="15"
          data-radius="10"
        >
          <text data-weight="700">Custom</text>
          <text data-opacity="30">Design your own</text>
        </group>
      </group>
    </Popover>
  );
};

export default CustomColorPicker;
