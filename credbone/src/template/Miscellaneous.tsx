import React from "react";
import sampleImage from "../styles/images/samples/res_42.jpg";
import Marquee from "../components/Marquee";
import Count from "../components/Coutner";

const Miscellaneous: React.FC = () => {
  return (
    <view data-vertical="" data-adaptive="" data-align="start" data-scroll="">
      <group
        data-space="30"
        data-gap="15"
        data-jusitify="start"
        data-align="start"
      >
        <group
          data-max-length="400"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
          data-contain=""
        >
          <group data-direction="column" data-space="30" data-gap="10">
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
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
              <text data-weight="700">Marquee</text> component in this code is a React functional component that provides a marquee effect for its children elements, supporting both left-to-right (LTR) and right-to-left (RTL) directions
            </text>
          </group>

          <group
            data-background="main-dark"
            data-contain=""
            // data-dark=""
            data-align="center"
          >
            <picture data-position="absolute">
              <img src={sampleImage} alt="" />
            </picture>

            <group data-length="fit">
              <Marquee>
                <group data-space="40">
                  <text
                    data-text-size="x-large"
                    data-weight="700"
                    data-color="white"
                  >
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
          data-max-length="400"
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
              The Count component is a functional component that smoothly
              transitions a number from a starting value <text data-weight="700">from</text> to an ending
              value <text data-weight="700">to</text> over a set period of time <text data-weight="700">duration</text>. It also has an
              optional setting, direction, which can be either 'up' or 'down',
              with 'up' being the default.
            </text>
          </group>

          <group>
            <text data-text-size="xxx-large" data-weight="700">
              <Count from={128} to={256} duration={2000}></Count>
            </text>
          </group>
          <separator data-horizontal=""></separator>
          <group data-gap="10">
            <text data-text-size="xxx-large" data-weight="700">
              <Count
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
                from={512}
                to={128}
                direction="down"
                duration={5000}
              ></Count>
            </text>
          </group>
        </group>
      </group>
    </view>
  );
};
export default Miscellaneous;
