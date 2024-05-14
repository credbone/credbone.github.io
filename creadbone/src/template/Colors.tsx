
import React from "react";
import ContentSlide from "./contentSlide";
import Content from "./content";

const Colors: React.FC = () => {
  const BaseColors = [
    { value: "red", name: "Red" },
    { value: "pink", name: "Pink" },
    { value: "purple", name: "Purple" },
    { value: "deep-purple", name: "Deep Purple" },
    { value: "indigo", name: "Indigo" },
    { value: "blue", name: "Blue" },
    { value: "light-blue", name: "Light Blue" },
    { value: "cyan", name: "Cyan" },
    { value: "teal", name: "Teal" },
    { value: "green", name: "Green" },
    { value: "light-green", name: "Light Green", text: "black" },
    { value: "lime", name: "Lime", text: "black" },
    { value: "yellow", name: "Yellow", text: "black" },
    { value: "amber", name: "Amber", text: "black" },
    { value: "orange", name: "Orange" },
    { value: "deep-orange", name: "Deep Orange" },
    { value: "brown", name: "Brown" },
    { value: "grey", name: "Grey" },
    { value: "blue-grey", name: "Blue Grey" },
  ];

  return (
    <view data-vertical="" data-adaptive>
      <view data-space="20" data-scroll="">

        
        <group data-direction="column" data-gap="15" data-space="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-color="main"
          >
            Color System
          </text>
          <text
            data-wrap="wrap"
            data-length="610"
            data-line="1.5"
            data-light=""
          >
            A color system can assist in crafting a color palette that mirrors
            brand or personal style, while also considering features like dark
            mode compatibility for a seamless user experience across different
            interfaces.
          </text>
        </group>
        <space></space>
        <group
          data-gap="20"
          data-align="start"
          data-weight="600"
          data-type="column"
          data-column-size="240"
          data-column-gap="20"
        >
          <group data-space="10" data-gap="20">
            <text data-wrap="wrap" data-text-size="medium">
              Primary Color
            </text>
            <group
              data-direction="column"
              data-contain=""
         //     data-space="10"
              data-radius="10"
              data-elevation="1"
            >
              <group
                data-background="main-lighter"
                data-width="auto"
                data-space="15"
              >
                 Lighter
              </group>
              <group
                data-background="main-light"
                data-width="auto"
                data-space="15"
              >
                 Light
              </group>
              <group data-background="main"  data-color="white" data-height="160" data-align="end" data-width="auto" data-space="15">
                Main 
              </group>
              <group
                data-background="main-dark"
                data-width="auto"
                data-space="15"
                data-color="white"
              >
                 Dark
              </group>
              <group
                data-background="main-darker"
                data-width="auto"
                data-space="15"
                data-color="white"
              >
                 Darker
              </group>
            </group>
          </group>

          <group data-space="10" data-gap="20">
            <text data-wrap="wrap" data-text-size="medium">
              Secondary Color
            </text>
            <group
              data-direction="column"
              data-contain=""
      //        data-space="10"
              data-radius="10"
              data-elevation="1"
            >
              <group
                data-background="secondary-lighter"
                data-width="auto"
                data-space="15"
              >
                 Lighter
              </group>
              <group
                data-background="secondary-light"
                data-width="auto"
                data-space="15"
              >
                 Light
              </group>
              <group
                data-background="secondary"
                data-width="auto"
                data-space="15"
                data-color="white"
              >
                Secondary 
              </group>
              <group
                data-background="secondary-dark"
                data-width="auto"
                data-space="15"
                data-color="white"
              >
                 Dark
              </group>
              <group
                data-background="secondary-darker"
                data-width="auto"
                data-space="15"
                data-color="white"
              >
                 Darker
              </group>
            </group>
          </group>

          <group data-space="10" data-gap="20">
            <text data-wrap="wrap" data-text-size="medium">
              Base Colors
            </text>
            <group
              data-direction="column"
              data-contain=""
        //      data-space="10"
              data-radius="10"
              data-elevation="1"
              data-color="white"
            >
              {BaseColors.map((colors) => (
                <group
                  data-space="15"
                  data-width="auto"
                  data-background={colors.value}
                  data-interactive=""
                >
                  <text data-ellipsis="" data-color={colors.text}>
                    {colors.name}
                  </text>
                </group>
              ))}
            </group>
          </group>

          <group data-gap="20" data-space="10">
            <text data-wrap="wrap" data-text-size="medium">
              Special Color & Backgrounds
            </text>
            <group
              data-direction="column"
              data-contain=""
         //     data-space="10"
              data-radius="10"
              data-elevation="1"
              data-background="main-background"
            >
              <group data-space="15" data-width="auto" data-background="dashed">
                Dashed Background
              </group>

              <group
                data-space="15"
                data-border
                data-width="auto"
                data-background="stripe"
              >
                Stripe Background
              </group>
            </group>
            <group
              data-direction="column"
              data-contain=""
       //       data-space="10"
              data-radius="10"
              data-elevation="1"
              data-background="main-background"
            >
              <group data-space="15" data-width="auto" data-background="graph">
                Graph Background
              </group>
            </group>
          </group>
          <group data-gap="20" data-space="10" >
            <group
              data-direction="column"
              data-contain=""
        //      data-space="10"
              data-radius="10"
              data-elevation="1"
              data-background="main-background"
            >
              <group
                data-space="15"
                data-width="auto"
                data-background="success"
                data-color="white"
              >
                Success Color
              </group>
              <group data-space="15" data-width="auto" data-background="error" data-color="white">
                Error Color
              </group>
              <group data-space="15" data-width="auto" data-background="highlight">
                Highlight Color
              </group>
              <group data-space="15" data-width="auto" data-background="main-background">
                Main Background
              </group>

              
            </group>
          </group>
        </group>
        <group data-height="60"></group>
      </view>

      {/* <view  data-dark="" data-scroll="" data-space="10" data-border="none" >
        <group data-direction="column" data-gap="15" data-space="20">
          <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap">
            Dark Theme
          </text>
          <text
            data-wrap="wrap"
            data-length="610"
            data-line="1.5"
            data-light=""
          >
            A dark theme is a low-light UI that displays mostly dark surfaces.
          </text>
        </group>

        
        
        <ContentSlide></ContentSlide>

        <group data-type="grid" data-gap="10" data-space="20">
          <Content></Content>
        </group>
      </view> */}
    </view>
  );
};
export default Colors;
