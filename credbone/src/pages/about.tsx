import React from "react";

import buildInfo from "../buildInfo.json";
import { Link } from "react-router-dom";
import { IconSearch } from "../components/icon/credIcons";
import Ripple from "../components/Ripple";
import Marquee from "../components/Marquee";
import {
  SvgBrandIllustration,
  SvgCubes,
  SvgLogoIllustration,
  SvgPlant,
  SvgPlantTwo,
} from "../components/icon/svgRes";

const links = [
  { name: "Resume", url: "/Resume" },
  {
    name: "Linkedin Profile",
    url: "https://www.linkedin.com/in/sargsyanruben",
    target: "_blank",
  },
  {
    name: "Behance Portfolio",
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

<group       data-direction="column"
      data-align="start"
      data-max-length="1200">
<group
    data-gap="30"
    data-direction="column"
    // data-background="highlight"

    data-height="400"




    data-align="center"
    data-contain=""
  >

<group data-position="absolute" data-contain="" data-space="30" data-min-length="900" data-bottom="0" >
<SvgBrandIllustration/>
</group>

  </group>

    <group
      data-gap="50"
      data-direction="column"
      data-align="start"
      data-max-length="1200"
      data-space="30"
    >


      <group data-gap="40" data-index="2">
        <group data-width="auto">
          <text
            data-weight="700"
            data-text-size="xx-large"
            data-wrap="wrap"
            data-line="30"
          >
            The
            <br /> Project
          </text>
        </group>

        {/* <separator data-vertical="" data-height="fit"></separator> */}

        <group data-width="auto">
          <text
            data-wrap="wrap"
            data-length="400"
            data-opacity="40"
            data-line="1.5"
            data-text-size="15"
          >
            Experimental playground showcasing a curated collection of UI
            components and patterns built as React components.
          </text>
        </group>
      </group>

      <group
        data-index="2"
        data-gap="30"
        data-direction="column"
        // data-background="highlight"

        data-max-length="600"
        data-space-vertical="30"
        data-radius="20"
        data-justify="center"
        data-align="center"
      >
        <SvgLogoIllustration />
      </group>

      <group data-type="grid" data-gap="30" data-grid-template="320">
        <group
          data-wrap="no"
          data-direction="column"
          data-width="auto"
          data-align="start"
          data-index="2"
                      data-gap="30"
        >
          <group
            data-background="context"
            data-border=""
            data-radius="20"
            data-direction="column"
            data-space="30"
            data-gap="15"
            data-justify="end"
            data-wrap="wrap"
          
            data-elevation="2"
          >

            
            <text
              data-text-size="72"
              data-height="50"
              data-contain=""
              data-weight="100"
              data-opacity="10"
            >
              01
            </text>
            <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
              Purpose & Vision
            </text>

            <text data-wrap="wrap" data-line="1.5" data-text-size="15">
              To provide a robust UI foundation that transforms ideas into
              complete, functional applications—combining design elegance with
              practical efficiency.
            </text>
          </group>

          <group
            data-direction="column"
            data-space-horizontal="30"

            data-align="start"
          >


            <Ripple>
              <Link
                data-contain=""
                data-drag="none"
                data-type="group"
                to="/Home/Typeface"
                data-interactive=""
                data-width="auto"
                data-background="highlight"
                data-backdrop="20"
                //   data-color="main-text"
                //   data-ink-color="main-dark"
                data-space="15"
                data-radius="10"
              >
                <text
                  data-weight="700"
                  //  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Explore Components
                </text>
              </Link>
            </Ripple>
          </group>
        </group>

        <group
          data-wrap="no"
          data-direction="column"
          data-width="auto"
          data-align="start"
          data-gap="30"
        >
          <group
            data-background="highlight"
          
            data-radius="20"
            data-direction="column"
            data-space="30"
            data-gap="15"
            data-justify="end"
            data-align="start"
            data-wrap="wrap"
            data-height="200"
           
          >
            {/* <group
              data-position="absolute"
              data-left="0"
              data-bottom="0"
              data-radius="20"
              data-contain=""
            >
              <SvgPlantTwo />
            </group> */}

            <group   data-direction="column" data-gap="15">
            <text
              data-text-size="72"
              data-height="50"
              data-contain=""
              data-weight="100"
              data-opacity="10"
            >
              02
            </text>
            <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
              Designed to Scale
            </text>
              </group>


          </group>

          <group
            data-direction="column"
            data-space-horizontal="30"
            data-gap="30"
            data-align="start"
            
          >
            <text data-wrap="wrap" data-line="1.5" data-text-size="15">
              System built to handle projects of any size. From small prototypes
              to enterprise-level applications, every element adapts, grows, and
              evolves.
            </text>
            <Ripple>
              <Link
                data-contain=""
                data-drag="none"
                data-type="group"
                to="/Home/QuickDemos"
                data-interactive=""
                data-width="auto"
                data-background="main"
                data-color="main-text"
                data-ink-color="main-dark"
                data-space="15"
                data-radius="10"
              >
                <text
                  data-weight="700"
                  //  data-wrap="wrap"
                  data-ellipsis=""
                >
                  View Quick Demos
                </text>
              </Link>
            </Ripple>
          </group>
        </group>

        <group
          data-wrap="no"
          data-direction="column"
          data-width="auto"
          data-align="start"
          data-gap="30"
        >
          <group
              data-background="highlight"
            data-radius="20"
            data-direction="column"
            data-space="30"
            data-gap="15"
            data-justify="end"
            data-wrap="wrap"
            data-height="200"
            data-align="start"

          >



<group
              data-position="absolute"
              data-left="0"
              data-bottom="0"
              data-radius="20"
              data-contain=""
               data-height="240"
            >
              
            </group>


<group   data-direction="column" data-gap="15" >
<text
              data-text-size="72"
              data-height="50"
              data-contain=""
              data-weight="100"
              data-opacity="10"
            >
              {buildInfo.version}
            </text>
            <text data-weight="700" data-text-size="x-large" data-wrap="wrap">
              Up to Date
            </text>
</group>

          </group>

          <group data-direction="column" data-space-horizontal="30" data-gap="30">
            <text data-wrap="wrap" data-line="1.5" data-text-size="15">
            Updated frequently to ensure every component not only keeps up with modern design trends but also stays reliable and ready to meet evolving applications.
            </text>
            <group
              data-gap="10"
              data-direction="column"
              data-align="start"
              data-width="auto"
            >
              <group
                data-wrap="no"
                data-align="center"
                data-gap="10"
                data-contain=""
                data-border=""
                data-space="15"
                data-radius="10"
                data-width="auto"
              >
                <text data-ellipsis="">Version</text>

                <text data-weight="700">{buildInfo.version}</text>
              </group>
              <group
                data-dark=""
                data-background="highlight"
                data-interactive=""
                onClick={handleReload}
                data-align="center"
                data-gap="10"
                data-contain=""
                // data-interactive=""
                data-cursor="pointer"
                data-space="15"
                data-radius="10"
                data-width="auto"
                data-wrap="no"
                // data-background="highlight"
                //  data-type="link"
              >
                <text data-ellipsis="">Build Date & Time</text>

                <text data-weight="700">{buildInfo.buildDateTime}</text>
              </group>
            </group>
          </group>
        </group>
      </group>

      <group
        data-gap="30"
        data-direction="column"
        data-background="context"
        data-space="30"
        data-radius="20"
        data-dark=""
        data-align="start"
      >
        <group
          data-width="auto"
          data-direction="column"
          data-gap="20"
          data-space="15"
        >
          <text data-text-size="xx-large" data-weight="700" data-wrap="">
            Get in Touch
          </text>
          <text
            data-wrap="wrap"
            data-length="400"
            data-opacity="40"
            data-line="20"
            data-text-size="15"
          >
           Let's connect! Whether you're curious about my work, looking to collaborate, or simply want to reach out, feel free to explore or drop a message.
          </text>
        </group>



        <group data-direction="column" data-width="auto" data-align="start">
          {links.map((link, index) => (
            <Link
              data-drag="none"
              data-width="auto"
              data-type="group"
              data-interactive=""
              data-over-color="neutral"
              data-space="15"
              data-radius="10"
              data-weight="600"
              to={link.url}
              target={link.target}
              key={index}
            >
              <text data-ellipsis="">{link.name}</text>
            </Link>
          ))}
        </group>
      </group>
    </group>
</group>
  );
}

export default About;
