import React  from "react";
import { Link } from "react-router-dom";

import Ripple from "../components/Ripple";

import { IconSearch } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";
import SearchComponent from "../pages/search/searchComponent";


import sampleImage_2 from "../styles/images/samples/wide_res_01.jpg";
import sampleImage_4 from "../styles/images/samples/wide_res_67.webp";
// import sampleImage_3 from "../styles/images/samples/res_001.png";
// import Popover from "../components/popover";
// import RichThemePicker from "./richThemePicker";
import { colorcontent, typefacecontent } from "./utils/richTumbnail";
// import RichThemePicker from "./richThemePicker";
// import Popover from "../components/popover";
import buildInfo from "../buildInfo.json";

// import ThemNameDisplay from "./themeName";
// import { ArrowDown } from "lucide-react";


const links = [
  { name: "Get Started", url: "../Components/Overview" },
  { name: "About The Project", url: "/About" },
  { name: "Search", url: "/Search" }
];


const currentYear: number = new Date().getFullYear();




const linksArray = [


  { title: "Colors\n& Shades",content:colorcontent, description: "A system to craft and manage color palettes.", to: "/Components/Colors" },
  { title: "Typography", content:typefacecontent,  description: "Scalable tokens for managing text styles.", to: "/Components/Typography" },
  { title: "Cards\n& Lists", description: "Structured containers for displaying content.", to: "/Components/CardsAndList" },
  { title: "Tooltip\n& Popover", description: "Interactive elements on hover, focus, or click.", to: "/Components/TooltipAndPopover" },
  { title: "Checkbox\n& Switches", description: "Customizable toggles for user actions.", to: "/Components/CheckboxSwitchers" },

  { title: "Modals\n& Alerts", description: "Dynamic modals for prompts and notifications.", to: "/Components/Modal" },
  { title: "Demos\n& Samples", description: "Quick apps showcasing design patterns.", to: "/Components/QuickDemos" },
  { title: "Full\nOverview", description: "Discover all components and features.", to: "/Components/Overview", color: true }
  



  //{ title: "Icons\n& Shapes", description: "Beautifully crafted and carefully designed icons.", to: "/Components/Icons", },
  //{ picture: "", long: "", color: "", title: "Dashboard", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Components/Dashboard" },
  // { picture: "", long: "", color: "", title: "Navigation & Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Components/Navigation", },
  // { picture: "", long: "", color: "", title: "Input & Forms", description: "Deals with input fields and form-related user interface elements.", to: "/Components/InputsAndForms", },
  // { picture: "", long: "", color: "", title: "Layout & Switches", description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", to: "/Components/Layout" },
  // { picture: "", long: "", color: "", title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Components/Buttons", },
];




// const phrases = [
//   "Hi",
//   "Hello",
//   "Hey",
//   "What's new?",
//   "Hey there",
//   "What's up?",
// ];

