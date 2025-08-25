import React from "react";
import ThemeToggle from "../components/themeToggle";

import RichThemePicker from "../template/richThemePicker";
import { useTheme } from "../components/ThemeProvider";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import { Link } from "react-router-dom";
import CustomSlider from "../components/inputs/slider";
import { useFontSize } from "../components/FontSizeProvider";

function Settings() {
  const { fontSize, setFontSize, resetFontSize } = useFontSize();

  const { resetTheme } = useTheme();

  const { addSnackbar } = useSnackbar();

  const handleReset = () => {
    resetFontSize();
    resetTheme();
    addSnackbar("Settings have been successfully reset", 3000, "reset", true);
  };

  return (
    <group
      data-space="adaptive-30-50"
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

      <group
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.75"
      >
        <group data-gap="5" data-direction="column">
          <RichThemePicker pickerType="primary" />
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
          Font size
        </text>
        <text
          //  data-light=""
          data-wrap="wrap"
          data-line="1.5"
          data-max-length="400"
        >
        Customize the font size across the app to enhance your reading experience.
        </text>
      </group>




      <group
     
     
        data-width="auto"
      //  data-weight="600"
        data-max-length="400"
        data-animation-name="appear-bottom"
        data-fill-mode="backwards"
        data-animation-duration="1.5"
      >
        <group  data-wrap="no" data-gap="30" data-align="center">


<group data-gap="20"  data-width="auto" data-wrap="no" data-align="center">
  <text  data-text-size="xx-large" data-weight="700" data-space-right="10">Aa</text>

</group>
<separator data-vertical="" ></separator>

<group 
//  data-background="adaptive-gray"
//   data-radius="15" 
//   data-space="5"
  
  >



<group data-justify="space-between" data-wrap="no" data-align="center" data-gap="10" data-height="30" data-position="absolute" data-left="0">
<group  data-length="5" data-height="2"></group>
<group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
<group data-background="adaptive-gray" data-height="2"></group>
<group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
<group data-background="adaptive-gray" data-height="2"></group>
<group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
<group  data-length="5" data-height="2"></group>

</group>


          <CustomSlider

         handlerWidth={30}
            start={13}
            end={15}
            step={1}
            showvalue={false}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}


            trackLeftProps={{ "data-opacity": "0" }}
            trackRightProps={{ "data-opacity": "0" }}
          />

</group>

        </group>
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
            data-radius="10"
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

      <group data-height="200"></group>
    </group>
  );
}

export default Settings;
