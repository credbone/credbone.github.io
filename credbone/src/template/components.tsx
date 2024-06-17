import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../components/Ripple";
import { IconHome, IconStar } from "../components/icon/credIcons";

import sampleImage from "../styles/images/samples/res_16.jpg";
import sampleImage_2 from "../styles/images/samples/res_34.jpg";
import sampleImage_3 from "../styles/images/samples/list_res/res-05.jpg";

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
              data-opacity="70"
            >
              This platform offers a remarkable collection of carefully crafted
              UI components, each designed with meticulous attention to detail
              and a deep understanding of contemporary UI patterns. here.
            </text>
          </group>
        </group>

        <group
          data-scroll-mask="false"
          data-border="no"
          data-background="none"
          //  data-width="auto"
          data-align="start"
        >
          <group
            data-width="auto"
            //  data-wrap="no"
            //  data-max-length="auto"
            data-space="30"
            data-gap="15"
            data-type="grid"
            data-grid-template="180"
            data-weight="600"
          >
            <Link
data-interactive=""
              data-width="auto"
              to="../Colors"
              data-type="group"
              data-radius="15"
              data-ink-color="main-dark"
              data-contain=""
              data-background="main"
              data-color="main-text"
              //data-length="200"
              data-height="360"
            >
              <group
                data-index="1"
                data-direction="column"
                data-gap="15"
                data-space="30"
                data-align="start"
              >
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                >
                  Color System
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="300">
                  Flexible theme customization, Color system can assist in
                  crafting a color palette...
                </text>
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              //  data-interactive=""
              to="/Home/Icons"
              data-radius="15"
              // data-elevation="1"
              data-background="context"
              //data-length="200"
              data-height="360"
              data-contain=""
              data-react="scale"
            >
              <picture
              
                data-position="absolute"
                data-brightness="adaptive"
                data-background="grey-light"
              >
                <img src={sampleImage_2} alt="" />
              </picture>
              <group data-direction="column" data-gap="15" data-space="30">
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                >
                  Icons
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>
              <group
                data-type="group"
                data-position="bottom"
                data-space="30"
                data-width="auto"
                data-radius-top-right="15"
                data-backdrop="10"
                data-drag="none"
                data-interactive=""
              >
                <group data-type="interact">
                  <IconHome size={60} />
                </group>
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              to="/Home/Buttons"
              data-radius="15"
              data-background="main-dark"
              data-color="white"
              //data-length="200"
              data-height="360"
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
                  data-text-size="x-large"
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

              <group data-position="bottom" data-drag="none">
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
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              // data-interactive=""
              to="/Home/CardsAndList"
              data-radius="15"
              // data-elevation="1"
              data-background="context"
              //  data-length="350"
              data-height="360"
              data-contain=""
              data-color="white"
               data-react="scale"
            >
              <picture
                data-position="absolute"
                data-brightness="adaptive"
                data-background="deep-orange"
              >
                <img src={sampleImage_3} alt="" />
              </picture>
              <group data-direction="column" data-gap="15" data-space="30">
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                >
                  Cards
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>
              <group
                data-type="group"
                data-position="bottom"
                data-space="30"
                data-width="auto"
                data-radius-top-right="15"
                data-backdrop="10"
                data-drag="none"
                data-interactive=""
              >
                <group data-type="interact">
                  <IconStar size={60} />
                </group>
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              to="/Home/CheckboxSwitchers"
              data-radius="15"
              data-contain=""
              data-background="main"
              data-color="main-text"
              //   data-length="400"
              data-height="360"
            >
              <group data-direction="column" data-gap="15" data-space="30">
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Checkbox & Switches
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>

              <group data-position="bottom" data-drag="none">
                <Ripple>
                  <group
                    data-radius-top-right="15"
                    data-wrap="no"
                    data-width="auto"
                    //data-ink-color="secondary-dark"
                    data-align="center"
                    data-cursor="pointer"
                    data-contain=""
                    // data-background="main-text"
                    //              data-color="main"
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
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              to="/Home/TooltipAndPopover"
              data-radius="15"
              data-contain=""
              data-elevation="1"
              //     data-background="main"
              //     data-color="main-text"
              //   data-length="400"
              data-height="360"
            >
              <group data-direction="column" data-gap="15" data-space="30">
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Tooltip & Popover
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>

              <group data-position="bottom" data-drag="none">
                <Ripple>
                  <group
                    data-radius-top-right="15"
                    data-wrap="no"
                    data-width="auto"
                    //data-ink-color="secondary-dark"
                    data-align="center"
                    data-cursor="pointer"
                    data-contain=""
                    // data-background="main-text"
                    //              data-color="main"
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
              </group>
            </Link>

            <Link
data-interactive=""
              data-width="auto"
              data-type="group"
              to="/Home/Navigation"
              data-radius="15"
              data-contain=""
              data-background="main"
              data-color="main-text"
              //   data-length="400"
              data-height="360"
            >
              <group data-direction="column" data-gap="15" data-space="30">
                <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Navigation & Tabs
                </text>
                <text data-wrap="wrap" data-line="1.5" data-max-length="200">
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>

              <group data-position="bottom" data-drag="none">
                <Ripple>
                  <group
                    data-radius-top-right="15"
                    data-wrap="no"
                    data-width="auto"
                    //data-ink-color="secondary-dark"
                    data-align="center"
                    data-cursor="pointer"
                    data-contain=""
                    // data-background="main-text"
                    //              data-color="main"
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
              </group>
            </Link>
          </group>
        </group>
      </group>

      <group data-height="200" data-width="auto" data-shrink="no"></group>
    </view>
  );
};
export default Components;
