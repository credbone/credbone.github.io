import React from "react";

import buildInfo from "../buildInfo.json";
import { Link } from "react-router-dom";
import { SvgLogoIllustration, SvgWood } from "../components/icon/svgRes";

//import sampleImage from "../styles/images/samples/res_82.webp";
import sampleImage_4 from "../styles/images/samples/wide_res_68.webp";
import Tooltip from "../components/tooltip";
// import sampleImage_2 from "../styles/images/samples/wide_res_01.jpg";

const links = [
  { name: "View Resume", url: "/Resume" },
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
    <group data-space="30" data-gap="30" data-wrap="no">
      {/* <group data-length="260" data-adaptive="desktop">
        <group data-direction="column" data-justify="end">
          <picture
            data-radius="50"
            data-contain=""
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"
          >
            <img src={sampleImage} alt="" />
          </picture>

          <group data-space="30" data-sticky="bottom">
            <group
              data-space="30"
              data-index="2"
              data-radius="20"
              data-contain=""
              data-backdrop="20-adaptive"
              // data-background="main-background"
            >
              <group data-width="auto" data-gap="30">
                <text
                  data-wrap="wrap"
                  data-font-type="hero"
                  data-line="1"
                  data-text-size="medium-small"
                  data-max-length="800"
                >
                  Crafted <br></br>for growth.
                </text>
                <separator data-horizontal=""></separator>

                <text
                  data-wrap="wrap"
                  //  data-opacity="80"
                  data-line="1.5"
                  data-text-size="medium-small"
                >
                  Adapting from prototypes to enterprise apps, evolving with
                  every project.
                </text>
                <SvgWood />
              </group>
            </group>
          </group>
        </group>
      </group> */}

      <group
        data-gap="30"
        data-direction="column"
        data-align="start"
        data-max-length="1200"
        data-contain=""
      >
        <group data-space="adaptive-30-50">
          <group
            data-gap="30"
            data-index="2"
            data-direction="column"
            data-width="auto"
            data-align="start"
          >
            <group data-width="auto" data-gap="30">
              <text
                data-weight="800"
                data-text-size="medium-small"
                data-wrap="wrap"
                data-line="1"
                data-font-type="hero"
              >
                The
                <br /> Project
              </text>
              <separator data-horizontal=""></separator>
            </group>

            <group
              data-index="2"
              data-direction="column"
              data-length="200"
              data-radius="20"
              data-justify="center"
              data-align="center"
            >
              <SvgLogoIllustration />
            </group>

            <group data-width="auto">
              <text
                data-wrap="wrap"
                data-length="300"
                //   data-opacity="60"
                data-line="1.5"
                data-text-size="medium-small"
              >
                A hybrid, atomic, and declarative design system that brings
                flexibility, control and speed to projects.
              </text>
            </group>
          </group>
        </group>

        <group data-direction="column" >
          <picture
            data-radius="50"
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"
          >
            <img src={sampleImage_4} alt="" />
          </picture>

          <group data-direction="column" data-space="30" data-align="start">
            <group
              data-space="30"
              data-position="bottom"
              data-backdrop="20-adaptive"
              data-width="auto"
              data-radius="20"
            >
              <group data-gap="30" data-direction="column" data-align="start">
                <group data-width="auto" data-gap="30">
                  <text
                    data-wrap="wrap"
                    data-font-type="hero"
                    data-line="1"
                    data-text-size="medium-small"
                    data-max-length="800"
                  >
                    Crafted <br></br>for growth.
                  </text>
                  <separator data-vertical="adaptive" data-height=""></separator>

                <group
                  data-width="auto"
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                >
                  <text
                    data-wrap="wrap"
                    data-line="1.5"
                    data-length="300"
                    data-text-size="medium-small"
                  >
                    Adapting from prototypes to enterprise apps, evolving with
                    every project.
                  </text>
                </group>

                </group>

              </group>
            </group>
          </group>
        </group>

        <group
          data-radius="40"
          data-border="inset"
          data-direction="column-1200"
          data-contain=""
          data-gap="1"
        >
          <group
            data-border=""
            // data-radius="30"
            data-direction="column"
            data-space="45"
            data-gap="30"
            data-wrap="wrap"
            // data-height="200"
            //  data-elevation="2"
            data-width="auto"
            data-align="start"
          >
            <group data-direction="column" data-gap="15" data-align="start">
              <text
                data-text-size="display-md"
               data-height="3.846rem"
                data-contain=""
                data-weight="100"
                data-opacity="10"
              >
                01
              </text>
              <text data-weight="700" data-text-size="large" data-wrap="wrap">
                Purpose & Vision
              </text>
              <text data-wrap="wrap" data-line="1.5" data-length="300">
                To provide a robust UI foundation that transforms ideas into
                complete, functional applications—combining design elegance with
                practical efficiency.
              </text>
            </group>
            <Link
              data-position="bottom"
              data-contain=""
              data-drag="none"
              data-type="group"
              to="/Components/Overview"
              data-interactive=""
              data-width="auto"
              data-background="text"
              data-color="main-background"
              data-over-color="neutral"
              data-space="15"
              data-space-horizontal="25"
              data-radius="10"
            >
              <text data-weight="700" data-ellipsis="">
                Explore Components
              </text>
            </Link>
          </group>

          <group
            //     data-background="adaptive-gray"
            //         data-radius="30"
            data-direction="column"
            data-space="45"
            data-gap="30"
            data-align="start"
            data-wrap="wrap"
            data-width="auto"
          >
            <group data-direction="column" data-gap="15">
              <text
                data-text-size="display-md"
               data-height="3.846rem"
                data-contain=""
                data-weight="100"
                data-opacity="10"
              >
                02
              </text>
              <text data-weight="700" data-text-size="large" data-wrap="wrap">
                Designed to Scale
              </text>
              <text data-wrap="wrap" data-line="1.5" data-length="200">
                System built to handle projects of any size. From small
                prototypes to enterprise-level applications, every element
                adapts, grows, and evolves.
              </text>
            </group>

            <Link
              data-position="bottom"
              data-contain=""
              data-drag="none"
              data-type="group"
              to="/Components/QuickDemos"
              data-interactive=""
              data-width="auto"
              data-border=""
              data-over-color="neutral"
              data-space="15"
              data-space-horizontal="25"
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
          </group>

          <group
            data-border=""
            //       data-radius="30"
            data-direction="column"
            data-space="45"
            data-gap="30"
            data-justify="end"
            data-wrap="wrap"
            data-align="start"
            data-fit="1"
            data-width="auto"
          >
            <group data-direction="column" data-gap="15">
              <text
                data-text-size="display-md"
               data-height="3.846rem"
                data-contain=""
                data-weight="100"
                data-opacity="10"
              >
                {buildInfo.version}
              </text>
              <text data-weight="700" data-text-size="large" data-wrap="wrap">
                Up to Date
              </text>
              <text data-wrap="wrap" data-line="1.5" data-length="300">
                Updated frequently to ensure every component not only keeps up
                with modern design trends but also stays reliable and ready to
                meet evolving applications.
              </text>
            </group>

            <Tooltip content={buildInfo.buildDateTime}>
              <group
                data-position="bottom"
                data-interactive=""
                onClick={handleReload}
                data-align="center"
                data-gap="10"
                data-contain=""
                // data-interactive=""
                data-cursor="pointer"
                data-space="15"
                              data-space-horizontal="25"
                data-radius="10"
                data-width="auto"
                data-wrap="no"
                data-border=""
                data-over-color="neutral"
                data-ink-color="neutral"
              >
                <text data-ellipsis="">Version</text>

                <text data-weight="700">{buildInfo.version}</text>
              </group>
            </Tooltip>
          </group>
        </group>

        <group
          data-gap="30"
          data-direction="column"
          // data-background="context"
          data-space="30"
          data-radius="30"
          // data-theme="dark"
          data-align="start"
        >
          <group
            data-width="auto"
            data-direction="column"
            data-gap="20"
            data-space="15"
          >
            <text data-text-size="xx-large" data-weight="700" data-wrap="wrap">
              Get in Touch
            </text>
            <text
              data-wrap="wrap"
              data-max-length="400"
              data-opacity="40"
              data-line="1.5"
              data-text-size="medium-small"
            >
              Let's connect! Whether you're curious about my work, looking to
              collaborate, or simply want to reach out, feel free to explore or
              drop a message.
            </text>
          </group>

          <group data-gap="30" data-type="grid" data-grid-template="200">
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

            <group data-direction="column" data-width="auto" data-align="start">
              <Link
                data-drag="none"
                data-width="auto"
                data-type="group"
                data-interactive=""
                data-over-color="neutral"
                data-space="15"
                data-radius="10"
                data-weight="600"
                to="https://calendly.com/sargsyanrubens/15-minute-chat"
                target="_blank"
              >
                <text>Reserve 15-Minute Call</text>
              </Link>
              <Link
                data-drag="none"
                data-width="auto"
                data-type="group"
                data-interactive=""
                data-over-color="neutral"
                data-space="15"
                data-radius="10"
                data-weight="600"
                to="https://t.me/sargsyanruben"
                target="_blank"
              >
                <text>Message Me</text>
              </Link>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default About;
