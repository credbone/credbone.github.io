import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../../components/Ripple";
import DotDisplay from "../../template/dotDisplay";
import { arrow } from "./dotIcon";

import section_image from "../../styles/images/samples/wide_res_83.webp";

function Tools() {
  return (
    <group
      data-space="adaptive-30-50"
      data-direction="column"
      data-scroll=""
      data-wrap="no"
    >
      <group
        data-gap="30"
        data-wrap="no"
        data-direction="column"
        data-max-length="1200"
      >
        <group
          data-space="adaptive-30-50"
          data-gap="20"
          data-direction="column"
          data-align="start"
        >
          <text
            data-wrap="wrap"
            data-font-type="hero"
            data-ellipsis=""
            data-line="1"
            data-text-size="48"
            data-text-clamp="48"
            data-max-length="800"
          >
            Tools & Resources
          </text>

          <text
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
            data-opacity="70"
            data-text-size="15"
          >
            A set of tools to enhance design and code workflows—ideal for
            developers and designers.
          </text>
        </group>

        {/* <group data-direction="column">
          <picture
            data-radius="50"
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"
          >
            <img src={section_image} alt="" />
          </picture>

          <group data-direction="column" data-space="30" data-align="start">
            <group
              data-space="30"
              data-position="bottom"
              data-backdrop="20-adaptive"
              data-width="auto"
              data-radius="20"
            >
              <group data-gap="30">
                <group
                  data-width="auto"
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                >
                  <text
                    data-wrap="wrap"
                    data-line="1.5"
                    data-length="400"
                    data-text-size="15"
                  >
                    Let's connect! Whether you're curious about my work, looking
                    to collaborate, or simply want to reach out, feel free to
                    explore or drop a message.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group> */}

        <group data-type="grid" data-grid-template="180">
          <Link
            data-type="group"
            data-contain=""
            data-drag="none"
            to="DotIconMaker"
            data-interactive=""
            data-over-color="none"
            data-gap="10"
          >
            <Ripple>
              <group
                data-interact=""
                data-space="50"
                data-background="adaptive-gray"
                data-radius="30"
                data-contain=""
                data-react="background"
              >
                <group data-interact="">
                  <DotDisplay size={180} activeIndexes={arrow} />
                </group>
              </group>
            </Ripple>
            <group data-gap="20" data-space="15" data-position="bottom">
              <text data-weight="700" data-text-size="medium">
                Dot Icon Maker
              </text>
              <text data-wrap="wrap" data-line="1.3">
                A simple tool for creating, editing, and exporting 16x16 dotted
                icons.
              </text>
            </group>
          </Link>
        </group>
      </group>

      <group data-height="300" data-shrink="no"></group>
    </group>
  );
}

export default Tools;