const Components: React.FC = () => {
  const { openModal, closeModal } = useModal();
  // const [message, setMessage] = useState<string>("");

  const modalConfig = {
    "data-radius": "none",
    "data-margin": "0",
    "data-background": "none",
    "data-elevation": "none",
    "data-width": "fit",
    "data-scroll": "",
    "data-min-height": "fit",
    "data-contain": "scroll",
    "data-modal-backdrop": "dark",
  };

  // useEffect(() => {
  //   const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  //   setMessage(randomPhrase);
  // }, []);

  return (
    <group data-scroll="" data-index="1">
      <group
        data-space="adaptive-30-50"
        data-gap="50"
        data-direction="column"
data-max-length="1200"

      >




        <group
          data-width="auto"
          data-space="adaptive-30-50"
          data-direction="column"
          data-gap="50"
          data-index="3"
        
      
          data-wrap="no"
        >
            <text
              // data-wrap="wrap"
              // data-ellipsis=""

              data-line="1"
              data-text-size="64"
              data-text-clamp="64"
              data-max-length="800"
              data-font-type="hero"
              data-wrap="wrap"
            >
              <text data-wrap="no">Designed to</text>
              <br></br> evolve and adapt.
            </text>

            <text
              data-wrap="wrap"
              data-max-length="400"
              data-line="1.5"
              data-opacity="70"
              data-text-size="15"
            >
              A hybrid, atomic, and declarative design system that brings
              flexibility, control and speed to projects. With no classes or
              pre-defined styles.
            </text>

          <group data-width="auto" data-gap="15" data-align="center">
            <Ripple>
              <group
                data-contain=""
                data-drag="none"
                data-type="group"
                data-cursor="pointer"
                data-interactive=""
                data-width="auto"
                data-background="highlight"
                data-space="15"
                data-radius="15"
                onClick={() =>
                  openModal({
                    id: "modal-2",
                    title: "Customized Popup",
                    content: (
                      <group
                        data-min-height="fit"
                        data-justify="center"
                        data-align="start"
                        data-space="30"
                        data-contain="scroll"
                      >
                        <group
                          data-top="0"
                          data-position="absolute"
                          data-height="fit"
                          onClick={() => closeModal("modal-2")}
                        ></group>

                        <group
                          data-max-length="600"
                          data-border=""
                          data-background="context"
                          data-radius="20"
                          data-space="10"
                          data-gap="10"
                          data-elevation="2"
                          data-animation-name="appear-top"
                          data-fill-mode="backwards"
                          data-animation-duration="2"
                        >
                          <SearchComponent showRandomTagsByDefault={false} />
                        </group>
                      </group>
                    ),
                    hasHeader: false,
                    hasToolbar: false,
                    customAttributes: modalConfig,
                    //    dimAttributes: {"data-background" : "dark-shade-10"},
                    spacing: 0,
                  })
                }
              >
                <IconSearch></IconSearch>
              </group>
            </Ripple>
            {/* <separator data-vertical="" data-height="20"></separator> */}
            <Ripple>
              <Link
                data-contain=""
                data-drag="none"
                data-type="group"
                to="/Components"
                data-interactive=""
                data-over-color="neutral-10"
                data-width="auto"
                data-background="main"
                data-color="main-text"
                data-ink-color="main-dark"
                data-space-horizontal="40"
                data-space-vertical="20"
                data-radius="15"
                data-direction="column"
                data-length="autofit-600"
                data-align="center"
              >
                {/* <TextReveal text={message} duration={1200} /> */}
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





        <group data-direction="column" >
          <picture
            data-radius="30"
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"
          >
            <img src={sampleImage_2} alt="" />
          </picture>

          <group data-direction="column" data-space="30" data-align="start">
            <group
              data-space="45"
              data-position="bottom"
              data-backdrop="20-adaptive"
              data-width="auto"
              data-radius="15"
            >
              <group data-gap="40" >
                <text
                  data-wrap="wrap"
                  data-font-type="hero"
                  data-line="1"
                  data-text-size="15"
                  data-max-length="800"
                >
                  Crafted <br></br>for growth.
                </text>
                <separator
                  data-vertical="adaptive"
                  data-height=""
                ></separator>
                <group
                  data-width="auto"
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                >
                  <text
                    data-wrap="wrap"
                    data-line="1.5"
                    data-length="240"
                    data-text-size="15"
                  >
                    Adapting from prototypes to enterprise apps, evolving with
                    every project.
                  </text>
       </group>

            


              </group>
            </group>
          </group>
        </group>






        <group
         
          data-space="adaptive-30-50"
          data-gap="20"
          data-direction="column"
          data-align="start"
          // data-text-align="center"
          // data-align="center"
        >
          <text
            data-wrap="wrap"
            data-font-type="hero"
            data-ellipsis=""
            data-line="1"
            data-text-size="48"
            data-text-clamp="48"
            data-max-length="800"
          >
            Basic structures
          </text>

          <text
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
            data-opacity="70"
            data-text-size="15"
          >
          Check out some component demos below—just a glimpse of what's possible!
          </text>



         

        </group>


        {/* <Popover
            placement="mouse"
            content={
              <group
                data-animation-name="appear-bottom"
                data-fill-mode="backwards"
                data-animation-duration="1.25"
              >
                <RichThemePicker pickerType="primary" />
              </group>
            }
            data-space="5"
            data-radius="10"
            data-backdrop="10"
            data-width="auto"
          >
            <group
              data-max-length="300"
              data-position="center"
              data-cursor="pointer"
            >
              <group data-space="10%">
                <group data-height="fit">
                  <group
                    data-position="absolute"
                    data-border="inset"
                    data-right="100%"
                    data-height="fit"
                    data-disabled="true"
                    data-radius="full"
                  ></group>

                  <Ripple>
                    <group
                      data-index="4"
                      data-contain=""
                      data-ink-color="main-dark"
                      data-ratio="1:1"
                      data-background="main"
                      data-color="main-text"
                      data-radius="full"
                    >
                      <ThemNameDisplay/>
                    </group>
                  </Ripple>
                </group>
              </group>
              <group
                data-position="absolute"
                data-disabled="true"
                data-height="fit"
                data-index="4"
              >
                <picture
                //    data-brightness="adaptive"

                // data-background="grey-light"
                //    data-min-height="300"
                >
                  <img src={sampleImage_3} alt="" />
                </picture>
              </group>
            </group>
          </Popover> */}







        <group
          data-gap="5"
          data-type="grid"
          data-grid-template="200"
          data-weight="600"
          // data-contain=""
          
        >



          {linksArray.map((link, index) => (
            <Ripple key={index}>
              <Link
                data-drag="none"
                to={link.to}
                key={index}
                data-interactive=""
                data-over-color="neutral"
                data-ink-color="neutral"
                data-width="auto"
                data-type="group"
                data-contain=""
                data-min-height="300"
                data-radius="30"
                data-direction="column"
                data-wrap="no"
                data-background={link.color ? "main" : "adaptive-gray"}
                data-color={link.color ? "main-text" : ""}
              >
                <group
                  data-index="1"
                  data-direction="column"
                  data-gap="10"
                  data-space="40"
                  data-height="fit"
                  data-wrap="no"
                >
                  <text
                    data-text-size="medium"
                    data-weight="700"
                    data-wrap="preline"
                    data-ellipsis=""
                  >
                    {link.title}
                  </text>

                  {link.content}

                  <text
                    data-position="bottom"
                    // data-text-size="72"
                    //  data-height="50"
                    data-contain=""
                    //   data-weight="700"
                    data-opacity="30"
                  >
                    0{index + 1}
                  </text>
                  <text
                    data-ellipsis=""
                    data-wrap="wrap"
                    data-line="1.3"
                    data-max-length="300"
                  //  data-opacity="60"
                  >
                    {link.description}
                  </text>
                </group>
              </Link>
            </Ripple>
          ))}
        </group>


        <group
        //  data-width="auto"
          data-space="adaptive-30-50"
          data-gap="20"
          data-direction="column"
          // data-text-align="center"
          // data-align="center"

          
        >
          <text
            data-wrap="wrap"
            data-font-type="hero"
            data-ellipsis=""
            data-line="1"
            data-text-size="48"
            data-text-clamp="48"
            data-max-length="800"
          >
            Reach Out
          </text>

          <text
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
            data-opacity="70"
            data-text-size="15"
          >
            Got a question or just want to say hi? Drop me a message, and I'll get back to you soon.
          </text>
        </group>


        <group data-direction="column" >
          <picture
            data-radius="30"
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"
          >
            <img src={sampleImage_4} alt="" />
          </picture>

          <group data-direction="column" data-space="30" data-align="start">
            <group
              data-space="45"
              data-position="bottom"
             data-backdrop="20-adaptive"
              data-width="auto"
              data-radius="15"
            >
              <group data-gap="40">
                <text
                  data-wrap="wrap"
                  data-font-type="hero"
                  data-line="1"
                  data-text-size="15"
                  data-max-length="800"
                >
                  Driven by <br></br>passion.
                </text>
                <separator
                  data-vertical="adaptive"
                  data-height=""
                ></separator>
                <group
                  data-width="auto"
                  data-direction="column"
                  data-align="start"
                  data-gap="20"
                >
                  <text
                    data-wrap="wrap"
                    data-line="1.5"
                    data-length="400"
                    data-text-size="15"
                  >
                                  Let's connect! Whether you're curious about my work, looking to
                collaborate, or simply want to reach out, feel free to explore
                or drop a message.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>



        <group
          

          data-contain=""
       
          data-direction="column"
   data-gap="30"
                    
        >
            <group data-gap="30" data-type="grid" data-grid-template="200">
              <group
                data-direction="column"
                data-width="auto"
                data-align="start"
              >
                {links.map((link, index) => (
                  <Link
                    data-drag="none"
                    data-width="auto"
                    data-type="group"
                    data-interactive=""
                    data-over-color="neutral"
                    data-space="15"
                    data-radius="10"
                    data-weight="600"
                    to={link.url}
                    key={index}
                  >
                    <text data-ellipsis="">{link.name}</text>
                  </Link>
                ))}
              </group>

              <group
                data-direction="column"
                data-width="auto"
                data-align="start"
              >
                <Link
                  data-drag="none"
                  data-width="auto"
                  data-type="group"
                  data-interactive=""
                  data-over-color="neutral"
                  data-space="15"
                  data-radius="10"
                  data-weight="600"
                  to="https://calendly.com/sargsyanrubens/15-minute-chat"
                  target="_blank"
                >
                  <text>Reserve 15-Minute Call</text>
                </Link>
                <Link
                  data-drag="none"
                  data-width="auto"
                  data-type="group"
                  data-interactive=""
                  data-over-color="neutral"
                  data-space="15"
                  data-radius="10"
                  data-weight="600"
                  to="https://t.me/sargsyanruben"
                  target="_blank"
                >
                  <text>Message Me</text>
                </Link>
              </group>
            </group>





        </group>

   

        <separator data-horizontal=""></separator>
            <group data-space="15">
              <group data-direction="column" data-gap="5" >
                <text data-weight="700">
                  Copyright {currentYear}, Credbone.
                </text>
                <text data-opacity="60">
            

                Last updated on {buildInfo.buildDateTime}
                </text>
              </group>
            </group>




      </group>
    </group>
  );
};
export default Components;
