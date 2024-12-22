import React, { useState } from "react";

import Marquee from "../components/Marquee";
import Count from "../components/Coutner";


import sampleImage from "../styles/images/samples/res_72.jpg";
import Ripple from "../components/Ripple";

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

<group data-space="30" data-gap="30" data-align="start" >

<group data-direction="column" data-gap="10" data-background="adaptive-gray" data-radius="20" data-justify="end" data-space="30">
        <group data-height="100" data-adaptive="desktop">

        </group>
      <text
        data-weight="700"
        data-text-size="xxx-large"
        data-wrap="wrap"
        data-ellipsis=""
     //   data-color="main"
      >
       Miscellaneous
      </text>
      <text
        data-wrap="wrap"
        data-length="500"
        data-line="1.5"

      >
     Encompasses a variety of small, diverse UI components that don't fit into other categories, including elements like marquees and counters.
      </text>
    </group>

   

   <group

      data-column-gap="15"
      data-justify="start"
      data-align="start"
      data-type='column'
      // data-column-size="500"
    >



      <group
  //      data-max-length="500"
        data-height="auto"
        data-max-height="fit"
        data-radius="15"
       data-border=""
        data-contain=""
      >

<group
          //    data-radius="10"
          data-direction="column"
          data-space="30"
          data-gap="10"
          data-background="main"
          data-color="main-text"
        >
          <text
            data-weight="700"
            data-text-size="xxx-large"
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
            Marquee component in this code is a React functional component that
            provides a marquee effect for its children elements, supporting both{" "}
            <b>LTR</b> and <b>RTL</b> directions
          </text>
        </group>

        <group
              data-direction="column"
              data-min-height="300"
              data-justify="end"
            >
              <picture
                data-contain=""
                data-brightness="adaptive"
                data-position="absolute"
                data-background="grey-light"
              >
                <img src={sampleImage} alt="" />
              </picture>


              <group data-space="30" >

              <group
          data-contain=""
          // data-dark=""
          data-align="center"
          //  data-direction="column"
          //  data-wrap="no"
        >
          <group data-contain="" data-radius="10" dir={dir} data-background="context">
            <Marquee auto={isAutoMode}>
              <group data-space="30">
                <text data-weight="600">
                  Encompasses a variety of small, diverse UI components that
                  don't fit into other categories, including elements like
                  marquees and counters.
                </text>
              </group>
            </Marquee>
          </group>
        </group>


              </group>
            </group>




        <group data-space="20" data-gap="10" data-border="">
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
      </group>

      <group
 //       data-max-length="500"
        data-height="auto"
        data-max-height="fit"
        data-radius="15"
       data-border=""
        data-contain=""
      >
        <group data-gap="30" data-space="30">
          <group data-gap="10">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
              Count
            </text>
            <text data-wrap="wrap" data-line="1.5">
              The Count is a functional component that smoothly transitions a
              number from a starting value <b>from</b> to an ending value{" "}
              <b>to</b> over a set period of time <b>duration</b>. It also has
              an optional setting, direction, which can be either <b>up</b> or{" "}
              <b>down</b>, with <b>up</b> being the default.
            </text>
          </group>
        </group>

        <group
          data-gap="1"
          data-direction="column"
          data-type="grid"
          data-grid-template="120"
          data-background="context"
          data-contain=""
          data-border=""
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

        <group data-space="20">
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
        </group>
      </group>




      <group
 //       data-max-length="500"
        data-height="auto"
        data-max-height="fit"
        data-radius="15"
       data-border=""
        data-contain=""
      >
        <group data-gap="30" data-space="30">
          <group data-gap="10">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
              Ripple
            </text>
            <text data-wrap="wrap" data-line="1.5">
            Ripple is a visual feedback effect for touch interactions, giving users a clear indication that an element has been touched.
            </text>
          </group>




        <Ripple>
        <group data-direction="column" data-ink-color="neutral" data-cursor="pointer" data-border="" data-radius="10" data-contain="" data-space="30"><text data-weight="600">Interact</text> <text data-opacity="30">Neutral Color</text></group>
        </Ripple>

        </group>

        <group data-space="30" data-gap="10"  data-background="main-background" data-direction="column" data-align="center" data-justify="center" data-border="">
        

        <Ripple>
        <group data-direction="column" data-cursor="pointer" data-background="highlight" data-radius="10" data-contain="" data-space="30"><text data-weight="600">Interact</text> <text data-opacity="30">Default Shade</text></group>
        </Ripple>

        <Ripple>
        <group data-direction="column" data-ink-color="main-dark" data-cursor="pointer" data-background="main" data-color="main-text" data-radius="10" data-contain="" data-space="30"><text data-weight="600">Interact</text> <text data-opacity="30">Primary Color</text></group>
        </Ripple>
        </group>




        </group>




    </group>




    </group>
  );
};
export default Miscellaneous;
