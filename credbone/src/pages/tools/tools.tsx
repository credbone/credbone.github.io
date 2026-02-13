import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../../components/Ripple";


import section_image from "../../styles/images/samples/wide_res_67.webp";
import { links } from "./toolData";

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

        <group data-direction="column">
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
                    data-length="300"


                  >
                 Built with the system's own resources, to meet various UI and design needs.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group
          data-space="adaptive-30-50"
          data-gap="20"
          data-direction="column"
          data-align="start"
          // data-background="adaptive-gray"
          // data-radius="50"
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
            data-text-size="medium-small"
          >
            A set of tools to enhance design and code workflows, for developers
            and designers.
          </text>
        </group>



        <group data-type="grid" data-grid-template="140/120" data-gap="15" >
          {links.map((link, index) => (
            <Link
              key={index}
              data-type="group"
              data-contain=""
              data-drag="none"
              to={link.url}
              data-interactive=""
              data-over-color="none"
              data-gap="10"
              data-direction="column"
              data-wrap="no"
              data-justify="start"
            >
              <Ripple>
                <group
                  data-interact=""
                  data-space="30"
                  data-background="adaptive-gray"
                  data-radius="30"
                  data-contain=""
                  data-react="background"
                  data-direction="column"
                >
                  {link.new === "true" && (
                    <group
                      data-background="red"
                      data-space="5"
                      data-position="absolute"
                      data-width="auto"
                      data-radius="5"
                      data-left="20"
                      data-top="20"
                    ></group>
                  )}

                  <group
                    data-interact=""
                    data-ratio="1:1"
                    data-justify="center"
                  >
                    {link.content}
                  </group>
                </group>
              </Ripple>
              <group data-gap="5" data-space="20" data-wrap="no" data-direction="column">
                <text data-weight="700" data-wrap="preline" data-text-size="medium" data-ellipsis="" data-font-type="hero" data-line="1">
                  {link.title}
                </text>
                <text data-wrap="wrap" data-line="1.5" data-opacity="40" data-length="110">
                  {link.description}
                </text>
              </group>
            </Link>
          ))}
        </group>
      </group>

      <group data-height="300" data-shrink="no"></group>
    </group>
  );
}

export default Tools;
