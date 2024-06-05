import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../components/Ripple";
import { IconHome, IconSearch } from "../components/icon/credIcons";
import Scroll from "../components/scroll";

import sampleImage from "../styles/images/samples/res_16.jpg";
import sampleImage_2 from "../styles/images/samples/res_34.jpg";

const Components: React.FC = () => {
  return (
    <view data-scroll="">
      <group data-direction="column" data-space-vertical="30">
        <group data-width="auto">
          <group
            data-direction="column"
            data-gap="20"
            data-space-horizontal="30"
          >
            <text
              data-weight="700"
              data-text-size="64"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
              welcome
            </text>
            <text
              data-wrap="wrap"
              data-length="600"
              data-line="1.5"
              data-light=""
            >
              Components are interactive elements essential for creating a user
              interface. They can be grouped by their function into the
              following categories: action, containment, communication,
              navigation, selection, and text input.
            </text>
          </group>
        </group>

        <group
          data-scroll-mask="false"
          data-border="no"
          data-background="none"
          data-width="auto"
        >
          <Scroll>
            <group data-wrap="no" data-space="30" data-gap="15">
              <group
                data-radius="15"
                data-type="group"
                data-ink-color="main-dark"
                data-contain=""
                data-background="main"
                data-color="main-text"
                data-length="300"
                data-height="300"
              >
                <group
                  data-index="1"
                  data-direction="column"
                  data-gap="15"
                  data-space="30"
                  data-align="start"
                >
                  <text
                    data-text-size="xx-large"
                    data-weight="700"
                    data-wrap="wrap"
                  >
                    Color System
                  </text>
                  <text data-wrap="wrap" data-line="1.5">
                    Flexible theme customization, Color system can assist in
                    crafting a color palette...
                  </text>

                  {/* <Link data-type="group"  data-interactive=""  data-drag="none"  to="../Colors" data-position="bottom" >
               <group  data-index="1"  data-background="main-text" data-width="auto" data-space="10" data-space-horizontal="20" data-radius="5" data-color="main" data-weight="700"> <text>More ...</text></group>
               
               </Link> */}
                </group>
              </group>

              <group
                data-radius="15"
                data-elevation="1"
                data-background="context"
                data-length="350"
                data-height="300"
                data-contain=""
              >
                <picture data-position="absolute" data-brightness="adaptive">
                  <img src={sampleImage_2} alt="" />
                </picture>
                <group data-direction="column" data-gap="15" data-space="30">
                  <text
                    data-text-size="xx-large"
                    data-weight="700"
                    data-wrap="wrap"
                  >
                    Icons
                  </text>
                  <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                    Beautifully crafted and carefully designed icons.
                  </text>
                </group>
                <Link
                  data-interactive=""
                  to="/Home/Icons"
                  Data-type="group"
                  data-position="bottom"
                  data-space="30"
                  data-width="auto"
                  data-radius-top-right="15"
                  data-backdrop="10"
                  data-drag="none"
                >
                  <group data-type="interact"> <IconHome size={60} /></group>
                 
                </Link>
              </group>

              <group
                data-radius="15"
                data-background="main-dark"
                data-color="white"
                data-length="240"
                data-height="300"
                data-contain=""
              >
                <picture data-position="absolute" data-name="color-demo">
                  <img src={sampleImage} alt="" />
                </picture>

                <group
                  data-index="1"
                  data-direction="column"
                  data-gap="15"
                  data-space="30"
                >
                  <text
                    data-text-size="xx-large"
                    data-weight="700"
                    data-wrap="wrap"
                  >
                    Buttons
                  </text>
                  <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                    Allow users to take actions, and make choices, with a single
                    tap.
                  </text>
                </group>

                <Link data-type="group" to="/Home/Buttons" data-position="bottom" data-drag="none">
                  <Ripple>
                    <group
                      data-radius-top-right="15"
                      data-wrap="no"
                      data-width="auto"
                      data-ink-color="secondary-dark"
                      data-align="center"
                      data-cursor="pointer"
                      data-contain=""
                      data-background="secondary"
                      data-color="secondary-text"
                      data-interactive=""
                      data-space-horizontal="30"
                      //data-radius="15"
                      data-height="120"
                      data-gap="20"
                    >
                      <icon data-index="1" data-icon-size="large">
                        arrow_outward
                      </icon>
                    </group>
                  </Ripple>
                </Link>
              </group>

              <group
                data-radius="15"
                data-space="30"
                data-background="main"
                data-color="main-text"
                data-length="400"
                data-height="300"
              >

                <group data-direction="column" data-gap="15">
                  <text
                    data-text-size="xx-large"
                    data-weight="700"
                    data-wrap="wrap"
                  >
                    Checkbox & Switches
                  </text>
                  <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                    Beautifully crafted and carefully designed icons.
                  </text>
                </group>
              </group>
            </group>
          </Scroll>
        </group>
      </group>

      <group data-height="60" data-shrink="no"></group>
    </view>
  );
};
export default Components;
