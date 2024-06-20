import React from "react";
import { Link } from "react-router-dom";



 import sampleImage from "../styles/images/samples/res_34.jpg";
 import sampleImage_3 from "../styles/images/samples/list_res/res-05.jpg";





const linksArray = [
  { picture:"", long: "",   color: "", title: "Color System", description: "Flexible theme customization, Color system can assist in crafting a color palette...", to: "../Colors" },
  { picture:sampleImage, long: "true", color: "", title: "Icons", description: "Beautifully crafted and carefully designed icons.", to: "/Home/Icons" },
  { picture:"", long: "",   color: "", title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Home/Buttons" },
  { picture: sampleImage_3, long: "true",   color: "", title: "Cards", description: "Visual containers that hold all the elements and information about a single subject.", to: "/Home/CardsAndList" },
  { picture:"", long: "", color: "", title: "Checkbox & Switches", description: "User interface elements that allow for binary selections or toggles.", to: "/Home/CheckboxSwitchers" },
  { picture:"", long: "true",   color: "secondary", title: "Tooltip & Popover", description: "Provide additional information and context on hover or focus.", to: "/Home/TooltipAndPopover" },
  { picture:"", long: "",   color: "main", title: "Navigation & Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Home/Navigation" },
  { picture:"", long: "",   color: "", title: "Navigation & Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Home/Navigation" }
];



const Components: React.FC = () => {
  return (
    <view data-scroll="">
      <group data-direction="column" data-space-vertical="30">
        <group data-width="auto">
          <group
            data-direction="column"
            data-gap="20"
            data-space-horizontal="30"
          >
            <text
              data-weight="700"
              data-text-size="xxx-large"
              data-wrap="wrap"
              data-color="main"
              data-ellipsis=""
            >
            welcome
            </text>
            <text
              data-wrap="wrap"
              data-length="400"
              data-line="1.5"
              data-opacity="70"
            >
              This platform offers a collection of carefully crafted UI
              components, each designed with attention to detail and a deep
              understanding of UI patterns.
            </text>
          </group>
        </group>

        <group
        
          data-border="no"
          data-background="none"
          //  data-width="auto"
          data-align="start"
           data-space="30"
          
        >
          <group
            //data-width="auto"
            //  data-wrap="no"
              data-max-length="1600"
           
            data-gap="20"
            data-type="grid"
            data-grid-template="240"
            data-weight="600"

          >





{linksArray.map((link, index) => (
            <Link
            to= {link.to}
            key={index}
            data-interactive=""
            data-width="auto"
            data-type="group"
            data-contain=""

           data-min-height="200"
           data-border="outline"
           data-radius="15"
           data-background={link.color ? link.color : "main-background"}
           data-color={link.color ? link.color + "-text" : ""}
           data-row-end={link.long ? "2" : ""}

          >

{link.picture ? (

<group data-height="300">
<picture data-brightness="adaptive">
        <img src={link.picture} alt="" />
      </picture>
</group>

        ) : (
            ""
        )}

<group
              data-index="1"
              data-direction="column"
              data-gap="15"
              data-space="30"
              data-align="start"
            >
              <text
                data-text-size="x-large"
                data-weight="700"
                data-wrap="wrap"
              >
                 {link.title}
              </text>
              <text data-wrap="wrap" data-line="1.5" data-max-length="300" data-opacity="60">
              {link.description}
              </text>
            </group>



          </Link>
            ))}

          </group>
        </group>
      </group>

      <group data-height="200" data-width="auto" data-shrink="no"></group>
    </view>
  );
};
export default Components;
