import React from "react";
import Content from "./content";

import Marquee from "../components/Marquee";
import ContentSlide from "./contentSlide";
import { SvgHamburgerToRight } from "../components/svg";
import Switchable from "../components/Switchable";

const Layout: React.FC = () => {
  return (
    <view data-vertical="" data-space="20">
      <view
        data-direction="row"
        //  data-gap="20"
        //   data-border="no"
        data-radius="10"
      >
        <Switchable
       //   data-float="15"
          //  data-radius="10"
          defaultExpanded={false}
          icon={
            <icon data-fill="fill" data-color="amber">
              folder
            </icon>
          }
          title={"Adaptive Switchable To The Left"}
          //    togglerProps={{ "data-order": "2" }}
          data-type="overlap"
          data-length="300"
          closeOnOutsideClick={true}
          data-elevation="1"
          data-index="3"
        >
          <>
            <group data-space="30" data-align="center" data-justify="center">
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
                neighboring section if there is not enough room to display them
                side by side. You can resize the browser window to see it in
                action. This is a configurable option...
              </text>
            </group>

            <group data-type="grid" data-gap="10" data-space="20">
              <Content></Content>
            </group>
          </>
        </Switchable>

        <view
          data-name="switchable"
          data-direction="column"
          data-align="start"
          // data-radius="10"
        >
          <view data-scroll="" data-align="start">
            <group data-space="15" data-sticky="top" data-width="auto">
              <group
                data-align="center"
                data-gap="5"
                data-elevation="1"
                data-index="2"
                data-backdrop="10"
                data-wrap="no"
                data-radius="5"
              >
                <Marquee data-space="10">
                  <group data-wrap="no" data-align="center" data-gap="10">
                    <icon data-length="30">transition_slide</icon>
                    <text>
                      This extensive text is intended as a showcase of the
                      marquee effect, wherein, upon mouse hover, the text will
                      smoothly scroll horizontally if the available display area
                      is limited.
                    </text>
                  </group>
                </Marquee>
              </group>
            </group>
            <group data-space="20" data-align="center" data-justify="center">
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

            <ContentSlide></ContentSlide>

            <group data-type="grid" data-gap="10" data-space="20">
              <Content></Content>
            </group>
            <space data-height="60"></space>
          </view>
        </view>

        <Switchable
       //   closeOnOutsideClick={true}
          //     data-radius="10"
          data-type="adaptive"
          data-placement="right"
          icon={
            <>
              <SvgHamburgerToRight />
            </>
          }
          data-elevation="1"
          defaultExpanded={false}
          togglerProps={{
            "data-background": "main",
            "data-color": "main-text",
          }}
          // collapseThreshold={800}
          // data-length='500'
          title={"Switchable To The Right"}
        >
          <view>
            <view data-scroll="">
              <group data-direction="column" data-gap="10" data-space="20">
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

                <group data-type="grid" data-gap="10" data-grid-template="200">
                  <Content></Content>
                </group>
              </group>
            </view>

            <Switchable
             // data-float="15"
              defaultExpanded={false}
              data-type="overlap"
              data-elevation="1"
              data-switch-direction="horizontal"
              icon="shopping_basket"
              togglerProps={{
                "data-background": "main",
                "data-color": "main-text",
                "data-ink-color": "main-dark",
                "data-order": "2",
              }}
              title={"Switchable To The Bottom"}
            >
              <group>
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
                <group data-type="grid" data-gap="10" data-space="20">
                  <Content></Content>
                </group>
              </group>
            </Switchable>
          </view>
        </Switchable>
        <group data-name="switch-gap" data-shrink="no"></group>
      </view>
    </view>
  );
};
export default Layout;
