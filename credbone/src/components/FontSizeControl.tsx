import React from "react";
import CustomSlider from "../components/inputs/slider";
import { useFontSize } from "../components/FontSizeProvider";

function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  return (

    
      <group data-wrap="no" data-gap="20" data-align="center" data-length="300">
        <group data-gap="20" data-width="auto" data-wrap="no" data-align="center">
          <text data-text-size="x-large" data-weight="700" data-space-right="10">Aa</text>
        </group>

        <separator data-vertical="" />

        <group>
          <group
            data-justify="space-between"
            data-wrap="no"
            data-align="center"
            data-gap="10"
            data-height="30"
            data-position="absolute"
            data-left="0"
          >
            <group data-length="10"></group>
            <group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
            <separator data-horizontal=""></separator>
            <group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
            <separator data-horizontal=""></separator>
            <group data-length="4" data-height="4" data-radius="5" data-background="text"></group>
            <group data-length="10"></group>
          </group>

          <CustomSlider
            handlerWidth={50}
            start={13}
            end={15}
            step={1}
            showvalue={false}
            value={fontSize}
            onValueChange={(value) => setFontSize(value)}
            trackLeftProps={{ "data-opacity": "0" }}
            trackRightProps={{ "data-opacity": "0" }}
          />
        </group>
      </group>



  );
}

export default FontSizeControl;
