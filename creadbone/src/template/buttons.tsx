import React from "react";
import Button from './../components/button';
import { SvgHamburger, SvgHamburgerToLeft, SvgHamburgerToRight, SvgLoader, SvgLoaderCircle, SvgLoaderCircleSmall, SvgMinus, SvgPlus } from './../components/svg';

const Buttons: React.FC = () => {
  return (
  
    <view data-scroll="">
    <group data-direction="column" data-gap="15" data-space="30">
      <text
        data-weight="700"
        data-text-size="xxx-large"
        data-wrap="wrap"
        data-color="main"
      >
        Buttons
      </text>
      <text
        data-wrap="wrap"
        data-length="300"
        data-line="1.5"
        data-light=""
      >
        Buttons allow users to take actions, and make choices, with a
        single tap.
      </text>
    </group>

    <group data-direction="column" data-type="column">
      <group
        data-width="auto"
        data-direction="column"
        data-gap="10"
        data-space="20"
        data-background="main-background"
        data-align="start"
      >
        <group data-contain="" data-gap="1">
          <group data-border="" data-space="15">
            {" "}
            <Button primary text="Primary Button" />
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button secondary text="Secondary Button" />
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button accent text="Accent Button" icon="arrow_forward" />
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button
              outline
              text="Outline Button"
              textFirst={false}
              icon="search"
            />
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button
              highlight
              text="Highlighted"
              icon="folder"
              textFirst={true}
            ></Button>
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button text="Simple Button" />
          </group>
          <group data-border="" data-space="15">
            {" "}
            {/* <Link effect="material" to="" className="button">
              <text>Anchor Button</text>
            </Link> */}
          </group>
          {/* <Tooltip
            arrow={false}
            title={
              <group
                data-direction="column"
                data-gap="10"
                data-space="10"
              >
                <text data-weight="700">Responsive Button</text>
                <text data-wrap="wrap">
                  Icon or alternate text will appear, on small screens.
                </text>
              </group>
            }
          >
            <group data-border="" data-space="15">
              {" "}
              <Button icon="star" adaptive text="Responsive Button" />
            </group>
          </Tooltip> */}
        </group>
      </group>
      <group
        data-width="auto"
        data-direction="column"
        data-gap="10"
        data-space="20"
        data-background="main-background"
      >
        <group
          data-type="grid"
          data-grid-template="80"
          data-gap="1"
          data-contain=""
        >
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button primary mini rounded icon="home" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button accent mini rounded icon="navigate_next" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button outline mini rounded icon="search" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button outline mini large icon="arrow_outward" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button primary mini icon="search" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button accent mini icon="arrow_forward" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button highlight mini icon="nest_eco_leaf" />
          </group>
          <group
            data-align="center"
            data-justify="center"
            data-ratio="1:1"
            data-border=""
            data-space="10"
          >
            {" "}
            <Button micro icon="laundry" />
          </group>

            <group
              data-align="center"
              data-justify="center"
              data-ratio="1:1"
              data-border=""
              data-space="10"
            >
              {" "}
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
            {" "}
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
            {" "}
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
              </icon>{" "}
            </Button>
          </group>
          <group
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
          </group>
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
              {" "}
              <icon>
                {" "}
                <SvgHamburgerToLeft />{" "}
              </icon>{" "}
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
              <separator data-vertical="" data-height="40"></separator>{" "}
              <icon>
                {" "}
                <SvgHamburgerToRight />{" "}
              </icon>{" "}
            </Button>
          </group>
          <group data-border="" data-space="15">
            <Button
              fit
              outline
              large
              text="Please Wait"
              textFirst={false}
            >
              <icon >
               <SvgLoaderCircleSmall />
              </icon>
              <separator
                data-vertical=""
                data-height="40"
              ></separator>{" "}
            </Button>
          </group>
        </group>
      </group>
      <group
        data-width="auto"
        data-direction="column"
        data-gap="10"
        data-space="20"
        data-background="main-background"
        data-align="start"
      >
        <group data-contain="" data-gap="1">
          <group data-border="" data-space="15">
            {" "}
            <Button
              primary
              large
              icon="inventory_2"
              text="Large Button"
              textFirst={false}
            />{" "}
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button
              accent
              large
              icon="arrow_outward"
              text="Large Button"
            />
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button large text="Large Button" />{" "}
          </group>
          <group data-border="" data-space="15">
            {" "}
            <Button outline large text="Large Button" />{" "}
          </group>
          <group data-gap="10" data-border="" data-space="15">
            <Button highlight large text="Button" data-shrink="no" />
            <Button primary large fit text="Fit Button" />
          </group>

          <group data-border="" data-space="15">
            {" "}
            <Button outline fit large text="Large Button Wide" />
          </group>

          <group data-border="" data-space="15">
            {" "}
            <Button highlight large fit text="Large Button Wide" />{" "}
          </group>
        </group>
      </group>
    </group>
  </view>
  );
};
export default Buttons;
