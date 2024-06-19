import React from "react";
import Button from "./../components/button";
import sampleImage from "../styles/images/samples/res_41.jpg";

import {
  SvgHamburger,
  SvgHamburgerToLeft,
  SvgHamburgerToRight,
  SvgLoader,
  SvgLoaderCircle,
  SvgMinus,
  SvgPlus,
} from "./../components/svg";
import Ripple from "../components/Ripple";


const Buttons: React.FC = () => {

 

  return (
    <view
      data-vertical=""
      data-adaptive=""
      data-space="30"
      data-gap="15"
      data-align="start"
    >
      <view
        data-size="medium"
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
            Buttons
          </text>
          <text
            data-wrap="wrap"
            data-length="300"
            data-line="1.5"
            data-light=""
          >
            Buttons allow users to take actions, and make choices, with a single
            tap.
          </text>
        </group>

        <group
          data-background="main-dark"
          data-contain=""
          // data-dark=""
          data-align="center"
        >
          <picture data-position="absolute" >
            <img src={sampleImage} alt="" />
          </picture>

          <group data-length="fit" data-space="40">
            <Ripple>
              <group
                data-wrap="no"
                data-width="auto"
                data-ink-color="main-dark"
                data-align="center"
                data-cursor="pointer"
                data-contain=""
                data-background="main"
                data-color="main-text"
                data-interactive=""
                data-space-horizontal="30"
                data-radius="15"
                data-height="120"
                data-gap="20"

              >
                <icon  data-icon-size="large">
                  arrow_outward
                </icon>
                {/* <text
                  data-ellipsis=""
                  data-weight="700"
                  data-text-size="36"
                  data-index="1"
                >
                  Button
                </text> */}
              </group>
            </Ripple>
          </group>
        </group>
      </view>

      <view
        data-size="small"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
      >
        <group data-scroll="" data-gap="1">
          <group data-border="" data-space="20">
            <Button primary text="Primary Button" />
          </group>
          <group data-border="" data-space="20">
            <Button secondary text="Secondary Button" />
          </group>
          <group data-border="" data-space="20">
            <Button accent text="Accent Button" />
          </group>
          <group data-border="" data-space="20">
            <Button
              outline
              text="Outline Button"
              textFirst={false}
             
            />
          </group>
          <group data-border="" data-space="20">
            <Button
              highlight
              text="Highlighted"
 
            ></Button>
          </group>
          <group data-border="" data-space="20">
            <Button text="Simple Button" />
          </group>
        </group>
      </view>
      <view
        data-size="small"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
      >
        <group data-scroll="">
          <group
            data-type="grid"
            data-grid-template="80"
            data-gap="1"
            data-contain=""
            data-border=""
          >
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button primary mini rounded icon="home" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button accent mini rounded icon="navigate_next" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button outline mini rounded icon="search" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button outline mini large icon="arrow_outward" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button primary mini icon="search" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button accent mini icon="arrow_forward" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button highlight mini icon="nest_eco_leaf" />
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button micro icon="laundry" />
            </group>

            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button mini rounded toggleClassName="open" material>
                <icon>
                  <SvgHamburger />
                </icon>
              </Button>
            </group>

            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button mini rounded toggleClassName="open" material>
                <icon>
                  <SvgPlus />
                </icon>
              </Button>
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button mini rounded toggleClassName="open" material>
                <icon>
                  <SvgMinus />
                </icon>
              </Button>
            </group>
            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button outline mini large>
                <icon>
                  <SvgLoader />
                </icon>
              </Button>
            </group>
            {/* <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              <Button rounded primary large mini>
                <icon>
                  <SvgLoaderCircle />
                </icon>
              </Button>
            </group> */}
          </group>

          <group data-contain="" data-gap="1">
            <group data-border="" data-space="15" data-gap="10">
              <Button
                fit
                outline
                large
                toggleClassName="open"
                material
                text="Arrow Left"
                textFirst={false}
              >
                <icon>
                  <SvgHamburgerToLeft />
                </icon>
                <separator data-vertical="" data-height="40"></separator>
              </Button>
              <Button
                outline
                large
                toggleClassName="open"
                material
                text="Menu"
                data-shrink="no"
                textFirst={true}
              >
                <separator data-vertical="" data-height="40"></separator>
                <icon>
                  <SvgHamburgerToRight />
                </icon>
              </Button>
            </group>
            <group data-border="" data-space="15">
              <Button fit secondary large text="Please Wait" textFirst={false}>
                <icon>
                  <SvgLoaderCircle />
                </icon>
                <separator data-vertical="" data-height="40"></separator>
              </Button>
            </group>
          </group>
        </group>
      </view>
      <view
        data-size="small"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
      >
        <group data-scroll="" data-gap="1">
          <group data-border="" data-space="15">
            <Button
              secondary
              large
            //  icon="drafts"
              text="Large Button"
              textFirst={false}
            />
          </group>
          <group data-border="" data-space="15">
            <Button
              accent
              large
              icon="arrow_outward"
              text="Sample Large Button"
              textFirst={true}
            />
          </group>
          <group data-border="" data-space="15">
            <Button large text="Large Button" />
          </group>
          <group data-border="" data-space="15">
            <Button outline large>
              <text>Large Button</text>
              <separator data-vertical="" data-height="40"></separator>
              <icon>shopping_bag</icon>
            </Button>
          </group>
          <group data-gap="10" data-border="" data-space="15">
            <Button highlight large text="Button" data-shrink="no" />
            <Button primary large fit text="Fit Button" />
          </group>

          <group data-border="" data-space="15">
            <Button outline fit large text="Large Button Wide" />
          </group>

          <group data-border="" data-space="15">
            <Button highlight large fit text="Large Button Wide" />
          </group>
        </group>
      </view>
    </view>
  );
};
export default Buttons;
