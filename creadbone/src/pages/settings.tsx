import React from "react";
import ThemeToggle from "../components/themeToggle";

import RichThemePicker from "../template/richThemePicker";

function Settings() {
  return (
    <view data-space="30" data-scroll="">
      <group  data-gap="30" data-direction="column">


      <group data-direction="column" data-gap="10">
        <text data-weight="700" data-color="main" data-text-size="large">Apperance</text>
        <text data-light="" data-wrap="wrap" data-line="20" data-max-length="400"> Choose Dark Mode for low-light, Light Mode for bright environments, or Auto Mode to switch based on time or system settings.</text>
        </group>

      <group  data-width="auto" data-weight="600" data-max-length="300">
  <ThemeToggle/>
</group>

<separator data-horizontal="0"></separator>

<group data-direction="column" data-gap="10">
        <text data-weight="700" data-color="main" data-text-size="large">Theme</text>
        <text data-light="" data-wrap="wrap" data-line="20" data-max-length="400">Select Blue for calm, Green for natural, Red for vibrant, or Custom to personalize your colors.</text>
        </group>

        
      </group>


      <group data-max-length="1200">
      <RichThemePicker />
      </group>
    </view>
  );
}

export default Settings;