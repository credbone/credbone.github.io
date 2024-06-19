import React from "react";
import sampleImage from "../styles/images/samples/res_42.jpg";
import Marquee from "../components/Marquee";


const Miscellaneous : React.FC = () => {


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
            Miscellaneous
          </text>

          <text
            data-wrap="wrap"
            data-length="300"
            data-line="1.5"
            data-light=""
            data-ellipsis=""
          >
          Encompasses a variety of small, diverse UI components that don't fit into other categories, including elements like marquees and counters.
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

          <group data-length="fit" >
            <Marquee>
              <group data-space="40">
              <text
                  data-text-size="x-large"
                  data-weight="700"
                  data-color="white"
          >
           Encompasses a variety of small, diverse UI components that don't fit into other categories, including elements like marquees and counters.
          </text>
              </group>
</Marquee>
          </group>
        </group>
      </view>
    </view>
  );
};
export default Miscellaneous ;
