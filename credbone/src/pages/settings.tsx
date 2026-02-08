import React from "react";
import ThemeToggle from "../components/themeToggle";

import RichThemePicker from "../template/richThemePicker";
import { useTheme } from "../components/ThemeProvider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

import { useFontSize } from "../components/FontSizeProvider";
import FontSizeControl from "../components/FontSizeControl";

function Settings() {
  const { resetFontSize } = useFontSize();

  const { resetTheme } = useTheme();

  const { addSnackbar } = useSnackbar();

  const handleReset = () => {
    resetFontSize();
    resetTheme();
    addSnackbar("Settings have been successfully reset", 3000, "reset", true);
  };

  return (
    <group
      data-space-vertical="adaptive-30-50"
      data-gap="30"
      data-direction="column"
      data-max-length="1200"
    >
      {/* <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="2.25"
      >
        <text
         data-weight="700" data-text-size="xxx-large" data-wrap="wrap"
        >
          Settings
        </text>
      </group> */}




      <group
      
       data-space-horizontal="adaptive-30-50"
  data-direction="column"

  data-gap="30"

      >


      <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="2.25"

         
      >
        <text
          data-font-type="hero"
          //    data-color="main"
          data-text-size="large"
        >
          Apperance
        </text>
        <text
          // data-light=""
          data-wrap="wrap"
          data-line="1.5"
          data-max-length="400"
        >
          Choose Dark Mode for low-light, Light Mode for bright environments, or
          Auto Mode to switch based on time or system settings.
        </text>
      </group>

      <group
       
        data-width="auto"
        data-weight="600"
        data-max-length="300"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="2"
      >
        <group data-space="5" data-radius="15" data-border="">
          <ThemeToggle />
        </group>
      </group>

      <separator data-horizontal="" data-interval="10"></separator>

      <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.75"
      >
        <text
          data-font-type="hero"
          //    data-color="main"
          data-text-size="large"
        >
          Theme
        </text>
        <text
          //  data-light=""
          data-wrap="wrap"
          data-line="1.5"
          data-max-length="400"
        >
          The UI will be defined by primary and secondary colors, with the
          secondary color being an auto-generated complementary shade.
        </text>
      </group>


      </group>

      <group
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.25"
      >
 <RichThemePicker pickerType="primary"            data-space-horizontal="adaptive-30-50"  data-radius="0" />
      </group>


      <group
      
      data-space-horizontal="adaptive-30-50"
  data-direction="column"

  data-gap="30"
      
      >

      <separator data-horizontal="" data-interval="10"></separator>

      <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.75"
      >
        <text
          data-font-type="hero"
          //    data-color="main"
          data-text-size="large"
        >
          Font size
        </text>
        <text
          //  data-light=""
          data-wrap="wrap"
          data-line="1.5"
          data-max-length="400"
        >
          Customize the font size across the app to enhance your reading
          experience.
        </text>
      </group>


            <group
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.25"
      >
      <FontSizeControl />
      </group>



      <separator data-horizontal="" data-interval="10"></separator>

      <group
        data-direction="column"
        data-gap="10"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.5"
      >
        <text data-font-type="hero" data-text-size="large" data-ellipsis="">
          Reset to Default Settings
        </text>

        <text data-wrap="wrap" data-line="1.5" data-max-length="400">
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
            data-radius="15"
            // data-border="outline"
            data-length="180"
            data-align="center"
            data-direction="column"
            data-background="highlight"
          >
            <text data-weight="700" data-ellipsis="">
              Reset
            </text>
          </group>
        </Ripple>
      </group>

      </group>



      <group data-height="200"></group>
    </group>
  );
}

export default Settings;
