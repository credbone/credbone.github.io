import React from 'react';
import logo from './logo.svg';
import Marquee from './components/Marquee';
import Button from './components/button';
import { SvgHamburger, SvgHamburgerToLeft, SvgHamburgerToRight, SvgLoader, SvgLoaderCircle, SvgLoaderCircleSmall, SvgMinus, SvgPlus } from './components/svg';


function App() {
  return (
    <view data-scroll="" data-adaptive=""  >

<view data-gap="20">
<group data-type="group"   data-space="20" data-background="highlight" data-radius="20" data-interactive="" data-cursor="pointer">

<group data-type="interact">
  <svg xmlns="http://www.w3.org/2000/svg" width="194.31" height="65.407" viewBox="0 0 194.31 65.407">

    <path d="M1589.04,124.035a5.822,5.822,0,0,1-2.04,2.407,5.635,5.635,0,0,1-3.13.833,5.494,5.494,0,0,1-2.21-.45,5.717,5.717,0,0,1-1.82-1.26,5.851,5.851,0,0,1-1.24-1.98,7.794,7.794,0,0,1,0-5.22,5.851,5.851,0,0,1,1.24-1.98,5.717,5.717,0,0,1,1.82-1.26,5.494,5.494,0,0,1,2.21-.45,5.309,5.309,0,0,1,2.99.787,5.773,5.773,0,0,1,1.96,2.318l5.4-2.25a10.4,10.4,0,0,0-3.83-4.545,11.256,11.256,0,0,0-6.43-1.755,12.237,12.237,0,0,0-4.7.877,10.9,10.9,0,0,0-6.12,6.143,12.343,12.343,0,0,0-.88,4.725,12.169,12.169,0,0,0,.88,4.7,11.22,11.22,0,0,0,2.43,3.713,10.862,10.862,0,0,0,3.69,2.452,12.237,12.237,0,0,0,4.7.878,11.161,11.161,0,0,0,6.46-1.778,12.322,12.322,0,0,0,4.02-4.567Zm8.78,7.965h5.9V121.143a7.793,7.793,0,0,1,.38-2.51,6.122,6.122,0,0,1,1.08-2.013,4.82,4.82,0,0,1,1.69-1.335,4.988,4.988,0,0,1,2.2-.475,7.033,7.033,0,0,1,1.6.157,5.726,5.726,0,0,1,1.19.428l1.58-5.265a5.178,5.178,0,0,0-1.42-.65,7.051,7.051,0,0,0-2-.25,6.332,6.332,0,0,0-1.92.309,8.711,8.711,0,0,0-1.8.81,7.944,7.944,0,0,0-1.5,1.176,5.7,5.7,0,0,0-1.08,1.485h-0.36v-3.06h-5.54V132Zm32.94-7.74a6.764,6.764,0,0,1-2.09,2.317,5.735,5.735,0,0,1-3.35.923,7.059,7.059,0,0,1-2.03-.293,5.33,5.33,0,0,1-1.82-.945,5.611,5.611,0,0,1-1.4-1.62,6.283,6.283,0,0,1-.74-2.317h16.61a2.545,2.545,0,0,1,.04-0.5,2.244,2.244,0,0,1,.05-0.5V120.8a14.432,14.432,0,0,0-.72-4.59,10.625,10.625,0,0,0-2.12-3.668,9.707,9.707,0,0,0-3.46-2.43,12.035,12.035,0,0,0-4.73-.877,11.049,11.049,0,0,0-4.61.945,11.366,11.366,0,0,0-3.62,2.542,11.564,11.564,0,0,0-2.39,3.735,12.066,12.066,0,0,0-.85,4.523,12.354,12.354,0,0,0,.87,4.7,11.156,11.156,0,0,0,6.17,6.165,12.105,12.105,0,0,0,4.66.878,11.478,11.478,0,0,0,6.32-1.665,12.405,12.405,0,0,0,4.12-4.365Zm-11.11-6.12a5.639,5.639,0,0,1,2.02-3.015,5.4,5.4,0,0,1,3.33-1.08,6.018,6.018,0,0,1,2.32.405,5.3,5.3,0,0,1,1.62,1.035,4.78,4.78,0,0,1,.99,1.35,3.922,3.922,0,0,1,.38,1.305h-10.66Zm36.8,13.86h5.54V99.78h-5.9v9.675l0.36,3.15h-0.36a6.69,6.69,0,0,0-2.52-2.385,8.326,8.326,0,0,0-4.23-.99,9.5,9.5,0,0,0-4.02.877,10.789,10.789,0,0,0-3.38,2.43,11.635,11.635,0,0,0-2.32,3.713,13.558,13.558,0,0,0,0,9.45,11.63,11.63,0,0,0,2.32,3.712,10.789,10.789,0,0,0,3.38,2.43,9.5,9.5,0,0,0,4.02.878,8.337,8.337,0,0,0,4.23-.99,6.69,6.69,0,0,0,2.52-2.385h0.36V132Zm-8.12-5.175a5.93,5.93,0,0,1-1.87-1.26,6.14,6.14,0,0,1-1.3-1.98,7.062,7.062,0,0,1,0-5.22,6.14,6.14,0,0,1,1.3-1.98,5.93,5.93,0,0,1,1.87-1.26,5.66,5.66,0,0,1,2.23-.45,5.938,5.938,0,0,1,2.23.427,5.6,5.6,0,0,1,1.86,1.238,6.162,6.162,0,0,1,1.31,1.98,7.438,7.438,0,0,1,0,5.31,6.162,6.162,0,0,1-1.31,1.98,5.568,5.568,0,0,1-1.86,1.237,5.9,5.9,0,0,1-2.23.428A5.66,5.66,0,0,1,1648.33,126.825Zm18.7,5.175h5.53v-2.655h0.36a6.69,6.69,0,0,0,2.52,2.385,8.337,8.337,0,0,0,4.23.99,9.542,9.542,0,0,0,4.03-.878,10.789,10.789,0,0,0,3.38-2.43,11.608,11.608,0,0,0,2.31-3.712,13.41,13.41,0,0,0,0-9.45,11.612,11.612,0,0,0-2.31-3.713,10.789,10.789,0,0,0-3.38-2.43,9.541,9.541,0,0,0-4.03-.877,8.326,8.326,0,0,0-4.23.99,6.69,6.69,0,0,0-2.52,2.385h-0.36l0.36-3.15V99.78h-5.89V132Zm9.2-5.153a5.609,5.609,0,0,1-1.87-1.237,6.14,6.14,0,0,1-1.3-1.98,7.3,7.3,0,0,1,0-5.31,6.14,6.14,0,0,1,1.3-1.98,5.642,5.642,0,0,1,1.87-1.238,5.938,5.938,0,0,1,2.23-.427,5.66,5.66,0,0,1,2.23.45,5.887,5.887,0,0,1,1.86,1.26,6.162,6.162,0,0,1,1.31,1.98,7.2,7.2,0,0,1,0,5.22,6.162,6.162,0,0,1-1.31,1.98,5.887,5.887,0,0,1-1.86,1.26,5.66,5.66,0,0,1-2.23.45A5.9,5.9,0,0,1,1676.23,126.847Zm23.54-16.74a10.9,10.9,0,0,0-6.12,6.143,13.125,13.125,0,0,0,0,9.45,10.906,10.906,0,0,0,6.12,6.142,13.019,13.019,0,0,0,9.4,0,10.906,10.906,0,0,0,6.12-6.142,13.125,13.125,0,0,0,0-9.45,10.9,10.9,0,0,0-6.12-6.143A13.033,13.033,0,0,0,1699.77,110.107Zm2.49,16.74a5.588,5.588,0,0,1-1.84-1.237,5.786,5.786,0,0,1-1.28-1.98,7.583,7.583,0,0,1,0-5.31,5.786,5.786,0,0,1,1.28-1.98,5.622,5.622,0,0,1,1.84-1.238,5.855,5.855,0,0,1,4.39,0,5.543,5.543,0,0,1,1.87,1.238,5.786,5.786,0,0,1,1.28,1.98,7.734,7.734,0,0,1,0,5.31,5.786,5.786,0,0,1-1.28,1.98,5.51,5.51,0,0,1-1.87,1.237A5.842,5.842,0,0,1,1702.26,126.847Zm22.77-16.9h-5.53V132h5.89V121.2a9.5,9.5,0,0,1,.34-2.543,6.529,6.529,0,0,1,.99-2.07,5.02,5.02,0,0,1,1.58-1.4,4.263,4.263,0,0,1,2.13-.517,4.009,4.009,0,0,1,3.09,1.147,5.1,5.1,0,0,1,1.05,3.533V132h5.9V118.635a13.247,13.247,0,0,0-.52-3.848,8.3,8.3,0,0,0-1.53-2.97,6.657,6.657,0,0,0-2.59-1.912,9.162,9.162,0,0,0-3.64-.675,8.188,8.188,0,0,0-4.01.967,7.481,7.481,0,0,0-2.79,2.633h-0.36v-2.88Zm36.27,14.31a6.665,6.665,0,0,1-2.09,2.317,5.714,5.714,0,0,1-3.35.923,7.109,7.109,0,0,1-2.03-.293,5.422,5.422,0,0,1-1.82-.945,5.58,5.58,0,0,1-1.39-1.62,6.107,6.107,0,0,1-.75-2.317h16.61a2.545,2.545,0,0,1,.04-0.5,3.072,3.072,0,0,1,.05-0.5V120.8a14.157,14.157,0,0,0-.72-4.59,10.469,10.469,0,0,0-2.12-3.668,9.62,9.62,0,0,0-3.46-2.43,12.035,12.035,0,0,0-4.73-.877,11.082,11.082,0,0,0-4.61.945,11.447,11.447,0,0,0-6.01,6.277,12.73,12.73,0,0,0,.03,9.225,11.117,11.117,0,0,0,2.45,3.713,11.247,11.247,0,0,0,3.71,2.452,12.178,12.178,0,0,0,4.66.878,11.431,11.431,0,0,0,6.32-1.665,12.317,12.317,0,0,0,4.12-4.365Zm-11.11-6.12a5.694,5.694,0,0,1,2.02-3.015,5.4,5.4,0,0,1,3.33-1.08,5.983,5.983,0,0,1,2.32.405,5.069,5.069,0,0,1,1.62,1.035,4.422,4.422,0,0,1,.99,1.35,3.7,3.7,0,0,1,.38,1.305h-10.66Z" transform="translate(-1572.25 -99.781)" />
    <path data-name="design of user interfaces" d="M1574.97,158.876a3.247,3.247,0,0,1-.81-2.286,3.288,3.288,0,0,1,.81-2.286,2.589,2.589,0,0,1,2-.9,2.56,2.56,0,0,1,2,.9,3.656,3.656,0,0,1,0,4.59,2.554,2.554,0,0,1-2,.882,2.589,2.589,0,0,1-2-.9h0Zm3.5,2a3.067,3.067,0,0,0,1.23-1.1h0.08V161h1.58V148.112h-1.66v4.068l0.08,1.224h-0.08a3.067,3.067,0,0,0-1.23-1.1,3.774,3.774,0,0,0-1.77-.414,3.883,3.883,0,0,0-2.97,1.368,5.123,5.123,0,0,0,0,6.66,3.883,3.883,0,0,0,2.97,1.368A3.774,3.774,0,0,0,1578.47,160.874Zm11.16-.216a4.448,4.448,0,0,0,1.65-1.746l-1.48-.72a2.787,2.787,0,0,1-4.46.792,2.91,2.91,0,0,1-.87-2.088h6.93l0.02-.18a5.093,5.093,0,0,0-1.16-3.555,4.395,4.395,0,0,0-6.25.072,4.777,4.777,0,0,0-1.23,3.357,4.7,4.7,0,0,0,1.26,3.366,4.226,4.226,0,0,0,3.21,1.332A4.552,4.552,0,0,0,1589.63,160.658Zm-4.14-6.678a2.4,2.4,0,0,1,1.61-.576,2.611,2.611,0,0,1,1.81.6,2.207,2.207,0,0,1,.75,1.521h-5.06A2.727,2.727,0,0,1,1585.49,153.98Zm11.66,1.926-1.34-.342c-0.94-.216-1.42-0.576-1.42-1.08a0.934,0.934,0,0,1,.51-0.792,2.159,2.159,0,0,1,1.17-.324,2.534,2.534,0,0,1,1.26.315,1.813,1.813,0,0,1,.82.873l1.48-.612a3.017,3.017,0,0,0-1.32-1.494,4.506,4.506,0,0,0-4.63.171,2.3,2.3,0,0,0-.98,1.935c0,1.224.86,2.052,2.57,2.484l1.52,0.378a1.437,1.437,0,0,1,1.29,1.242,0.978,0.978,0,0,1-.53.81,2.372,2.372,0,0,1-1.32.342,2.3,2.3,0,0,1-1.36-.441,2.735,2.735,0,0,1-.95-1.233l-1.47.63a3.845,3.845,0,0,0,1.44,1.827,4.385,4.385,0,0,0,4.88-.1,2.388,2.388,0,0,0,1-1.944c0-1.332-.87-2.214-2.62-2.646h0Zm5.77-7.6a1.1,1.1,0,0,0-.82-0.342,1.17,1.17,0,1,0,0,2.34,1.1,1.1,0,0,0,.82-0.342A1.154,1.154,0,0,0,1602.92,148.31Zm-1.65,3.87V161h1.65v-8.82h-1.65Zm5.69,6.7a3.247,3.247,0,0,1-.81-2.286,3.288,3.288,0,0,1,.81-2.286,2.661,2.661,0,0,1,3.99,0,3.656,3.656,0,0,1,0,4.59,2.526,2.526,0,0,1-2,.882,2.569,2.569,0,0,1-1.99-.9h0Zm5.18,5.076a4.518,4.518,0,0,0,1.21-3.33V152.18h-1.59V153.4h-0.07a3.274,3.274,0,0,0-1.27-1.107,3.777,3.777,0,0,0-1.74-.405,3.883,3.883,0,0,0-2.97,1.368,4.841,4.841,0,0,0-1.22,3.33,4.908,4.908,0,0,0,1.22,3.348,3.9,3.9,0,0,0,2.97,1.35,3.777,3.777,0,0,0,1.74-.405,3.274,3.274,0,0,0,1.27-1.107h0.07v0.846a3.159,3.159,0,0,1-.75,2.232,2.757,2.757,0,0,1-2.11.81,2.639,2.639,0,0,1-1.55-.468,2.491,2.491,0,0,1-.93-1.242l-1.57.648a3.227,3.227,0,0,0,.58,1.044,3.8,3.8,0,0,0,.9.81,4.607,4.607,0,0,0,1.18.531,5.008,5.008,0,0,0,1.39.189,4.392,4.392,0,0,0,3.24-1.224h0Zm3.22-2.952h1.66v-4.878a2.918,2.918,0,0,1,.66-1.917,2.086,2.086,0,0,1,1.66-.8,1.948,1.948,0,0,1,2.18,2.16V161h1.65v-5.544a3.708,3.708,0,0,0-.87-2.637,3.249,3.249,0,0,0-2.49-.927,3.309,3.309,0,0,0-1.63.432,2.942,2.942,0,0,0-1.16,1.08h-0.07V152.18h-1.59V161Z" transform="translate(-1572.25 -99.781)" />
  </svg>
</group>


</group>




<group data-type="group" data-space="20" data-background="highlight"  data-radius="20" >
<Marquee >
<group data-wrap="no" data-align="center" data-gap="10">
    <icon data-length="30">info</icon><text>This extensive text is intended as a showcase of the marquee effect, wherein, upon mouse hover, the text will smoothly scroll horizontally if the available display area is limited.</text>
  </group>
</Marquee>
</group>
<group data-type="group" data-space="20" data-background="highlight"  data-radius="20" >
<Button primary large icon="star"></Button>

</group>
</view>

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

    </view>
  );
}

export default App;
