import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../components/Ripple";
import { IconHome } from "../components/icon/credIcons";
import Scroll from "../components/scroll";

const Components: React.FC = () => {
  return (

    <view


      data-scroll=""

    >

      
      <group data-direction="column" data-align="center" data-position="center" data-space-vertical="30" data-gap="30">
      <group
          data-width="auto"
          
      >
        <group data-direction="column"  data-gap="15" data-text-align="center">
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
            data-length="400"
            data-line="1.5"
            data-light=""
          >
           Components are interactive elements essential for creating a user interface. They can be grouped by their function into the following categories: action, containment, communication, navigation, selection, and text input.
          </text>
        </group>

      </group>

      <group data-scroll-mask="false" data-border="no" data-background="none"   data-width="auto">
      <Scroll>
      <group data-gap="15" data-wrap="no" data-space-horizontal="30" >
        
        <Ripple>
        <Link data-type="group" data-ink-color="main-dark" data-contain="" data-interactive=""   to="../Colors"  data-background="main" data-color="main-text" data-length="200" data-height="300" data-radius="15">
            <group data-index="1"data-direction="column" data-gap="15" data-space="30">
            <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Color System</text>
          <text data-wrap="wrap" data-line="1.5">
          Flexible theme customization
              </text>
              <IconHome size={50} />
</group>
        </Link>
      </Ripple>

        
        <group data-space="30" data-background="main-dark" data-color="white"  data-length="200" data-height="300" data-radius="15">
          <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Icons</text>
        </group>

        <group data-space="30" data-background="secondary" data-color="secondary-text"  data-length="200" data-height="300" data-radius="15">
          <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Buttons</text>
        </group>

        
        <group data-space="30" data-background="secondary-light" data-color="secondary-text"  data-length="200" data-height="300" data-radius="15">
          <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Checkbox & Switches</text>
        </group>

      </group>
</Scroll>
      </group>
      </group>

      <group data-height="90" data-shrink="0"></group>
      
    </view>
    
  );
};
export default Components;