
import React from "react";
import ContentSlide from "./contentSlide";
import Content from "./content";
import sampleImage from "../styles/images/samples/res_15.jpg";
import sampleImage2 from "../styles/images/samples/res_16.jpg";

const Colors: React.FC = () => {
  const BaseColors = [
    { value: "red", name: "Red", description: "A muted brick red, vibrant yet grounded.", dark: "true", picture: "true" },
    { value: "pink", name: "Pink", description: "A rich raspberry, bold with a touch of sophistication.", dark: "true" },
    { value: "purple", name: "Purple", description: "Deep amethyst, luxurious and elegant.", dark: "true" },
    { value: "deep-purple", name: "Deep Purple", description: "Royal violet, striking and majestic.", dark: "true" },
    { value: "indigo", name: "Indigo", description: "Denim blue, classic with a modern twist.", dark: "true" },
    { value: "blue", name: "Blue", description: "Cerulean blue, bright and clear like the sky." },
    { value: "light-blue", name: "Light Blue", description: "Ocean blue, fresh and invigorating." },
    { value: "cyan", name: "Cyan", description: "Peacock blue, exotic and lively." },
    { value: "teal", name: "Teal", description: "Tropical teal, vibrant with a hint of mystery.", dark: "true" },
    { value: "green", name: "Green", description: "Fern green, natural and refreshing." },
    { value: "light-green", name: "Light Green", text: "black", description: "Moss green, earthy and calm." },
    { value: "lime", name: "Lime", text: "black", description: "Chartreuse, bright and zesty." },
    { value: "yellow", name: "Yellow", text: "black", description: "Mustard yellow, warm and bold." },
    { value: "amber", name: "Amber", text: "black", description: "Golden amber, rich and inviting." },
    { value: "orange", name: "Orange", description: "Pumpkin orange, warm and energetic." },
    { value: "deep-orange", name: "Deep Orange", description: "Burnt orange, deep and intense.", dark: "true" },
    { value: "brown", name: "Brown", description: "Cocoa brown, warm and comforting.", dark: "true" },
    { value: "grey", name: "Grey", description: "Slate grey, neutral and versatile.", dark: "true" },
    { value: "blue-grey", name: "Blue Grey", description: "Stormy blue-grey, cool and sophisticated.", dark: "true" },
  ];


  return (
    <view data-vertical="" data-adaptive>
      <view data-space="30" data-gap="30" data-scroll="">


        <group data-direction="column" data-gap="10">
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
            data-length="400"
            data-line="1.5"
            data-light=""
          >
            A color system can assist in crafting a color palette that mirrors
            brand or personal style, while also considering features like dark
            mode compatibility for a seamless user experience across different
            interfaces.
          </text>
        </group>




        <group data-max-length="1200" data-shrink="no" data-contain="" data-width="auto" data-radius="15"  >
          <group data-contain="" data-direction="column" data-height="240" data-width="auto" data-length='auto' data-color="main-text" data-space="30" data-background="main" data-gap="10" data-justify="end"> <text data-wrap="wrap" data-light="" data-max-length="300" data-line="20">This primary color you selected will be used extensively in the UI, with other shades being automatically generated from it.</text> <text data-wrap="wrap" data-weight="700" data-text-size="x-large">Primary Color</text> </group>

          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="main-lighter" ><text data-weight="700">Lighter</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>
          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="main-light"><text data-weight="700">Light</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>
          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="main-dark" data-color="white"><text data-weight="700">Dark</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>
          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="main-darker" data-color="white"><text data-weight="700">Darker</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>

          <group data-contain="" data-width="auto" data-height="240" data-length='auto' data-background="main-dark" >
            <picture data-position="absolute" data-name="color-demo"> <img src={sampleImage} alt="" /> </picture>


            <group
              data-color="main-text-lighter-white"
              data-direction="column" data-space="30" data-gap="10" data-justify="end">
              <text data-wrap="wrap" data-light="" data-max-length="200" data-line="20">The generated color ensures that the text remains readable on the chosen color.</text>
              <text data-wrap="wrap" data-weight="700" data-text-size="x-large">Text Color</text>
            </group>

          </group>

          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="secondary-lighter" ><text data-weight="700">Seondary Lighter</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>


          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="secondary-light"><text data-weight="700">Seondary Light</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>
          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="secondary-dark" data-color="white"><text data-weight="700">Seondary Dark</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>
          <group data-contain="" data-height="240" data-length='auto' data-shrink="no" data-direction="column" data-orientation="vertical-bottom" data-justify="start" data-width="auto" data-space="30" data-background="secondary-darker" data-color="white"><text data-weight="700">Seondary Darker</text><text data-ellipsis="" data-light="">Auto-generated shade</text></group>

          <group data-contain="" data-width="auto" data-height="240" data-length='auto' data-background="secondary-darker" >
            <picture data-position="absolute" data-name="color-demo"> <img src={sampleImage2} alt="" /> </picture>


            <group
              data-color="secondary-text-lighter-white"
              data-direction="column" data-space="30" data-gap="10" data-justify="end">
              <text data-wrap="wrap" data-light="" data-max-length="200" data-line="20">The generated color ensures that the text remains readable on the chosen color.</text>
              <text data-wrap="wrap" data-weight="700" data-text-size="x-large">Text Color</text>
            </group>

          </group>

          <group data-contain="" data-height="240" data-direction="column" data-width="auto" data-length='auto' data-color="secondary-text" data-space="30" data-background="secondary" data-gap="10" data-justify="end"> <text data-wrap="wrap" data-light="" data-max-length="300" data-line="20">This Secondary color you selected will be used extensively in the UI, with other shades being automatically generated from it.</text> <text data-wrap="wrap" data-weight="700" data-text-size="x-large">Secondary Color</text> </group>

        </group>


        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xx-large"
            data-wrap="wrap"

          >
            Base Colors
          </text>
          <text
            data-wrap="wrap"
            data-length="400"
            data-line="1.5"
            data-light=""
          >
            A color system can assist in crafting a color palette that mirrors
            brand or personal style, while also considering features like dark
            mode compatibility for a seamless user experience across different
            interfaces.
          </text>
        </group>




        <group
          data-shrink="no" data-weight="600" data-max-length="1200" data-contain="" data-width="auto" data-type="grid" data-grid-template="120" data-gap="10"
        >
          {BaseColors.map((colors) => (

            <group data-radius="15"
              data-contain="" data-length='auto' data-color={colors.dark === "true" ? "white" : "black"} data-shrink="no" data-direction="row" data-justify="start" data-width="auto"
              data-background={colors.value}
            // data-interactive=""
            >

              {colors.picture === "true" && <><picture data-position="absolute" data-name="color-demo"> <img src={sampleImage2} alt="" /> </picture></>}

              <group data-space="30" data-gap="5">
                <text data-ellipsis="" data-height="200" data-orientation="vertical-bottom">
                {colors.name}
              </text>
                <text data-wrap="wrap" data-height="200" data-light=""  data-orientation="vertical-bottom">{colors.description}</text></group>
            </group>
          ))}
        </group>




        <group
          data-gap="20"
          data-align="start"
          data-weight="600"
          data-type="column"
          data-column-size="240"
          data-column-gap="20"
        >






          {/* <group data-gap="20" data-space="10">
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
          </group> */}
        </group>
        <group data-height="60"></group>
      </view>



    </view>
  );
};
export default Colors;
