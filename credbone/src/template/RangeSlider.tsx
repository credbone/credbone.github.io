import React, { useState } from "react";
import CustomSlider from "../components/inputs/slider";
import TickComponent from "../components/inputs/TickComponent";
import sectionImage from "../styles/images/samples/wide_res_68.webp";
import GaugeZoom from "../components/dashboard/GaugeZoom";

const RangeSlider: React.FC = () => {
  const handleSliderChange = (value: number) => {
    //  console.log("Current value:", value);
  };

  const [sliderValue, setSliderValue] = useState(23); // Initial value for the slider
  const [GaugeValue, setGaugeValue] = useState(90); // Initial value for the slider





  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group
        data-direction="column"
        data-gap="30"
        data-background="adaptive-gray"
        data-radius="20"
        data-justify="end"
        data-space="30"
      >
        <group data-direction="column">
          <group data-gap="20" data-align="center">
            <group
              data-space-horizontal="20"
              data-space-vertical="10"
              data-background="text"
              data-width="auto"
              data-color="main-background"
              data-radius="30"
            >
              <text>New</text>
            </group>
            <separator data-vertical=""></separator>
            <text>Version 0.0.9</text>
          </group>
        </group>
        <separator data-horizontal=""></separator>

        <group data-height="100" data-adaptive="desktop"></group>

        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
          >
            Range Slider
          </text>
          <text data-wrap="wrap" data-length="500" data-line="1.5">
            A modern, flexible React range slider with dynamic value mapping and
            customizable styles for seamless integration.
          </text>
        </group>
      </group>

      <group>
        <picture
          data-radius="30"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
        >
          <img src={sectionImage} alt="" />
        </picture>

        <group data-space="30" data-width="auto">
          <group
            data-direction="column"
            data-radius="15"
            data-background="main-background"
            data-contain=""
            data-align="start"
            data-space="30"
            data-gap="20"
          >
            <group data-length="300" data-gap="30">
              <group>
                <text data-wrap="wrap" data-weight="600" data-line="1.5">
                  By default, the slider is configured to fit the available
                  space, use a neutral palette, and display the current value on
                  the handle.
                </text>
              </group>

              <group>
                <group>
                  <CustomSlider
                    start={20}
                    end={60}
                    initialValue={25}
                    onValueChange={handleSliderChange}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      <group data-gap="15" data-type="grid" data-grid-template="200">
        <group
        //  data-length="400"
                data-background="adaptive-gray"
        data-radius="20"
        data-space="30"
        data-gap="30"
        >
          <group data-direction="column" data-gap="30" >
            <group data-text-size="64" data-weight="700">
              <text data-line="1">{sliderValue}</text>
              <text data-line="1">°</text>
            </group>


          </group>
          <text
              data-wrap="wrap"
              data-max-length="300"
              data-weight="600"
              data-line="1.5"
            >
             Showcases range ticks with primary color applied to slider UI
            </text>
          <group data-gap="15" data-radius="20" >
            <TickComponent tickCount={15} />
            <CustomSlider
              start={10}
              end={26}
              initialValue={sliderValue}
              onValueChange={(value) => setSliderValue(value)}
              handlerProps={{
                "data-background": "main",
                "data-color": "main-text",
              }}
              trackLeftProps={{ "data-background": "main" }}
              trackRightProps={{ "data-opacity": "10" }}
            />
          </group>
        </group>

        <group
          data-space="30"
          data-background="context"
          data-radius="20"
          data-gap="30"
          data-dark=""
          data-direction="column"
          //   data-length="400"
          data-justify="end"
        >
          <text
            data-wrap="wrap"
            data-max-length="200"
            data-weight="600"
            data-line="1.5"
          >
            Adapts to various environments and backgrounds
          </text>

          <group data-gap="15">
            <CustomSlider
              start={0}
              end={120}
              initialValue={60}
              onValueChange={handleSliderChange}
              trackRightProps={{ "data-opacity": "30" }}
            />
          </group>
        </group>


        <group
        //  data-length="400"
              //  data-background="adaptive-gray"
              data-border=""
        data-radius="20"
          //data-justify="end"
          data-direction="column"
         // data-space="30" 
          data-gap="30"
        >
          <group data-ratio="4:5" data-height="fit" data-align="center" data-direction="column" data-contain="">
            <GaugeZoom value={GaugeValue} max={360} size={0} strokecolor="adaptive-gray"/> 




            <group data-gap="15" data-radius="20" data-position="bottom" data-space="30" >


            {/* <group data-direction="column"  >


<text
  data-wrap="wrap"
data-text-align="center"
  data-weight="600"
  data-line="1.5"


>
Custom handle using different properties
</text>
</group> */}

         
         <CustomSlider
           start={0}
           end={360}
           step={5}
           initialValue={GaugeValue}
           onValueChange={(value) => setGaugeValue(value)}
          //  handlerWidth={40}
            unit="°"
           handlerProps={{
             "data-background": "none",
             "data-color": "text",
             "data-border" : "inset-2",

           }}
           trackLeftProps={{ "data-margin":"0" }}
           trackRightProps={{ "data-opacity": "10" }}
         />
       </group>


          </group>


        </group>

      </group>
    </group>
  );
};
export default RangeSlider;
