import React, { useState } from "react";

import sampleImage from "../styles/images/samples/wide_res_61.jpg";
import sampleImage_2 from "../styles/images/samples/res_73.jpg";
import Ripple from "../components/Ripple";
import { Link } from "react-router-dom";



const linksArray = [

  { title: "Icons\n& Shapes", description: "Beautifully crafted and carefully designed icons.", to: "/Components/Icons", },
  { title: "Colors\n& Shades", description: "Color system can assist in crafting a color palette...", to: "/Components/Colors", },
  { title: "Cards\n& Lists", description: "Organized containers for content display.", to: "/Components/CardsAndList", },
  { title: "Tooltip\n& Popover", description: "Provide additional information and context on hover or focus.", to: "/Components/TooltipAndPopover", },
  { title: "Checkbox\n& Switches", description: "Customizable toggle elements for user selection.", to: "/Components/CheckboxSwitchers", },
  { title: "Demos\n& Samples", description: "Sample dashboards for quick insights.", to: "/Components/QuickDemos", },
  { title: "Modals\n& Alerts", description: "Customizable modal component supporting various sizes, triggers, and animations.", to: "/Components/Modal", },

  { title: "Dashboard", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Components/Dashboard" },
  { title: "Navigation\n& Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Components/Navigation", },
  { title: "Input\n& Forms", description: "Deals with input fields and form-related user interface elements.", to: "/Components/InputsAndForms", },
  { title: "Layout\n& Switches", description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", to: "/Components/Layout" },
  { title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Components/Buttons", },
];


const Overview: React.FC = () => {
  return (

    
    <group data-space="30" data-gap="30" data-wrap="no" data-direction="column">
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




<group  >
        <group data-direction="column" data-justify="end">
          <picture
            data-radius="20"
            data-contain=""
            data-brightness="adaptive"
          //  data-position="absolute"
            data-background="grey-light"
          >
            <img src={sampleImage} alt="" />
          </picture>

          {/* <group data-space="30" data-gap="30" data-dark="" data-direction="column"  data-align="start">


          <group data-width="auto" data-space="30" data-index="2" data-radius="10" data-contain="" data-backdrop="20">




          <group data-width="auto" data-gap="20">
          <text
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
          
          >
            Components are interactive elements used to build a user interface.
            They can be grouped into categories according to their function:
            Action, Containment, Communication, Navigation, Selection, and Text
            Input.
          </text>


          </group>





        </group>
          </group> */}
        </group>
      </group>

      <group
            //      data-space-horizontal="30"
            data-border="no"
            data-background="none"
            
           
          >
            <group
              data-gap="5"
              data-type="grid"
              data-grid-template="240"
              data-weight="600"
             

            >
              {linksArray.map((link, index) => (
                <Ripple key={index}>
                  <Link
                  data-radius="20"
                    data-drag="none"
                    to={link.to}
                    key={index}
                    data-interactive=""
                    data-width="auto"
                    data-type="group"
                    data-contain=""
                    data-min-height="300"
                    //  data-radius="20"
                   
                    data-direction="column"
                    data-wrap="no"
                    data-background="highlight"
                  >
                    <group
                      data-index="1"
                      data-direction="column"
                      data-gap="15"
                      data-space="30"
                      data-height="fit"
                      data-wrap="no"
                    >
                      <text
                        // data-text-size=""
                        //   data-height="50"
                        data-contain=""
                        //data-weight="100"
                        data-opacity="20"
                      >
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </text>
                      <group ></group>
                      <text
                        data-text-size="medium"
                        data-weight="700"
                        data-wrap="preline"
                        data-ellipsis=""
                      >
                        {link.title}
                      </text>
                      <text
                        data-ellipsis=""
                        data-wrap="wrap"
                        data-line="1.5"
                        data-max-length="300"
                        data-opacity="60"
                      >
                        {link.description}
                      </text>
                    </group>
                  </Link>
                </Ripple>
              ))}
            </group>
          </group>



    </group>
  );
};

export default Overview;
