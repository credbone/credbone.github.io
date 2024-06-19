import React, { useState } from "react";
import sampleImage from "../styles/images/samples/res_42.jpg";
import Marquee from "../components/Marquee";
import Count from "../components/Coutner";

const Miscellaneous: React.FC = () => {
  const [restartKey, setRestartKey] = useState(0);

  const handleRestartCount = () => {
    // Increment the restart key to trigger a re-render of the Count component
    setRestartKey((prevKey) => prevKey + 1);
  };

  return (
    <view data-adaptive="" data-align="start" data-scroll="">
      <group
        data-space="30"
        data-gap="15"
        data-jusitify="start"
        data-align="start"
      >
        <group
          data-max-length="500"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group
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
              Marquee component in this code is a React functional component
              that provides a marquee effect for its children elements,
              supporting both <b>LTR</b> and <b>RTL</b> directions
            </text>
          </group>

          <group
            data-contain=""
            // data-dark=""
            data-align="center"
          >
            <group
              data-length="fit"
              data-background="main-dark"
              data-color="main-text-lighter-white"
            >
              <Marquee>
                <group data-space="30">
                  <text>
                    Encompasses a variety of small, diverse UI components that
                    don't fit into other categories, including elements like
                    marquees and counters.
                  </text>
                </group>
              </Marquee>
            </group>
            <separator data-horizontal=""></separator>
            <group data-length="fit" dir="rtl">
              <Marquee>
                <group data-space="30">
                  <text>
                    Encompasses a variety of small, diverse UI components that
                    don't fit into other categories, including elements like
                    marquees and counters.
                  </text>
                </group>
              </Marquee>
            </group>
          </group>
        </group>

        <group
          data-max-length="500"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
          data-contain=""
          data-space="20"
          data-gap="20"
        >
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

          <group>
            <text data-text-size="xxx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={256}
                duration={2000}
              ></Count>
            </text>
          </group>
          <separator data-horizontal=""></separator>
          <group data-gap="10">
            <text data-text-size="xxx-large" data-weight="700">
              <Count
                key={restartKey}
                from={128}
                to={64}
                direction="down"
                duration={2000}
              ></Count>
            </text>
          </group>
          <separator data-horizontal=""></separator>
          <group>
            <text data-text-size="xxx-large" data-weight="700">
              <Count
                key={restartKey}
                from={512}
                to={128}
                direction="down"
                duration={5000}
              ></Count>
            </text>
          </group>
          <separator data-horizontal=""></separator>
          <group>
            <group
              data-contain=""
              data-space="15"
              data-interactive=""
              data-cursor="pointer"
              data-radius="10"
              data-length="180"
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
      <group data-height="200" data-shrink="no"></group>
    </view>
  );
};
export default Miscellaneous;
