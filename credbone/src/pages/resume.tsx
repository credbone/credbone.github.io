import React from "react";
import { SvgResumeQR } from "../components/svg";
import StuckReporter from "../components/StuckReporter";
import Ripple from "../components/Ripple";


const handlePrint = () => {
  window.print();
};

function Resume() {
  return (
    <group data-space="" data-scroll="" data-border="no">
      <group data-space="adaptive-30-50" data-gap="30" data-direction="column">
        <group data-direction="column">
          <text
            data-user-select="text"
            data-weight="800"
            data-text-size="xxx-large"
            data-wrap="wrap"
            // data-opacity="20"
            data-ellipsis=""
          >
            Ruben Sargsyan
          </text>
          <text
            data-user-select="text"
            data-weight="700"
            data-text-size="x-large"
            data-wrap="wrap"
            data-ellipsis=""
          >
            Product Designer
          </text>
        </group>

        <group>
          <text
            data-user-select="text"
            data-wrap="wrap"
            data-max-length="700"
            data-line="1.5"
          >
            As a Product Designer, I've spent the last decade leading and
            growing a dedicated design team in the IT and services industry.
            With a strong background in digital design, I focus on crafting
            innovative, user-centered solutions. I make sure our designs are not
            just creative but also technically solid and effective.
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
            data-gap="10"
            data-align="start"
          >
            <a href="tel:+37493080648" data-type="group" data-width="auto">
              <text
                data-wrap="wrap"
                data-weight="700"
                date-decoration="underline"
              >
                <mark> + 374 93 080 648</mark>
              </text>
            </a>

            <a
              href="mailto:sargsyanrubens@gmail.com"
              data-type="group"
              data-width="auto"
            >
              <text data-user-select="text" data-wrap="wrap" data-weight="600">
                sargsyanrubens@gmail.com
              </text>
            </a>

            <group>
              <text data-user-select="text">Armenia, Yerevan</text>
            </group>
          </group>
        </group>

        <separator data-horizontal="" data-max-length="700"></separator>

        <group data-gap="30">
          <text
            data-user-select="text"
            data-weight="700"
            data-text-size="x-large"
          >
            Experience
          </text>

          <group data-gap="10">
            <text data-user-select="text" data-weight="700">
              Ogma
            </text>
            <dot></dot>
            <text data-user-select="text">Design Department Manager</text>
            <dot></dot>
            <text data-user-select="text">February 2014 - Present</text>
          </group>

          <group data-direction="column">
            <text
              data-user-select="text"
              data-wrap="wrap"
              data-max-length="700"
              data-line="1.5"
            >
              I left my previous position at Altacode to join Ogma, where I
              started on a challenging project involving content creation,
              management software, and customized hardware solutions tailored to
              specific customer needs. After a successful launch, I had the
              chance to build a{" "}
              <mark>UI framework and a collection of components</mark>, working
              closely with design and development team members. This powerful
              internal tool really helped us speed up our development processes.
            </text>
          </group>

          <group data-gap="10">
            <text data-user-select="text" data-weight="700">
              Altacode
            </text>
            <dot></dot>
            <text data-user-select="text">UI Designer</text>
            <dot></dot>
            <text data-user-select="text">November 2011 - January 2014</text>
          </group>

          <group data-direction="column">
            <text
              data-user-select="text"
              data-wrap="wrap"
              data-max-length="700"
              data-line="1.5"
            >
              This was my first job at a big company, and I learned a lot about
              business processes like project management, team collaboration,
              and client communication. I also got the chance to work on a
              variety of web and mobile products.
            </text>
          </group>
        </group>

        <separator data-horizontal="" data-max-length="700"></separator>

        <group data-gap="30">
          <text
            data-user-select="text"
            data-weight="700"
            data-text-size="x-large"
          >
            Skills
          </text>
        </group>

        <group data-gap="10">
          <group data-gap="10">
            <mark>
              <text data-user-select="text" data-weight="700">
                Prototyping
              </text>
            </mark>
            <dot></dot>
            <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
              From Paper & Rapid to High-fidelity Markups
            </text>
          </group>

          <group data-gap="10">
            <text data-user-select="text" data-weight="700">
              Research
            </text>
            <dot></dot>
            <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
              From User interviews to Creating and Managing Personas
            </text>
          </group>

          <group data-gap="10">
            <mark>
              <text data-user-select="text" data-weight="700">
                Coding
              </text>
            </mark>
            <dot></dot>
            <text data-user-select="text" data-wrap="wrap" data-ellipsis="">
              From Prototype & Reusable Components to Complete UI
            </text>
          </group>
        </group>

        <group data-gap="30">
          <text
            data-user-select="text"
            data-weight="700"
            data-text-size="x-large"
          >
            Tools
          </text>
        </group>

        <group data-gap="10">
          <group data-gap="10">
            <text data-user-select="text" data-weight="700">
              Adobe Suite
            </text>
            <dot></dot>
            <text>PS</text>
            <dot></dot>
            <text>AI</text>
            <dot></dot>
            <text data-user-select="text" data-weight="700">
              Figma
            </text>
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
          >
            Education
          </text>
        </group>

        <group data-gap="10">
          <group data-gap="10">
            <text
              data-user-select="text"
              data-weight="700"
              data-wrap="wrap"
              data-ellipsis=""
            >
              WSIiZ - Rzeszowie
            </text>
            <dot></dot>
            <text
              data-user-select="text"
              data-weight="700"
              data-wrap="wrap"
              data-ellipsis=""
            >
              Grafika komputerowa i produkcja multimedialna
            </text>
          </group>

          <group data-gap="10">
            <text
              data-user-select="text"
              data-weight="700"
              data-wrap="wrap"
              data-ellipsis=""
            >
              Russian - Armenian University
            </text>
            <dot></dot>
            <text
              data-user-select="text"
              data-weight="700"
              data-wrap="wrap"
              data-ellipsis=""
            >
              Department of Physics and Technology
            </text>
          </group>
        </group>

        <separator data-horizontal="" data-max-length="700"></separator>

        <group data-gap="10">
          <group data-gap="10">
            <a
              data-type="link"
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
            data-space="adaptive-30-50"
          >
            <group data-width="auto">
              <Ripple>
                <group
                  onClick={handlePrint}
                  data-contain=""
                  data-width="auto"
                  data-height={isSticky ? "60" : "50"}
                  data-radius={isSticky ? "30" : "10"}
                  data-background="context"
                  data-cursor="pointer"
                  data-shrink="no"
                  data-elevation={isSticky ? "6" : "1"}
                  data-interactive=""
                  data-align="center"
                  data-wrap="no"
                  data-space={isSticky ? "0" : "15"}
                  data-gap={isSticky ? "0" : "10"}
                >
                  <group data-length={isSticky ? "60" : "20"}>
                    <icon data-position="center">print</icon>
                  </group>

                  <text
                    data-weight="600"
                    data-duration=".225"
                    data-opacity={isSticky ? "0" : ""}
                    data-transition-prop="font-size"
                    data-text-size={isSticky ? "0" : ""}
                  >
                    Print
                  </text>
                </group>
              </Ripple>
            </group>
          </group>
        )}
      </StuckReporter>
      <group data-height="100"  data-print="hide"></group>
    </group>
  );
}

export default Resume;
