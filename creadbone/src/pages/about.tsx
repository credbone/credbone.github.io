import React from "react";

import buildInfo from "../buildInfo.json";

function About() {
  return (
    <view data-space="30" data-scroll="" data-border="no">
      <group data-gap="30" data-direction="column">
        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="125"
        >
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-opacity="20"
          >
            About
          </text>
        </group>

        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="15"
        >
          <text data-wrap="wrap" data-length="610" data-line="20" data-light="">
            Experimental App, featuring a curated collection of UI components
            and patterns as React components. Each element is crafted to enhance
            your applications with both beauty and functionality, ensuring
            seamless integration and easy customization.
          </text>
        </group>
        <group
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="175"
          data-direction="column"
          data-gap="10"
        >
          <group data-align="center" data-gap="10">
            <text>Version</text>
            <separator data-vertical="" data-height="20"></separator>
            <text data-weight="700">{buildInfo.version}</text>
          </group>
          <group data-align="center" data-gap="10">
            <text>Build Date & Time</text>
            <separator data-vertical="" data-height="20"></separator>
            <text data-weight="700">{buildInfo.buildDateTime}</text>
          </group>
        </group>
      </group>
    </view>
  );
}

export default About;
