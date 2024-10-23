import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import sampleImage from "../styles/images/samples/objects/object-1.png";
import sampleImage_2 from "../styles/images/samples/objects/object-7.png";
import sampleImage_3 from "../styles/images/samples/objects/object-3.png";
import sampleImage_4 from "../styles/images/samples/objects/object-10.png";


import Ripple from "../components/Ripple";
import TextReveal from "../components/TextReveal";
  
const linksArray = [
  { picture:sampleImage, long: "true", color: "midnight-navy", title: "Icons", description: "Beautifully crafted and carefully designed icons.", to: "/Home/Icons" },
  { picture:"", long: "",   color: "", title: "Color System", description: "Flexible theme customization, Color system can assist in crafting a color palette...", to: "/Home/Colors" },
  { picture:"", long: "",   color: "", title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Home/Buttons" },
  { picture: sampleImage_3, long: "true",   color: "peach-blush", title: "Cards", description: "Visual containers that hold all the elements and information about a single subject.", to: "/Home/CardsAndList" },
  { picture:sampleImage_2, long: "true",   color: "mint-green", title: "Tooltip & Popover", description: "Provide additional information and context on hover or focus.", to: "/Home/TooltipAndPopover" },
  { picture:"", long: "", color: "", title: "Checkbox & Switches", description: "User interface elements that allow for binary selections or toggles.", to: "/Home/CheckboxSwitchers" },
  { picture: sampleImage_4, long: "true", color: "olive-green", title: "Quick Demos", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Home/QuickDemos" },

  { picture:"", long: "",   color: "", title: "Navigation & Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Home/Navigation" },
  { picture: "", long: "", color: "", title: "Input & Forms", description: "Deals with input fields and form-related user interface elements.", to: "/Home/InputsAndForms" },
  //{ picture: "", long: "", color: "", title: "Layout & Switches", description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", to: "/Home/Layout" },

  { picture: "", long: "", color: "", title: "Modals", description: "Customizable modal component supporting various sizes, triggers, and animations.", to: "/Home/Modal" },

  // { picture: "", long: "", color: "", title: "Dashboard", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Home/Dashboard" },



];


const phrases = [
  "hi",
  "hello",
  "hey",
  "howdy",
  "what's new?",
  "yo",
  "sup",
  "hey there",
  "how's it going?",
  "what's up?",
];

const Components: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setMessage(randomPhrase);
  }, []);

  return (
    <group data-scroll="" data-index="1">
      <group
        data-direction="column"
        data-space-vertical="30"
        data-gap="15"
        data-wrap="no"
        data-align="start"
        data-position="center"
        //  data-width="auto"
        data-max-length="1600"
      >
        <group data-space-horizontal="30">
          <group
            data-direction="column"
            data-gap="20"
            data-radius="20"
            data-space="40"
            // data-background="main"
            // data-color="main-text"
            data-align="center"
            data-justify="center"
            data-text-align="center"
           // data-min-height="300"
          >
            <text
              data-weight="700"
              data-text-size="48"
              data-wrap="wrap"
              data-ellipsis=""
            >
              <TextReveal text={message} duration={1200} />
            </text>

            <text
              data-wrap="wrap"
              data-length="600"
              data-line="20"
              data-opacity="70"
            >
              This platform demos a collection of carefully crafted UI
              components, each designed with attention to detail and a deep
              understanding of UI patterns.
            </text>

            <Ripple>
            <Link
            data-contain=""
            data-drag="none"
            data-type="group"
                to="/Home/Typeface"
                data-interactive=""
                data-width="auto"
                data-border="outline"
              //  data-background="main-text"
              //  data-color="main"
                data-space-horizontal="30"
                data-space-vertical="15"
                data-radius="30"
              >
                <text
                  data-weight="700"
                  //  data-wrap="wrap"
                  data-ellipsis=""
                >
                  Get Started
                </text>
              </Link>
            </Ripple>
          </group>
        </group>

        {/* <StuckReporter>
          {(isSticky) => (
            <group
            //  data-space-vertical={isSticky ? "15" : "0"}
              data-space-horizontal={isSticky ? "0" : "30"}
              data-sticky="top"
              data-duration=".125"
            >
              <group
                // data-index="3"

                data-scroll-mask="false"
                data-border={isSticky ? "none" : ""}
                data-elevation={isSticky ? "1" : ""}
                data-backdrop={isSticky ? "10" : ""}
                data-contain=""
                data-shrink="no"
                data-radius={isSticky ? "0" : "15"}
                data-snap-button="15"
              >
                <Scroll>
                  <SubNavigation />
                </Scroll>
              </group>
            </group>
          )}
        </StuckReporter> */}

        <group
          data-space-horizontal="30"
          data-border="no"
          data-background="none"
          data-align="start"
        >
          <group
            data-gap="10"
            data-type="grid"
            data-grid-template="200"
            data-weight="600"
            
          >
            {linksArray.map((link, index) => (
<Ripple  key={index} >
<Link
data-react="scale"
               data-drag="none"
                to={link.to}
                key={index}
                data-interactive=""
                data-width="auto"
                data-type="group"
                data-contain=""
                data-min-height="200"
                data-border={link.color ? "none" : "outline"}
                data-radius="20"
               // data-space="5"
                data-background={link.color ? link.color : "context"}
                data-color={link.color ? link.color + "-text" : ""}
                data-row-end={link.long ? "2" : ""}
                data-direction="column"
                   //                  data-react="scale"
              >


                <group
                  data-index="1"
                  data-direction="column"
                  data-gap="10"
                  data-space="25"
                  data-align="start"
                 
                >
                  <text
                    data-text-size="large"
                    data-weight="700"
                    data-wrap="wrap"
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

                {link.picture ? (
                  <group 
                  data-index="1"
                  data-type="interact"
                  data-position="bottom"
              //    data-min-length="300" 
                  //   data-contain=""
                     data-height="240"
                     data-justify="end"


                  >
                    <picture
                    //  data-brightness="adaptive"
                   data-min-length="300"
                      data-contain=""
                       data-ratio="1:1"
                    >
                      <img src={link.picture} alt="" />
                    </picture>
                  </group>
                ) : (
                  ""
                )}

              </Link>
</Ripple>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
};
export default Components;
