  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";

  import Ripple from "../components/Ripple";
  import TextReveal from "../components/TextReveal";
  import { IconSearch } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";
import SearchComponent from "../pages/search/searchComponent";



  const linksArray = [






    { title: "Icons\n& Shapes", description: "Beautifully crafted and carefully designed icons.", to: "/Home/Icons", },
    { title: "Colors\n& Shades", description: "Color system can assist in crafting a color palette...", to: "/Home/Colors", },
    { title: "Cards\n& Lists", description: "Organized containers for content display.", to: "/Home/CardsAndList", },
    { title: "Tooltip\n& Popover", description: "Provide additional information and context on hover or focus.", to: "/Home/TooltipAndPopover", },
    { title: "Checkbox\n& Switches", description: "Customizable toggle elements for user selection.", to: "/Home/CheckboxSwitchers", },
    { title: "Demos\n& Samples", description: "Sample dashboards for quick insights.", to: "/Home/QuickDemos", },
    { title: "Modals\n& Alerts", description: "Customizable modal component supporting various sizes, triggers, and animations.", to: "/Home/Modal", },

    //{ picture: "", long: "", color: "", title: "Dashboard", description: "Demo features a simple dashboard interface designed for monitoring hardware.", to: "/Home/Dashboard" },
    // { picture: "", long: "", color: "", title: "Navigation & Tabs", description: "Elements to navigate between different views or sections within an app.", to: "/Home/Navigation", },
    // { picture: "", long: "", color: "", title: "Input & Forms", description: "Deals with input fields and form-related user interface elements.", to: "/Home/InputsAndForms", },
    // { picture: "", long: "", color: "", title: "Layout & Switches", description: "Concerns the arrangement and organization of elements in a design, often utilizing grids.", to: "/Home/Layout" },
    // { picture: "", long: "", color: "", title: "Buttons", description: "Allow users to take actions, and make choices, with a single tap.", to: "/Home/Buttons", },
  ];

  const phrases = [
    "hi",
    "hello",
    "hey",
    "what's new?",
    "hey there",
    "what's up?",
  ];

  const Components: React.FC = () => {
    const { openModal, closeModal } = useModal(); 
    const [message, setMessage] = useState<string>("");

    const modalConfig = {
      "data-radius": "none",
      "data-margin": "0",
      "data-background": "none",
      "data-elevation": "none",
      "data-width": "fit",
      "data-scroll": "",
      "data-min-height": "fit",
      "data-contain": "scroll",
    };


    useEffect(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setMessage(randomPhrase);
    }, []);

    return (
      <group data-scroll="" data-index="1">
        <group
          data-direction="column"
          data-space-vertical="30"
          //  data-gap="15"
          data-wrap="no"
          data-align="start"
          data-position="center"
          //  data-width="auto"
          data-max-length="1600"
        >
          <group data-space-horizontal="30">
            <group
              data-direction="column"
              data-gap="30"
              data-radius="20"
              data-space-vertical="40"
              // data-background="main"
              // data-color="main-text"
              data-align="center"
              data-justify="center"
              data-text-align="center"
              // data-min-height="300"
            >
              <group
                data-direction="column"
                data-gap="10"
                // data-background="main"
                // data-color="main-text"
                data-align="center"
                data-justify="center"
                data-text-align="center"
              >
                <text
                  data-weight="700"
                  data-text-size="48"
                  //data-wrap="wrap"
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
              </group>

              <group data-width="auto" data-gap="15" data-align="center">
                <Ripple>
                  <Link
                    data-contain=""
                    data-drag="none"
                    data-type="group"
                    to="/Home/Typeface"
                    data-interactive=""
                    data-width="auto"
                    data-background="main"
                    data-color="main-text"
                    data-ink-color="main-dark"
                    data-space-horizontal="40"
                    data-space-vertical="20"
                    data-radius="15"
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
                <separator data-vertical="" data-height="20"></separator>

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
                      openModal(
                        "modal-2",
                        "Customized Popup",
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
                            //   data-background="main-background-top"
                            onClick={() => closeModal("modal-2")}
                          ></group>

                          <group
                            data-max-length="600"
                            data-space="10"
                            data-border=""
                            data-background="context"
                            data-radius="15"
                            data-gap="10"
                            data-elevation="2"
                            data-animation-name="appear-top"
                            data-fill-mode="backwards"
                            data-animation-duration="2"
                          >
                            <SearchComponent showRandomTagsByDefault={false}/>
                          </group>
                        </group>,
                        false,
                        false,
                        modalConfig,
                        0
                      )
                    }
                  >
                    <IconSearch></IconSearch>
                  </group>
                </Ripple>
              </group>
            </group>
          </group>

          <group
            data-space-horizontal="30"
            data-border="no"
            data-background="none"
            data-align="start"
            data-gap="15"
          >
            <group
              data-gap="15"
              data-type="grid"
              data-grid-template="180"
              data-weight="600"
            >
              {linksArray.map((link, index) => (
                <Ripple key={index}>
                  <Link
                    data-drag="none"
                    to={link.to}
                    key={index}
                    data-interactive=""
                    data-width="auto"
                    data-type="group"
                    data-contain=""
                    data-min-height="300"
                    data-radius="20"
                    data-border="outline"
                    data-direction="column"
                    data-wrap="no"
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
                        data-text-size="72"
                        data-height="50"
                        data-contain=""
                        data-weight="100"
                        data-opacity="10"
                      >
                        {" "}
                        0{index + 1}
                      </text>

                      <text
                        data-text-size="medium"
                        data-weight="700"
                        // data-wrap="wrap"
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
                      {/* <group  data-position="bottom" data-height="5" data-radius="10"   data-background={link.color ? link.color : "adaptive-gray"}></group> */}
                    </group>
                  </Link>
                </Ripple>
              ))}
            </group>


{/* <group data-gap="15">


<group data-radius="20" data-border="outline" data-space="30" data-fit='3'>
              <group
                data-index="1"
                data-direction="column"
                data-gap="15"
                data-height="fit"
                data-wrap="no"
              >

                <text
                  data-text-size="48"
                  data-weight="700"
                  data-wrap="preline"
                  data-ellipsis=""
                >
                 Buttons
                </text>
                <text
                  data-ellipsis=""
                  data-wrap="wrap"
                  data-line="1.5"
                  data-max-length="300"
                  data-opacity="60"
                >
                  Allow users to take actions, and make choices, with a single tap.
                </text>
              </group>
            </group>

            <group data-radius="20" data-border="outline" data-space="30" data-fit='1.5'>
              <group
                data-index="1"
                data-direction="column"
                data-gap="15"
                data-height="fit"
                data-wrap="no"
              >

                <text
                  data-text-size="48"
                  data-weight="700"
                  data-wrap="preline"
                  data-ellipsis=""
                >
                 Navigation & Tabs
                </text>
                <text
                  data-ellipsis=""
                  data-wrap="wrap"
                  data-line="1.5"
                  data-max-length="300"
                  data-opacity="60"
                >
                  Beautifully crafted and carefully designed icons.
                </text>
              </group>
            </group>

</group> */}

          </group>
        </group>
      </group>
    );
  };
  export default Components;
