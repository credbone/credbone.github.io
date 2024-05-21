import React from "react";

const previewText = 'The quick brown fox jumps over the lazy dog';

const fontData = [
  { name: 'Thin 100', weight: 100, textSize: 'x-large', previewText: previewText },
  { name: 'Light 300', weight: 300, textSize: 'x-large', previewText: previewText },
  { name: 'Regular 400', weight: 400, textSize: 'x-large', previewText: previewText },
  { name: 'Medium 600', weight: 600, textSize: 'x-large', previewText: previewText },
  { name: 'Bold 700', weight: 700, textSize: 'x-large', previewText: previewText },
  { name: 'Bold 800', weight: 800, textSize: 'x-large', previewText: previewText },

];



const Typeface: React.FC = () => {
  return (
    <view
      data-vertical=""
      data-adaptive=""
      data-space="30"
      data-gap="15"
      data-align="start"
    >
      <view
        data-size="small"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
        data-background="main"
        data-color="main-text"
      >
        <group data-border="overprint" data-space="10" data-index="1">
          <text data-space="10">Currently in Use</text>
        </group>
        <group data-space="20" data-border="none" data-scroll="">
          <text data-weight="700" data-text-size="xxx-large" data-wrap="wrap">
            Gilroy Typeface
          </text>
          <space data-height="30"></space>
          <text data-wrap="wrap" data-light="" data-line="1.5">
            Gilroy Font Family was designed by Radomir Tinkov and published by
            Radomir Tinkov. Gilroy contains 20 styles and family package
            options.
          </text>
        </group>
      </view>

      <view
        data-size="small"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
      >
        <group data-border="overprint" data-space="10" data-index="1">
          <text data-space="10" >Preview</text>
        </group>
        <group data-scroll="" data-border="none">

      
        {fontData.map((font, index) => (
        <group key={index} data-space="30" data-gap="20" data-border="" data-background="main-background">
          <text data-light="">{font.name}</text>
            <group
              data-contain=""
              data-wrap="wrap"
              data-cursor="auto"
              data-weight={font.weight}
              data-text-size={font.textSize}
              contenteditable="plaintext-only"

              

          >
            {font.previewText}
          </group>
        </group>
      ))}
          

        </group>
      </view>

      <view
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
      >
        <group data-border="overprint" data-space="10" data-index="1">
          <text data-space="10">Glyphs</text>
        </group>
        <group data-scroll="">
          <grid>
            <wrap
              mini="" //NOSONAR
              data-text-size="larger"

            >
              <div data-background="main" data-color="main-text" data-type="highlight" data-radius="10" data-text-size="64">{"A"}</div>
              <div >{"B"}</div>
              <div >{"C"}</div>
              <div>{"Č"}</div>
              <div>{"Ć"}</div>
              <div>{"D"}</div>
              <div>{"Đ"}</div>
              <div>{"E"}</div>
              <div>{"F"}</div>
              <div>{"G"}</div>
              <div>{"H"}</div>
              <div>{"I"}</div>
              <div>{"J"}</div>
              <div>{"K"}</div>
              <div>{"L"}</div>
              <div>{"M"}</div>
              <div>{"N"}</div>
              <div>{"O"}</div>
              <div>{"P"}</div>
              <div>{"Q"}</div>
              <div>{"R"}</div>
              <div>{"S"}</div>
              <div>{"Š"}</div>
              <div>{"T"}</div>
              <div>{"U"}</div>
              <div>{"V"}</div>
              <div>{"W"}</div>
              <div>{"X"}</div>
              <div>{"Y"}</div>
              <div>{"Z"}</div>
              <div>{"Ž"}</div>
              <div >{"a"}</div>
              <div>{"b"}</div>
              <div>{"c"}</div>
              <div>{"č"}</div>
              <div>{"ć"}</div>
              <div>{"d"}</div>
              <div>{"đ"}</div>
              <div>{"e"}</div>
              <div>{"f"}</div>
              <div>{"g"}</div>
              <div>{"h"}</div>
              <div>{"i"}</div>
              <div>{"j"}</div>
              <div>{"k"}</div>
              <div>{"l"}</div>
              <div>{"m"}</div>
              <div>{"n"}</div>
              <div>{"o"}</div>
              <div>{"p"}</div>
              <div>{"q"}</div>
              <div>{"r"}</div>
              <div>{"s"}</div>
              <div>{"š"}</div>
              <div>{"t"}</div>
              <div>{"u"}</div>
              <div>{"v"}</div>
              <div>{"w"}</div>
              <div>{"x"}</div>
              <div>{"y"}</div>
              <div>{"z"}</div>
              <div>{"ž"}</div>
              

              <div  data-background="main"  data-radius="10" data-color="main-text" >{"1"}</div>
              <div>{"2"}</div>
              <div>{"3"}</div>
              <div>{"4"}</div>
              <div>{"5"}</div>
              <div>{"6"}</div>
              <div>{"7"}</div>
              <div>{"8"}</div>
              <div>{"9"}</div>
              <div>{"0"}</div>

              <div>{"?"}</div>

              <div>{"“"}</div>
              <div>{"!"}</div>
              <div>{"”"}</div>
              <div>{"("}</div>
              <div>{"%"}</div>
              <div>{")"}</div>
              <div>{"["}</div>
              <div>{"#"}</div>
              <div>{"]"}</div>
              <div>{"{"}</div>
              <div>{"@"}</div>
              <div>{"}"}</div>
              <div>{"/"}</div>
              <div>{"\\"}</div>
              <div>{"-"}</div>
              <div>{"+"}</div>
              <div>{"÷"}</div>

              <div>{"="}</div>
              <div>{"&"}</div>
              <div>{"®"}</div>
              <div>{"©"}</div>
              <div>{"$"}</div>
              <div>{"€"}</div>
              <div>{"£"}</div>
              <div>{"¥"}</div>
              <div>{"¢"}</div>
              <div>{":"}</div>
              <div>{";"}</div>
              <div>{","}</div>
              <div>{"."}</div>
              <div>{"*"}</div>
            </wrap>
          </grid>
        </group>
      </view>
    </view>
  );
};
export default Typeface;
