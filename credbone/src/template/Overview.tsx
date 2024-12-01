import React, { useState } from "react";

import sampleImage from "../styles/images/samples/res_71.jpg";
import sampleImage_2 from "../styles/images/samples/res_73.jpg";

const Overview: React.FC = () => {
  return (

    
    <group data-space="30" data-gap="30" data-wrap="no">
      <group data-direction="column" data-wrap="no">
        <group data-direction="column" data-gap="10">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
            // data-color="main"
            data-opacity="10"
          >
            Components <br />
            Overview
          </text>
          <text
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
            data-light=""
          >
            Components are interactive elements used to build a user interface.
            They can be grouped into categories according to their function:
            Action, Containment, Communication, Navigation, Selection, and Text
            Input.
          </text>
        </group>
      </group>




    </group>
  );
};

export default Overview;
