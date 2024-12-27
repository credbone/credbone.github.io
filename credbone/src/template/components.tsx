import React  from "react";
import { Link } from "react-router-dom";

import Ripple from "../components/Ripple";

import { IconSearch } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";
import SearchComponent from "../pages/search/searchComponent";


import sampleImage_2 from "../styles/images/samples/wide_res_01.jpg";
import sampleImage_3 from "../styles/images/samples/res_001.png";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";


const links = [
  { name: "Get Started", url: "../Components/Overview" },
  { name: "About The Project", url: "/About" },
  { name: "Search", url: "/Search" }
];


const currentYear: number = new Date().getFullYear();

const linksArray = [


  { title: "Colors\n& Shades", description: "Color system can assist in crafting a color palette...", to: "/Components/Colors", },
  //{ title: "Icons\n& Shapes", description: "Beautifully crafted and carefully designed icons.", to: "/Components/Icons", },
  { title: "Cards\n& Lists", description: "Organized containers for content display.", to: "/Components/CardsAndList", },
  { title: "Tooltip\n& Popover", description: "Provide helpful details on hover, focus, or click.", to: "/Components/TooltipAndPopover", },
  { title: "Checkbox\n& Switches", description: "Customizable toggle elements for user selection.", to: "/Components/CheckboxSwitchers", },
  { title: "Demos\n& Samples", description: "Various quick-designed apps, built for demo purposes.", to: "/Components/QuickDemos", },
  { title: "Modals\n& Alerts", description: "Dynamic modals for messages, forms, and notifications.", to: "/Components/Modal", },
  { title: "And\nmore...", description: "Explore a variety of other components and features.", to: "/Components/Overview", }

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
    "data-modal-backdrop":"dark"
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
        <group data-gap="50" data-align="center">
          <group data-width="auto" data-direction="column" data-gap="50">
            <text
              // data-wrap="wrap"
              // data-ellipsis=""

              data-line="1"
              data-text-size="96"
              data-text-clamp="96"
              data-max-length="800"
              data-font-type="hero"
            >
              Designed to<br></br> evolve and<br></br> adapt.
            </text>

            <group>
              <text
                data-wrap="wrap"
                data-max-length="400"
                data-line="1.5"
                data-opacity="70"
                data-text-size="15"
              >
                This space is about personal experiments and demos, featuring a
                collection of carefully crafted UI components, each designed
                with attention to detail and a deep understanding of UI
                principles
              </text>
            </group>

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
              <separator data-vertical="" data-height="20"></separator>
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
                  data-length='autofit-600'
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



          <Popover
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


<group data-max-length="500" data-cursor="pointer">
            <group data-space="10%">
<Ripple>
<group
                data-contain=""
                data-ink-color="main-dark"
                data-ratio="1:1"
                data-background="main"
                data-radius="full"
              ></group> 
</Ripple>
            </group>
            <group data-position="absolute" data-disabled="" data-height="fit">
              <picture
                //    data-brightness="adaptive"

                // data-background="grey-light"
              //    data-min-height="300"
              >
                <img src={sampleImage_3} alt="" />
              </picture>
            </group>
          </group>

                </Popover>



        </group>

        <separator data-horizontal=""></separator>
        <group>
          <text
            data-wrap="wrap"
            data-font-type="hero"
            data-ellipsis=""
            data-line="1"
            data-text-size="64"
            data-text-clamp="64"
            data-max-length="800"
          >
            Basic <br></br>structures
          </text>
        </group>

        <group
          //      data-space-horizontal="30"
          data-border="no"
          data-background="none"
          //    data-max-length="810"
        >
          <group
            data-gap="20"
            data-type="grid"
            data-grid-template="180"
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
                  data-radius="20"
                  data-direction="column"
                  data-wrap="no"
                  data-background="adaptive-gray"
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
                      data-text-size="large"
                      data-weight="700"
                      data-wrap="preline"
                      data-ellipsis=""
                    >
                      {link.title}
                    </text>
                    <text
                      data-position="bottom"
                      // data-text-size="72"
                      //  data-height="50"
                      data-contain=""
                      data-weight="700"
                      data-opacity="20"
                    >
                      0{index + 1}
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

        <group data-contain="" data-radius="20" data-direction="column">
          <group data-direction="column">
            <picture
              data-brightness="adaptive"
              // data-position="absolute"
              data-background="grey-light"
              data-min-height="300"
            >
              <img src={sampleImage_2} alt="" />
            </picture>

            <group
              data-position="absolute"
              data-direction="column"
              data-height="fit"
              data-wrap="no"
            >
              <group
                data-space="50"
                data-position="bottom"
                data-dark=""
                data-width="auto"
              >
                <text
                  data-wrap="wrap"
                  data-font-type="hero"
                  data-line="1"
                  data-text-size="64"
                  data-text-clamp="64"
                  data-max-length="800"
                >
                  Crafted <br></br>for growth.
                </text>
              </group>
            </group>
          </group>

          <group
            data-gap="30"
            data-direction="column"
            //  data-background="context"
            data-space="30"
            data-background="highlight"
            data-align="start"
          >
            <group
              data-width="auto"
              data-direction="column"
              data-gap="20"
              data-space="15"
            >
              <text
                data-wrap="wrap"
                data-font-type="hero"
                data-line="1"
                data-text-size="64"
                data-text-clamp="64"
                data-max-length="800"
              >
                Powered by <br></br>passion.
              </text>
              <text
                data-wrap="wrap"
                data-max-length="400"
                data-opacity="40"
                data-line="20"
                data-text-size="15"
              >
                Let's connect! Whether you're curious about my work, looking to
                collaborate, or simply want to reach out, feel free to explore
                or drop a message.
              </text>
            </group>

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
            <separator data-horizontal=""></separator>
            <group data-space="10">
              <group>
                <text data-opacity="60">Copyright {currentYear}, Credbone. </text>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Components;
