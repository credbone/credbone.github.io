import React from "react";

import { SvgHamburgerToRight, SvgPlus } from "../components/svg";
import Switchable from "../components/Switchable";
import {
  Columns2,
  PanelsTopLeft,
  Proportions,
  RectangleHorizontal,
  Rows3,
} from "lucide-react";
import TemplatePageHeader from "./TemplatePageHeader";

const Layout: React.FC = () => {
  return (
    <group data-gap="30" data-space="30" data-border="no" data-align="start">



      <TemplatePageHeader
        title="Layout & Switches"
        description="Concerns the arrangement and organization of elements in a design,
          often utilizing grids."
        // version="1.0.2"
       //  type="Pattern"
        descriptionProps={{"data-length":"300"}}
      />

      <group
        data-height="300"
        data-direction="row"
        data-radius="15"
        data-border=""

        data-contain=""
      >
        <view data-direction="row">
          <group data-name="switch-gap" data-shrink="no"></group>
          <Switchable
            data-adaptive-float="10"
            defaultExpanded={false}
            data-type="overlap"
            icon={
              <>
                <SvgPlus />
              </>
            }
            title={"Switchable To The Left"}
            data-index="3"
          >
            <>
              <group
                data-align="center"
                data-justify="center"
                data-position="center"
                data-background="context"
                data-height="fit"
                data-direction="column"
                data-gap="30"
                data-space="30"
                data-wrap="no"
              >
                <icon data-opacity="20" data-icon-size="large">
                  <PanelsTopLeft size={60} />
                </icon>

                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                  data-length="400"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side.
                </text>
              </group>
            </>
          </Switchable>

          <group data-direction="column" data-align="start">
            <group data-scroll="" data-align="start" data-position="center">
              <group
                data-direction="column"
                data-gap="30"
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
              >
                <icon data-opacity="20" data-icon-size="large">
                  <Proportions size={60} />
                </icon>

                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                  data-max-length="300"
                >
              No extra manipulations are required to add or remove layout sections.
                </text>
              </group>
            </group>
          </group>
          <Switchable
          data-adaptive-float="10"
          //   closeOnOutsideClick={true}
          //     data-radius="10"
          data-type="adaptive"
          data-placement="right"
          icon={
            <>
              <SvgHamburgerToRight />
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
                  data-direction="column"
                  data-gap="30"
                  data-space="30"
                  data-align="center"
                  data-justify="center"
                >
                  <icon data-opacity="20" data-icon-size="large">
                    <RectangleHorizontal size={60} />
                  </icon>

                  <text
                    data-text-align="center"
                    data-light=""
                    data-wrap="wrap"
                    data-line="1.5"
                    data-max-length="300"
                  >
                    No extra manipulations are required to add or remove layout sections.
                  </text>
                </group>
              </group>
            </view>

            <Switchable
             // data-adaptive-float="10"
              defaultExpanded={false}
              data-type="overlap" 
              // data-elevation="1"
              data-switch-direction="horizontal"
              data-direction="column"
              icon={<Columns2 size={20} />}
              togglerProps={
                {
                  //    "data-background": "main",
                  //   "data-color": "main-text",
                  //   "data-ink-color": "main-dark",
                  //   "data-order": "2",
                }
              }
              title={"Switchable To The Top"}
            >
              <group data-position="center">
                <group
                  data-direction="column"
                  data-gap="30"
                  data-space="30"
                  data-align="center"
                  data-justify="center"
                >
                  <icon data-opacity="20" data-icon-size="large">
                    <Rows3 size={60} />
                  </icon>

                  <text
                    data-text-align="center"
                    data-light=""
                    data-wrap="wrap"
                    data-line="1.5"
                    data-max-length="300"
                  >
                    No extra manipulations are required to add or remove layout sections.
                  </text>
                </group>
              </group>
            </Switchable>
          </view>
        </Switchable>
        <group data-name="switch-gap" data-shrink="no"></group>
        </view>

      </group>

      <group

        //  data-width="auto"
        data-height="300"
        data-contain=""
        //  data-gap="20"
        //   data-border="no"
        data-radius="15"
        data-border=""
      >
        <view data-direction="row">

  


          <Switchable
            data-border="outline"
           // data-adaptive-float="10"
            defaultExpanded={false}
            icon={ <SvgPlus />}
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
                data-direction="column"
                data-gap="30"
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
                data-max-length="400"
              >
                <icon data-opacity="20" data-icon-size="large">
                  <Columns2 size={60} />
                </icon>

                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side.
                </text>
              </group>
            </>
          </Switchable>

          <Switchable
            data-border="outline"
         //   data-adaptive-float="10"
            defaultExpanded={false}
            icon={ <SvgPlus />}
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
                data-direction="column"
                data-gap="30"
                data-space="30"
                data-align="center"
                data-justify="center"
                data-position="center"
                data-max-length="400"
              >
                <icon data-opacity="20" data-icon-size="large">
                  <Columns2 size={60} />
                </icon>

                <text
                  data-text-align="center"
                  data-light=""
                  data-wrap="wrap"
                  data-line="1.5"
                >
                  This is an adaptive switchable section that will overlap the
                  neighboring section if there is not enough room to display
                  them side by side.
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
