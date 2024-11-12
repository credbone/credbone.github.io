import React from "react";
import Button from "./../components/button";


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
    <group data-space="30" data-gap="30" data-align="start">
      <group data-direction="column"  data-gap="10">
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
          data-ellipsis=""
        >
          Buttons
        </text>
        <text data-wrap="wrap" data-length="300" data-line="1.5" data-light="">
          Buttons allow users to take actions, and make choices, with a single
          tap.
        </text>
      </group>

      <group
      
        data-gap="15"
        data-align="start"
        data-type="column"
        data-column-gap="15"
      >


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
          data-space="30"
                  data-radius="15"

                  data-gap="20"
                >

                  <icon data-icon-size="x-large" data-icon-weight="700" data-cast-shadow="1">arrow_outward</icon>
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


        <group
          data-size="small"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
        >
          <group data-scroll="" data-gap="1">
            <group data-border="" data-space="20">
              {" "}
              <Button large primary text="Primary Button" />{" "}
            </group>
            <group data-border="" data-space="20">
              {" "}
              <Button large secondary text="Secondary Button" />{" "}
            </group>
            <group data-border="" data-space="20">
              {" "}
              <Button large accent text="Accent Button" />{" "}
            </group>
            <group data-border="" data-space="20">
              {" "}
              <Button
                large
                outline
                text="Outline Button"
                textFirst={false}
              />{" "}
            </group>
            <group data-border="" data-space="20">
              {" "}
              <Button large highlight text="Highlighted"></Button>{" "}
            </group>
            <group data-border="" data-space="20">
              {" "}
              <Button large text="Simple Button" />{" "}
            </group>
          </group>
        </group>
        <group
          data-size="small"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
        >
          <group data-scroll="">
            <group
              data-type="grid"
              data-grid-template="100"
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


          </group>
        </group>

<group

data-size="small"
data-height="auto"
data-max-height="fit"
data-radius="10"
data-elevation="1"

>

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
                <Button
                  fit
                  secondary
                  large
                  text="Please Wait"
                  textFirst={false}
                >
                  <icon>
                    <SvgLoaderCircle />
                  </icon>
                  <separator data-vertical="" data-height="40"></separator>
                </Button>
              </group>
            </group>

</group>


        <group
          data-size="small"
          data-height="auto"
          data-max-height="fit"
          data-radius="10"
          data-elevation="1"
        >
          <group data-scroll="" data-gap="1">
            <group data-border="" data-space="20">
              <Button
                secondary
                large
                //  icon="drafts"
                text="Large Button"
                textFirst={false}
              />
            </group>
            <group data-border="" data-space="20">
              <Button
                accent
                large
                icon="arrow_outward"
                text="Sample Large Button"
                textFirst={true}
              />
            </group>
            <group data-border="" data-space="20">
              <Button large text="Large Button" />
            </group>
            <group data-border="" data-space="20">
              <Button outline large>
                <text>Large Button</text>
                <separator data-vertical="" data-height="40"></separator>
                <icon>shopping_bag</icon>
              </Button>
            </group>
            <group data-gap="10" data-border="" data-space="20">
              <Button highlight large text="Button" data-shrink="no" />
              <Button primary large fit text="Fit Button" />
            </group>

            <group data-border="" data-space="20">
              <Button outline fit large text="Large Button Wide" />
            </group>

            <group data-border="" data-space="20">
              <Button highlight large fit text="Large Button Wide" />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Buttons;
