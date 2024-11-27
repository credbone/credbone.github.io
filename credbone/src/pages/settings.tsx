import React from "react";
import ThemeToggle from "../components/themeToggle";

import RichThemePicker from "../template/richThemePicker";
import { useTheme } from "../components/ThemeProvider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

function Settings() {
  const { resetTheme } = useTheme();
  const { addSnackbar } = useSnackbar();

  const handleReset = () => {
    resetTheme();
    addSnackbar("Settings have been successfully reset",3000,'reset', true);
  };

  return (

      <group data-space="30" data-gap="30" data-direction="column">
        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="2.25"
        >
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-opacity="20"
          >
            Settings
          </text>
        </group>

        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="2"
        >
          <text data-weight="700" data-color="main" data-text-size="large">
            Apperance
          </text>
          <text
            data-light=""
            data-wrap="wrap"
            data-line="20"
            data-max-length="400"
          >
            Choose Dark Mode for low-light, Light Mode for bright environments,
            or Auto Mode to switch based on time or system settings.
          </text>
        </group>

        <group
          data-width="auto"
          data-weight="600"
          data-max-length="300"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.75"
        >
          <ThemeToggle />
        </group>

        <separator data-horizontal="" data-interval="10"></separator>

        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.5"
        >
          <text data-weight="700" data-color="main" data-text-size="large">
            Theme
          </text>
          <text
            data-light=""
            data-wrap="wrap"
            data-line="20"
            data-max-length="400"
          >
            Select Blue for calm, Green for natural, Red for vibrant, or Custom
            to personalize your colors.
          </text>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
        >
         <group data-gap="5" data-direction="column">
         <RichThemePicker />
         </group>
        </group>

        <separator data-horizontal="" data-interval="10"></separator>

        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
        >
          <text data-weight="700" data-color="main" data-text-size="large" data-ellipsis="">
            Reset to Default Settings
          </text>

          <text
            data-light=""
            data-wrap="wrap"

            data-line="20"
            data-max-length="400"
          >
            Once you reset the settings, your previous customizations cannot be
            restored unless you manually reconfigure them.
          </text>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
        >
          <Ripple>
            <group
              onClick={handleReset}
              data-contain=""
              data-space="15"

              data-interactive=""
             // data-width="auto"
              data-cursor="pointer"
              data-radius="10"
             // data-border="outline"
              data-length="180"
              data-align="center"
              data-direction="column"
              data-background="highlight"
            >
              <text data-weight="700" data-ellipsis="">Reset</text>
            </group>
          </Ripple>
        </group>

        <group data-height="200"></group>
      </group>

  );
}

export default Settings;
