import { SvgResumeQR } from "../components/svg";
import StuckReporter from "../components/StuckReporter";

import { Printer } from "lucide-react";
import AudioPlayer from "./audio_resume";

const handlePrint = () => {
  window.print();
};

function Resume() {
  return (
    <view data-scroll="" data-border="no">
      <group
        data-print="hide"
        data-max-length="1200"
        data-space="30"
        data-space-bottom="0"
      >
        <group>
          <group data-height="30" data-adaptive="desktop"></group>

          <group data-space="45" data-max-length="600">
            <text
              data-wrap="wrap"
              data-font-type="hero"
              data-ellipsis=""
              data-line="1"
              data-text-size="64"
              data-text-clamp="64"
            >
              10+ years, crafting user-focused designs.
            </text>
          </group>

          <group data-height="30" data-adaptive="desktop"></group>
        </group>
      </group>

      <group
        data-gap="30"
        data-space="30"
        data-wrap="no"
        data-direction="column-800"
      >
        <group
          data-length="300"
          data-width="auto-800"
          data-direction="column"
          data-gap="30"
          data-align="start"
          data-print="hide"
        >
          <group
            data-border=""
            data-space="15"
            data-radius="30"
            data-sticky="top"
            data-top="30"
          >
            <AudioPlayer />
          </group>
        </group>

        <group data-max-length="700">
          <group data-gap="30" data-direction="column" data-user-select="text">
            <group></group>
            <group data-direction="column" data-gap="10">
              <text
                data-user-select="text"
                data-weight="700"
                data-font-type="hero"
                data-text-size="xx-large"
                data-wrap="wrap"
                // data-opacity="20"
                data-line="1"
              >
                Ruben Sargsyan
              </text>
              <text
                data-user-select="text"
                data-weight="700"
                data-font-type="hero"
                data-text-size="large"
                data-wrap="wrap"
                data-line="1"
              >
                Product Designer
              </text>
            </group>

            <group>
              <text data-user-select="text" data-wrap="wrap" data-line="1.5">
                As a Product Designer with over a decade of experience in UI and
                UX design, I've had leading talented design team. My focus on
                user-centered solutions ensures that our work is both visually
                compelling and technically sound. I'm passionate about crafting
                designs that don't just look great—they're built to perform and
                truly meet users needs.
              </text>
            </group>

            <group data-gap="30">
              <a
                href="https://credbone.com/Resume"
                data-type="group"
                data-width="auto"
                data-background="white"
                data-drag="none"
                data-print="show"
              >
                <SvgResumeQR />
              </a>
              <group
                data-direction="column"
                data-width="auto"
                data-gap="5"
                data-align="start"
               
              >
                <a
                  data-print="show"
                  href="tel:+37493080648"
                  data-type="group"
                  data-width="auto"

                >
                  <text
                    data-wrap="wrap"
                    data-weight="700"
                    data-cursor="pointer"
                    data-text-size="medium"

                  >
                    + 374 93 080 648
                  </text>
                </a>

<group   data-print="show">

</group>
                <a
                  href="mailto:sargsyanrubens@gmail.com"
                  data-type="group"
                  data-width="auto"
                >
                  <text
                    data-user-select="text"
                    data-wrap="wrap"
                    data-weight="600"
                  >
                    <text data-cursor="pointer">sargsyanrubens@gmail.com</text>
                  </text>
                </a>

                <group>
                  <text data-user-select="text">Armenia, Yerevan</text>
                </group>
              </group>
            </group>

            <group data-print="show">
              <separator data-horizontal=""></separator>
            </group>

            <group data-gap="20" data-direction="column">
              <text
                data-user-select="text"
                data-weight="700"
                data-font-type="hero"
                data-text-size="x-large"
              >
                Experience
              </text>


              <group data-gap="5" data-direction="column">
                <text data-line="1.5">
                  <text data-user-select="text" data-weight="700">
                    SoftConstruct
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    Senior UX Designer
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap" data-weight="700">
                    May 2025 - Present
                  </text>
                </text>

                <group data-direction="column">
                  <text
                    data-user-select="text"
                    data-wrap="wrap"
                    data-line="1.5"
                    data-max-length="500"
                  >
                   Senior UX at SoftConstruct, working on large-scale projects with cross-functional teams, delivering user-centered web and mobile solutions.
                  </text>
                </group>
              </group>

                      <separator data-horizontal=""  data-max-length="500"></separator>

              <group data-gap="5" data-direction="column">
                <text data-line="1.5">
                  <text data-user-select="text" data-weight="700">
                    Ogma
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    Design Department Manager
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    February 2014 - November 2024
                  </text>
                </text>

                <group data-direction="column">
                  <text
                    data-user-select="text"
                    data-wrap="wrap"
                    data-line="1.5"
                  >
                    Joined Ogma to lead design for content management software, web systems, and mobile apps. Focused on user-centered, impactful designs aligned with technical objectives.
                  </text>
                </group>
              </group>

   

              <group data-gap="5" data-direction="column">
                <text data-line="1.5">
                  <text data-user-select="text" data-weight="700">
                    Wovenmedia
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    User Interface Design Manager
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    2014 - 2024
                  </text>
                </text>

                <group data-direction="column">
                  <text
                    data-user-select="text"
                    data-wrap="wrap"
                    data-line="1.5"
                  >
In parallel, led UI design at Wovenmedia 
for a complex digital video signage management system.
                  </text>
                </group>
              </group>

                       

              <group data-gap="5" data-direction="column">
                <text data-line="1.5">
                  <text data-user-select="text" data-weight="700">
                    Altacode
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    UI Designer
                  </text>
                  <dot></dot>
                  <text data-user-select="text" data-wrap="wrap">
                    November 2011 - January 2014
                  </text>
                </text>

                <group data-direction="column">
                  <text
                    data-user-select="text"
                    data-wrap="wrap"
                    data-line="1.5"
                  >
                   First role in a large company, gaining experience in project management,
                   team collaboration, client communication, and working on diverse web and mobile products.
                  </text>
                </group>
              </group>
            </group>

            <separator data-horizontal=""></separator>

            <group data-gap="30">
              <text
                data-user-select="text"
                data-weight="700"
                data-text-size="x-large"
                data-font-type="hero"
              >
                Skills
              </text>
            </group>

            <group data-gap="10" data-direction="column">
              <text data-line="1.5">
                <text data-user-select="text" data-weight="700">
                  Prototyping
                </text>

                <dot></dot>
                <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
                  From Paper & Rapid to High-fidelity Markups
                </text>
              </text>

              <text data-line="1.5">
                <text data-user-select="text" data-weight="700">
                  Research
                </text>
                <dot></dot>
                <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
                  From User interviews to Creating and Managing Personas
                </text>
              </text>

              <text data-line="1.5">
                <text data-user-select="text" data-weight="700">
                 Coding
                </text>

                <dot></dot>
                <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
                  From Prototype & Reusable Components to Complete UI
                </text>
              </text>
            </group>

            <group data-gap="30">
              <text
                data-user-select="text"
                data-weight="700"
                data-text-size="x-large"
                data-font-type="hero"
              >
                Tools
              </text>
            </group>

            <group data-gap="10">
              <group data-gap="10">
                <text data-user-select="text" data-weight="700">
                 Figma
                </text>
                <dot></dot>
                <text data-user-select="text" data-weight="700">
                  Adobe Suite
                </text>
                <dot></dot>
                <text>PS</text>
                <dot></dot>
                <text>AI</text>
              </group>

              <group data-gap="10">
                <text data-user-select="text" data-weight="700">
                  HTML
                </text>
                <dot></dot>
                <text data-user-select="text" data-weight="700">
                  CSS
                </text>
                <dot></dot>
                <text data-user-select="text" data-weight="700">
                  Javascript
                </text>
              </group>
            </group>

            <group data-gap="30">
              <text
                data-user-select="text"
                data-weight="700"
                data-text-size="x-large"
                data-font-type="hero"
              >
                Education
              </text>
            </group>

            <group data-gap="10" data-direction="column">
              <text data-line="1.5">
                <text
                  data-user-select="text"
                  data-weight="700"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  WSIiZ - Rzeszowie
                </text>

                <dot></dot>
                <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
                  Grafika komputerowa i produkcja multimedialna
                </text>
              </text>

              <text data-line="1.5">
                <text
                  data-user-select="text"
                  data-weight="700"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Russian - Armenian University
                </text>
                <dot></dot>
                <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
                  Department of Physics and Technology
                </text>
              </text>
            </group>

            <separator data-horizontal=""></separator>

            <group data-gap="10">
              <group data-gap="10" data-align="center">
                <a
                  data-type="link"
                  //    data-color="main"
                  data-decoration="underline"
                  href="https://www.linkedin.com/in/sargsyanruben"
                  target="blank"
                >
                  <text data-weight="600" data-ellipsis="">
                    linkedin.com/in/sargsyanruben
                  </text>
                </a>
                <dot></dot>
                <a
                  data-type="link"
                  //     data-color="main"
                  data-decoration="underline"
                  href="https://www.behance.net/sargsyan"
                  target="blank"
                >
                  <text data-weight="600" data-ellipsis="">
                    behance.net/sargsyan
                  </text>
                </a>
                <dot></dot>
                <a
                  data-type="link"
                  //    data-color="main"
                  data-decoration="underline"
                  href="https://dribbble.com/sargsyan"
                  target="blank"
                >
                  <text data-weight="600" data-ellipsis="">
                    dribbble.com/sargsyan
                  </text>
                </a>
              </group>
            </group>
          </group>

          <StuckReporter>
            {(isSticky) => (
              <group
                data-print="hide"
                data-index="3"
                data-bottom="30"
                data-sticky="bottom"
                data-width="auto"
                data-space-vertical="30"
                data-over-color="neutral"
              >
                <group data-height="50"></group>
                <group data-width="auto">
                  <group
                    onClick={handlePrint}
                    data-contain=""
                    data-width="auto"
                    data-height={isSticky ? "60" : "50"}
                    data-radius={isSticky ? "30" : "10"}
                    data-background="text"
                    data-color="main-background"
                    data-cursor="pointer"
                    data-shrink="no"
                    //  data-elevation={isSticky ? "6" : "1"}
                    data-interactive=""
                    data-align="center"
                    data-wrap="no"
                    data-space={isSticky ? "0" : "15"}
                    data-gap={isSticky ? "0" : "10"}
                  >
                    <group data-length={isSticky ? "60" : "20"}>
                      <icon data-position="center">
                        <Printer size={20} />{" "}
                      </icon>
                    </group>

                    <text
                      data-weight="600"
                      data-duration=".225"
                      data-opacity={isSticky ? "0" : ""}
                      data-transition-prop="font-size"
                      data-text-size={isSticky ? "0" : ""}
                    >
                      Save
                    </text>
                  </group>
                </group>
              </group>
            )}
          </StuckReporter>
          <group data-height="100" data-print="hide"></group>
        </group>
      </group>
    </view>
  );
}

export default Resume;
