import React, { useState } from "react";

import Marquee from "../components/Marquee";
import Count from "../components/Coutner";

import sampleImage from "../styles/images/samples/wide_res_68.webp";
import sampleImage_2 from "../styles/images/samples/wide_res_66.webp";
import sampleImage_3 from "../styles/images/samples/wide_res_67.webp";
import Ripple from "../components/Ripple";
import TemplatePageHeader from "./TemplatePageHeader";


const Miscellaneous: React.FC = () => {
  const [restartKey, setRestartKey] = useState(0);



  const handleRestartCount = () => {
    // Increment the restart key to trigger a re-render of the Count component
    setRestartKey((prevKey) => prevKey + 1);
  };

  const [dir, setDir] = useState<"rtl" | "ltr">("ltr"); // Initialize dir state

  // Function to toggle dir attribute
  const toggleDir = () => {
    setDir((prevDir) => (prevDir === "rtl" ? "ltr" : "rtl"));
  };

  const [isAutoMode, setIsAutoMode] = useState(false);

  const toggleAutoMode = () => {
    setIsAutoMode((prevMode) => !prevMode);
  };

  return (
    <group data-space="30" data-gap="30" data-align="start">


      <TemplatePageHeader
        title="Miscellaneous"
        description="Encompasses a variety of small, diverse UI components that don't fit
          into other categories, including elements like marquees and counters."
        // version="1.0.2"
        //  type="Pattern"
        descriptionProps={{ "data-length": "500" }}
      />

      <group
        data-justify="start"
        data-align="start"
        data-direction="column"
        data-gap="30"
      >
        <group
          //      data-max-length="500"
          data-height="auto"
          data-max-height="fit"
          data-radius="40"
          data-contain=""
        >
          <group data-direction="column" data-justify="end">
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage} alt="" />
            </picture>

            <group data-space="30">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="30"
                data-gap="10"
                data-radius="15"
              >
                <text
                  data-weight="700"
                  data-text-size="large"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Marquee
                </text>

                <text
                  data-wrap="wrap"
                  data-length="300"
                  data-line="1.5"
                  data-ellipsis=""
                >
                  Functional component that provides a marquee effect for its
                  children elements, supporting both <b>LTR</b> and <b>RTL</b>{" "}
                  directions
                </text>
              </group>
            </group>
          </group>
        </group>

        <group
          data-contain=""
          data-align="center"
          data-border=""
          data-index="2"
          data-radius="20"
        >
          <group data-contain="" dir={dir}>
            <Marquee auto={isAutoMode}>
              <group data-space="30">
                <text data-weight="600">
                  Did you know? The first computer mouse was invented in{" "}
                  <b>1964</b> by Douglas Engelbart and was made of wood. It
                  revolutionized how we interact with computers, paving the way
                  for modern UI designs we use today.
                </text>
              </group>
            </Marquee>
          </group>
        </group>

        <group data-gap="10">
          <group
            data-contain=""
            data-space="15"
            data-interactive=""
            data-cursor="pointer"
            data-radius="10"
            data-width="auto"
            // data-length="180"
            data-align="center"
            data-direction="column"
            data-background="highlight"
            onClick={toggleDir}
          >
            <text data-weight="600">Toggle Direction </text>
          </group>

          <group
            data-contain=""
            data-space="15"
            data-interactive=""
            data-cursor="pointer"
            data-radius="10"
            data-width="auto"
            //   data-length="180"
            data-align="center"
            data-direction="column"
            onClick={toggleAutoMode}
            data-background={isAutoMode ? "main" : "highlight"}
            data-color={isAutoMode ? "main-text" : ""}
          >
            <text data-weight="600">
              {isAutoMode ? "Disable Auto Mode" : "Enable Auto Mode"}
            </text>
          </group>
        </group>

        <separator data-horizontal="" data-interval="30"></separator>

        <group data-radius="40" data-contain="">
          <group data-direction="column" data-justify="end">
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage_2} alt="" />
            </picture>

            <group data-space="30">
              <group
                data-width="auto"
                data-background="context"
                data-direction="column"
                data-space="30"
                data-gap="10"
                data-radius="15"
              >
                <text
                  data-weight="700"
                  data-text-size="large"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Count
                </text>

                <text data-wrap="wrap" data-line="1.5" data-length="300">
                  Component that smoothly transitions a number from a starting
                  value <b>from</b> to an ending value <b>to</b> over a set
                  period of time <b>duration</b>.
                </text>
              </group>
            </group>
          </group>
        </group>

        <group
          data-border=""
          data-radius="20"
          data-gap="1"
          data-direction="column"
          data-type="grid"
          data-grid-template="120"
          data-contain=""
          data-length="600"
        >
          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={256}
                duration={2000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={64}
                //  direction="down"
                duration={2000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={512}
                to={128}
                //   direction="down"
                duration={5000}
              ></Count>
            </text>
          </group>

          <group
            data-ratio="1:1"
            data-align="center"
            data-border=""
            data-justify="center"
          >
            <text data-text-size="xx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={512}
                duration={8000}
              ></Count>
            </text>
          </group>
        </group>

        <group>
          <group
            data-contain=""
            data-space="15"
            data-interactive=""
            data-cursor="pointer"
            data-radius="10"
            data-width="auto"
            data-align="center"
            data-direction="column"
            data-background="highlight"
            onClick={handleRestartCount}
          >
            <text data-ellipsis="" data-weight="600">
              Restart Counters
            </text>
          </group>
        </group>

        <separator data-horizontal="" data-interval="30"></separator>

        <group data-radius="40" data-contain="">
          <group data-radius="15" data-contain="">
            <group data-direction="column" data-justify="end">
              <picture
                data-contain=""
                data-brightness="adaptive"
                data-position="absolute"
                data-background="grey-light"
              >
                <img src={sampleImage_3} alt="" />
              </picture>

              <group data-space="30">
                <group
                  data-width="auto"
                  data-background="context"
                  data-direction="column"
                  data-space="30"
                  data-gap="10"
                  data-radius="15"
                >
                  <text
                    data-weight="700"
                    data-text-size="large"
                    data-wrap="wrap"
                    data-ellipsis=""
                  >
                    Ripple
                  </text>

                  <text data-wrap="wrap" data-line="1.5" data-length="300">
                    Ripple is a visual feedback effect for touch interactions,
                    giving users a clear indication that an element has been
                    touched.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group data-gap="15">
          <Ripple>
            <group
              data-width="auto"
              data-direction="column"
              data-ink-color="neutral"
              data-cursor="pointer"
              data-border=""
              data-radius="20"
              data-contain=""
              data-space="30"
              data-length="forcefit"
              data-gap="20"
              data-align="start"
            >
              <group data-width="auto" data-direction="column">
                <text data-weight="600">Interact</text>
                <text data-opacity="40">Neutral Color</text>
              </group>

              <separator data-horizontal="" data-height=""></separator>

              <text
                data-wrap="wrap"
                data-line="1.5"
                data-opacity="40"
                data-length="200"
              >
                The component creates a radial ripple effect from the user's
                touch.
              </text>
            </group>
          </Ripple>

          <Ripple>
            <group
              data-length="forcefit"
              data-width="auto"
              data-direction="column"
              data-cursor="pointer"
              data-background="highlight"
              data-radius="20"
              data-contain=""
              data-space="30"
            >
              <text data-weight="600">Interact</text>
              <text data-opacity="30">Default Shade</text>
            </group>
          </Ripple>

          <Ripple>
            <group
              data-length="forcefit"
              data-width="auto"
              data-direction="column"
              data-ink-color="main-dark"
              data-cursor="pointer"
              data-background="main"
              data-color="main-text"
              data-radius="20"
              data-contain=""
              data-space="30"
            >
              <text data-weight="600">Interact</text>
              <text data-opacity="30">Primary Color</text>
            </group>
          </Ripple>
        </group>
      </group>
    </group>
  );
};
export default Miscellaneous;
