import React from "react";

import buildInfo from "../buildInfo.json";
import { Link } from "react-router-dom";

const links = [
  { name: "Resume", url: "/Resume" },
  { name: "Linkedin", url: "https://www.linkedin.com/in/sargsyanruben", target: "_blank", },
  { name: "Behance", url: "https://www.behance.net/sargsyan", target: "_blank", },
  { name: "Dribbble", url: "https://dribbble.com/sargsyan", target: "_blank" },
];

function About() {
  return (
    <view data-space="30" data-gap="30" data-scroll="" data-border="no">
      <group data-gap="30" data-direction="column">
        <group
          data-direction="column"
          data-gap="10"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration="1.25"
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
          data-animation-duration="1.5"
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
          data-animation-duration="1.75"
          data-direction="column"
          data-gap="10"
        >
          <group data-align="center" data-gap="10">
            <text>Build Date & Time</text>
            <separator data-vertical="" data-height="20"></separator>
            <text data-weight="700">{buildInfo.buildDateTime}</text>
          </group>
          <group data-align="center" data-gap="10">
            <text>Version</text>
            <separator data-vertical="" data-height="20"></separator>
            <text data-weight="700">{buildInfo.version}</text>
          </group>
        </group>
      </group>

      <group data-position="bottom" data-gap="30">
        <separator data-horizontal="" data-max-length="400"></separator>
        <group data-gap="15" data-align="center">
          {links.map((link, index) => (
            <Link
              data-type="link"
              data-width="auto"
              data-height="20"
              data-line="20"
              data-weight="600"
              data-animation-name="appear-bottom"
              data-fill-mode="backwards"
              data-animation-duration={2 + index * 0.25}
              to={link.url}
              target={link.target}
              key={index}
            >
              <text data-ellipsis="">{link.name}</text>
            </Link>
          ))}
        </group>
      </group>
    </view>
  );
}

export default About;
