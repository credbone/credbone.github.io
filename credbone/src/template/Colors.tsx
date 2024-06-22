import React from "react";

import sampleImage2 from "../styles/images/samples/res_16.jpg";

import samplevideo from "../styles/images/samples/res_23.mp4";
import Popover from "../components/popover";

import { BaseColors } from "./utils/colorData";

const Colors: React.FC = () => {
  return (
    <view
      data-space="30"
      data-gap="30"
      data-scroll=""
      id="inner-popover-container"
    >
      <group data-direction="column" data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
          data-ellipsis=""
        >
          Color System
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces.
        </text>
      </group>

      <group
        data-max-length="1200"
        data-shrink="no"
        data-contain=""
        data-width="auto"
        data-radius="20"
        data-gap="5"
      >
        <group
          data-radius="5"
          data-contain=""
          data-direction="column"
          data-min-height="240"
          data-width="auto"
          data-length="auto"
          data-color="main-text"
          data-space="30"
          data-background="main"
          data-gap="10"
          data-justify="end"
          data-align="start"
          data-wrap="no"
        >
          <text
            data-wrap="wrap"
            data-light=""
            data-max-length="300"
            data-line="20"
          >
            This primary color you selected will be used extensively in the UI,
            with other shades being automatically generated from it.
          </text>

          <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
            Primary Color
          </text>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="main-lighter"
        >
          <text data-weight="700">Lighter</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>
        <group
          data-radius="5"
          data-contain=""
          data-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="main-light"
        >
          <text data-weight="700">Light</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>
        <group
          data-radius="5"
          data-contain=""
          data-min-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="main-dark"
          data-color="white"
        >
          <text data-weight="700">Dark</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>
        <group
          data-radius="5"
          data-contain=""
          data-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="main-darker"
          data-color="white"
        >
          <text data-weight="700">Darker</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-width="auto"
          data-min-height="240"
          data-length="auto"
          data-background="main-dark"
        >
          {/* <picture data-position="absolute" data-name="color-demo"> <img src={sampleImage} alt="" /> </picture> */}
          <video
            data-name="color-demo"
            data-position="absolute"
            src={samplevideo}
            autoPlay
            muted
            loop
            playsInline
            data-object-fit="cover"
            data-height="fit"
            data-min-length="fit"
            data-max-length="fit"
          ></video>

          <group
            data-color="main-text-lighter-white"
            data-direction="column"
            data-space="30"
            data-gap="10"
            data-justify="end"
          >
            <text
              data-wrap="wrap"
              data-light=""
              data-max-length="200"
              data-line="20"
            >
              The generated color ensures that the text remains readable on the
              chosen color.
            </text>
            <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
              Text Color
            </text>
          </group>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="secondary-lighter"
        >
          <text data-weight="700">Seondary Lighter</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-min-eight="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="secondary-light"
        >
          <text data-weight="700">Seondary Light</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>
        <group
          data-radius="5"
          data-contain=""
          data-min-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="secondary-dark"
          data-color="white"
        >
          <text data-weight="700">Secondary Dark</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>
        <group
          data-radius="5"
          data-contain=""
          data-height="240"
          data-length="auto"
          data-shrink="no"
          data-direction="column"
          data-orientation="vertical-bottom"
          data-justify="start"
          data-width="auto"
          data-space="30"
          data-background="secondary-darker"
          data-color="white"
        >
          <text data-weight="700">Secondary Darker</text>
          <text data-ellipsis="" data-light="">
            Auto-generated shade
          </text>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-width="auto"
          data-min-height="240"
          data-length="auto"
          data-background="secondary-darker"
        >
          <picture data-position="absolute" data-name="color-demo">
            {" "}
            <img src={sampleImage2} alt="" />{" "}
          </picture>

          <group
            data-color="secondary-text-lighter-white"
            data-direction="column"
            data-space="30"
            data-gap="10"
            data-justify="end"
          >
            <text
              data-wrap="wrap"
              data-light=""
              data-max-length="200"
              data-line="20"
            >
              The generated color ensures that the text remains readable on the
              chosen color.
            </text>
            <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
              Text Color
            </text>
          </group>
        </group>

        <group
          data-radius="5"
          data-contain=""
          data-min-height="240"
          data-direction="column"
          data-width="auto"
          data-length="auto"
          data-color="secondary-text"
          data-space="30"
          data-background="secondary"
          data-gap="10"
          data-justify="end"
        >
          {" "}
          <text
            data-wrap="wrap"
            data-light=""
            data-max-length="300"
            data-line="20"
          >
            This Secondary color you selected will be used extensively in the
            UI, with other shades being automatically generated from it.
          </text>{" "}
          <text data-wrap="wrap" data-weight="700" data-text-size="x-large">
            Secondary Color
          </text>{" "}
        </group>
      </group>

      <group data-direction="column" data-gap="10">
        <text data-weight="700" data-text-size="xx-large" data-wrap="wrap">
          Base Colors
        </text>
        <text data-wrap="wrap" data-length="400" data-line="1.5" data-light="">
          A color system can assist in crafting a color palette that mirrors
          brand or personal style, while also considering features like dark
          mode compatibility for a seamless user experience across different
          interfaces.
        </text>
      </group>

      <group
        data-shrink="no"
        data-weight="600"
        data-max-length="1200"
        data-width="auto"
        data-type="grid"
        data-gap="10"
        data-grid-template="120"
      >
        {BaseColors.map((colors, index) => (
          <group
            key={index}
            data-contain=""
            // data-border=""
            data-radius="10"
            data-direction="column"
            data-border=""
          >
            <group data-wrap="no" data-direction="column">
              <group
                data-height="50"
                data-background={colors.value + "-dark"}
              ></group>
              <group data-height="50" data-background={colors.value}></group>
              <group
                data-height="50"
                data-background={colors.value + "-light"}
              ></group>
            </group>
            <group
              data-space="20"
              data-contain=""
              data-length="auto"
              data-shrink="no"
              data-direction="column"
              data-width="auto"
              data-background="context"
            >
              <group data-direction="column" data-gap="10">
                <text
                  data-ellipsis=""
                  data-wrap="wrap"
                  data-weight="700"
                  data-text-size="medium"
                >
                  {colors.name}
                </text>
                <text data-wrap="wrap" data-opacity="30" data-ellipsis="">
                  {colors.description}
                </text>
              </group>
            </group>
          </group>
        ))}
      </group>

      <group
        data-gap="20"
        data-align="start"
        data-weight="600"
        data-type="column"
        data-column-size="240"
        data-column-gap="20"
      ></group>
      <group data-height="10" data-shrink="no"></group>
    </view>
  );
};
export default Colors;
