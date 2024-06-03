import React from "react";
import { Link } from "react-router-dom";
import Ripple from "../components/Ripple";
import { IconHome, IconSearch } from "../components/icon/credIcons";
import Scroll from "../components/scroll";


import sampleImage from "../styles/images/samples/res_15.jpg";



const Components: React.FC = () => {
  return (

    <view


      data-scroll=""

    >

      
      <group data-direction="column" data-align="center" data-position="center" data-space-vertical="40" >
      <group
          data-width="auto"
          
      >
        <group data-direction="column"  data-gap="20" data-text-align="center" data-space-horizontal="30">
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
            data-length="600"
            data-line="1.5"
            data-light=""
          >
           Components are interactive elements essential for creating a user interface. They can be grouped by their function into the following categories: action, containment, communication, navigation, selection, and text input.
          </text>
        </group>

      </group>

      <group data-scroll-mask="false" data-border="no" data-background="none"   data-width="auto">
      <Scroll>
      <group  data-wrap="no" data-space="40" data-gap="10">
        
       
        <group data-radius="15" data-type="group" data-ink-color="main-dark" data-contain=""   data-background="main" data-color="main-text" data-length="300" data-height="300" >




            <group data-index="1"data-direction="column"  data-gap="15"  data-space="30">
            <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Color System</text>
          <text data-wrap="wrap" data-line="1.5">
          Flexible theme customization
              </text>


             {/* <Link data-type="group"  data-interactive=""  data-drag="none"  to="../Colors" data-position="bottom" >
               <group  data-index="1"  data-background="main-text" data-width="auto" data-space="10" data-space-horizontal="20" data-radius="5" data-color="main" data-weight="700"> <text>More ...</text></group>
               
               </Link> */}

</group>
        </group>
      

        
        <group data-radius="15" data-space="30" data-elevation="1" data-background="context"  data-length="350" data-height="300"  >
<group data-direction="column" data-gap="15">
<text data-text-size="x-large" data-weight="700" data-wrap="wrap">Icons</text>
          <text data-wrap="wrap" data-line="1.5" data-max-length="200">
          Beautifully crafted and carefully designed icons.
          </text>
</group>

        </group>

        <group  data-radius="15" data-background="secondary" data-color="secondary-text"  data-length="240" data-height="300" >
        {/* <picture data-position="absolute" data-name="color-demo">
            <img src={sampleImage} alt="" />
          </picture> */}


          <group data-index="1" data-direction="column"  data-gap="15"  data-space="30">
            <text data-text-size="x-large" data-weight="700" data-wrap="wrap">Buttons</text>
          <text data-wrap="wrap" data-line="1.5">
          Flexible theme customization
              </text>


</group>

        </group>

        
        <group data-radius="15" data-space="30" data-background="grey" data-color="white"  data-length="400" data-height="300">

<group data-direction="column" data-gap="15">
<text data-text-size="x-large" data-weight="700" data-wrap="wrap">Checkbox & Switches</text>
          <text data-wrap="wrap" data-line="1.5" data-max-length="200">
          Beautifully crafted and carefully designed icons.
          </text>
</group>

        </group>

      </group>
</Scroll>
      </group>
      </group>

      <group data-height="90" data-shrink="no"></group>
      
    </view>
    
  );
};
export default Components;