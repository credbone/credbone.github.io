import React from "react";

import buildInfo from "../buildInfo.json";
import { Link } from "react-router-dom";

const links = [
  { name: "Resume", url: "/Resume" },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/sargsyanruben",
    target: "_blank",
  },
  {
    name: "Behance",
    url: "https://www.behance.net/sargsyan",
    target: "_blank",
  },
  { name: "Dribbble", url: "https://dribbble.com/sargsyan", target: "_blank" },
];

const handleReload = () => {
  window.location.reload(); // Reloads the entire page
};

function About() {
  return (
    <>
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
          //data-gap="10"
          data-align="start"
           data-width="auto"
        >

<group
            data-wrap="no"
            data-align="center"
            data-gap="10"
            data-contain=""
            data-space-vertical="10"
            //data-border=""
            data-radius="10"
            data-width="auto"
          >
            <text data-ellipsis="" >Version</text>

            <text data-weight="700">{buildInfo.version}</text>
          </group>
          <group
            onClick={handleReload}
            data-align="center"
            data-gap="10" 
            data-contain=""
            data-space-vertical="10"
           // data-interactive=""
            data-cursor="pointer"
            data-radius="10"
            data-width="auto"
            data-wrap="no"
           // data-background="highlight"
         //  data-type="link"

          >
            <text data-ellipsis="">Build Date & Time</text>

            <text data-ellipsis="" data-weight="700">
              {buildInfo.buildDateTime}
            </text>
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
    </>
  );
}

export default About;
