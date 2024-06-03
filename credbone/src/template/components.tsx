import React from "react";

const Components: React.FC = () => {
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
      >
        <group data-direction="column" data-space="30" data-gap="15">
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-color="main"
            data-ellipsis=""
          >
            Welcome
          </text>
          <text
            data-wrap="wrap"
            data-length="300"
            data-line="1.5"
            data-light=""
          >
           Components are interactive elements essential for creating a user interface. They can be grouped by their function into the following categories: action, containment, communication, navigation, selection, and text input.
          </text>
        </group>

      </view>
    </view>
    
  );
};
export default Components;