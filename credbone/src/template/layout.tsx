import React from "react";

import { SvgHamburger } from "../components/svg";
import Switchable from "../components/Switchable";

const Layout: React.FC = () => {
  return (
    <group data-gap="15" data-space="30" data-border="no" data-align="start">
      <view
        data-height="400"
        data-direction="row"
        //  data-gap="20"
        //   data-border="no"
        data-radius="10"
        data-max-length="800"
        data-elevation="1"
      >
        <view data-direction="row">
          <group data-name="switch-gap" data-shrink="no"></group>
          <Switchable
            data-adaptive-float="15"
            defaultExpanded={false}
            data-type="overlap"
            icon={
              <icon data-fill="fill" data-color="amber">
                folder
              </icon>
            }
            title={"Switchable To The Left"}
            togglerProps={{ "data-order": "2" }}
            //  data-type="overlap"
            //     data-length="400"
            closeOnOutsideClick={true}
            data-index="3"
          >
            <>
              <group
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
              >
                <space></space>
                <icon data-opacity="20" data-icon-size="large">
                  dock_to_left
                </icon>
                <space></space>
                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side. You can resize the browser window to see it
                  in action. This is a configurable option...
                </text>
              </group>
            </>
          </Switchable>

          <group data-direction="column" data-align="start">
            <group data-scroll="" data-align="start" data-position="center">
              <group
                data-space="20"
                data-align="center"
                data-justify="center"
                data-position="center"
              >
                <space></space>
                <icon data-opacity="20" data-icon-size="large">
                  responsive_layout
                </icon>

                <space></space>
                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                  data-max-length="300"
                >
                  No additional manipulations are needed for the DOM to add ord
                  remove layout sections.
                </text>
                <space></space>
              </group>
            </group>
          </group>
        </view>
        <Switchable
          data-adaptive-float="15"
          //   closeOnOutsideClick={true}
          //     data-radius="10"
          data-type="adaptive"
          data-placement="right"
          icon={
            <>
              <SvgHamburger />
            </>
          }
          defaultExpanded={false}
          title={"Switchable To The Right"}
        >
          <view>
            <view data-scroll="">
              <group
                data-direction="column"
                data-gap="10"
                data-space="20"
                data-position="center"
              >
                <group
                  data-space="20"
                  data-align="center"
                  data-justify="center"
                >
                  <space></space>
                  <icon data-opacity="20" data-icon-size="large">
                    view_week
                  </icon>
                  <space></space>
                  <text
                    data-text-align="center"
                    data-light=""
                    data-wrap="wrap"
                    data-line="1.5"
                    data-max-length="300"
                  >
                    No additional manipulations are needed for the DOM to add
                    ord remove layout sections.
                  </text>
                  <space></space>
                </group>
              </group>
            </view>

            <Switchable
              data-adaptive-float="15"
              defaultExpanded={false}
              data-type="overlap"
              // data-elevation="1"
              data-switch-direction="horizontal"
              data-direction="column"
              icon="folder"
              togglerProps={
                {
                  //    "data-background": "main",
                  //   "data-color": "main-text",
                  //   "data-ink-color": "main-dark",
                  //   "data-order": "2",
                }
              }
              title={"Switchable To The Bottom"}
            >
              <group data-position="center">
                <group
                  data-space="20"
                  data-align="center"
                  data-justify="center"
                >
                  <space></space>
                  <icon data-opacity="20" data-icon-size="large">
                    view_stream
                  </icon>
                  <space></space>

                  <text
                    data-text-align="center"
                    data-light=""
                    data-wrap="wrap"
                    data-line="1.5"
                    data-max-length="300"
                  >
                    No additional manipulations are needed for the DOM to add
                    ord remove layout sections.
                  </text>
                  <space></space>
                </group>
              </group>
            </Switchable>
          </view>
        </Switchable>
        <group data-name="switch-gap" data-shrink="no"></group>
      </view>

      <group
        data-width="auto"
        data-height="400"
        data-contain=""
        //  data-gap="20"
        //   data-border="no"
        data-radius="10"
        data-elevation="1"
      >
        <view data-direction="row" data-max-length="600">
          <Switchable
            data-border="outline"
            data-adaptive-float="15"
            defaultExpanded={false}
            icon="potted_plant"
            title={"Switchable To The Left"}
            //  data-type="overlap"
            //     data-length="400"
            closeOnOutsideClick={true}
            data-index="3"
            togglerProps={{
              "data-background": "main",
              "data-color": "main-text",
            }}
          >
            <>
              <group
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
              >
                <space></space>
                <icon data-opacity="20" data-icon-size="large">
                  dock_to_left
                </icon>
                <space></space>
                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side. You can resize the browser window to see it
                  in action. This is a configurable option...
                </text>
              </group>
            </>
          </Switchable>

          <Switchable
            data-border="outline"
            data-adaptive-float="15"
            defaultExpanded={false}
            icon="ac_unit"
            title={"Adaptive Switchable To The Left"}
            // data-type="overlap"
            //   data-length="400"
            closeOnOutsideClick={true}
            data-index="3"
            togglerProps={{
              "data-background": "main-dark",
              "data-color": "white",
            }}
          >
            <>
              <group
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
                data-max-length="400"
              >
                <space></space>
                <icon data-opacity="20" data-icon-size="large">
                  dock_to_left
                </icon>
                <space></space>
                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side. You can resize the browser window to see it
                  in action. This is a configurable option...
                </text>
              </group>
            </>
          </Switchable>

          <Switchable
            data-border="outline"
            data-adaptive-float="15"
            defaultExpanded={false}
            icon="light"
            title={"Adaptive Switchable To The Left"}
            // data-type="overlap"
            //   data-length="400"
            closeOnOutsideClick={true}
            data-index="3"
            togglerProps={{
              "data-background": "main-darker",
              "data-color": "white",
            }}
          >
            <>
              <group
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
                data-max-length="400"
              >
                <space></space>
                <icon data-opacity="20" data-icon-size="large">
                  dock_to_left
                </icon>
                <space></space>
                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side. You can resize the browser window to see it
                  in action. This is a configurable option...
                </text>
              </group>
            </>
          </Switchable>
        </view>
      </group>
    </group>
  );
};
export default Layout;
