import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Ripple from "../components/Ripple";

import { IconSearch } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";


import sampleImage_2 from "../styles/images/samples/wide_res_66.webp";
import sampleImage_3 from "../styles/images/samples/res_82.webp";
import sampleImage_4 from "../styles/images/samples/wide_res_70.webp";

import buildInfo from "../buildInfo.json";
import ThemePicker from "./themePicker";
import { linksArray } from "./utils/OverviewData";
import DemoThemeToggle from "../components/DemoThemeToggle";
import SearchFloating from "../pages/search/searchFloating";



const links = [
  { name: "Get Started", url: "../Components/Overview" },
  { name: "About The Project", url: "/About" },
  { name: "Search", url: "/Search" },
];





const currentYear: number = new Date().getFullYear();

// const phrases = [
//   "Hi",
//   "Hello",
//   "Hey",
//   "What's new?",
//   "Hey there",
//   "What's up?",
// ];

const Components: React.FC = () => {


  const location = useLocation();
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);


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
    <group data-scroll="" data-index="1" ref={viewRef}>
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
            data-wrap="wrap"
            data-max-length="400"
            data-line="1.5"
            data-opacity="70"
            data-text-size="medium-small"
          >
            A hybrid, atomic, and declarative design system that brings
            flexibility, control and speed to projects.
          </text>

          <text
            // data-wrap="wrap"
            // data-ellipsis=""

            data-line="1"
          //  data-text-size="96"
            data-text-clamp="72"
            data-max-length="800"
            data-font-type="hero"
            data-wrap="wrap"
          >
            <text data-wrap="no">Designed to</text>
            <br></br> evolve and adapt.
          </text>



          <group data-width="auto" data-gap="5" data-align="center">
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
                data-radius="30"
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
                        

                                  data-animation-name="appear-top"
          data-fill-mode="backwards"
          data-animation-duration="2.75"

                          data-max-length="500"
                        //  data-border=""
                         // data-background="context"
                         // data-radius="25"
                          data-space="10"
                          data-gap="20"
                         // data-elevation="2"
                      //    data-animation-name="appear-top"
                      //    data-fill-mode="backwards"
                     //     data-animation-duration="2"
                        >
                          <SearchFloating showRandomTagsByDefault={false} />
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
                data-space-horizontal="50"
                data-space-vertical="20"
                data-radius="30"
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

        <group >
            <picture
              data-radius="60"
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              {/* <source media="(max-width: 700px)" srcSet={sampleImage_3}></source> */}
              <img src={sampleImage_3} data-adaptive="mobile" alt=""></img>
              <img src={sampleImage_2} data-adaptive="desktop" alt="" />
            </picture>

            <group data-space="30" data-gap="10" data-contain="" data-type="grid" data-grid-template="240">






              <group
              data-contain=""
                data-width="auto"
                data-backdrop="20-adaptive"
                // data-elevation="2-main-color"
                data-gap="30"
                data-space="10"
                data-radius="30"
                data-align="start"
                data-wrap="no"
                data-direction="column"
              >
                  <ThemePicker />
                {/* <separator
                  data-horizontal=""
              
                ></separator>
                <group
                  data-gap="20"
                  data-autofit="1-800"
                  data-length="200"
                  data-fit="1"
                >
                  <text data-wrap="wrap" data-line="1.5" data-text-size="medium-small">
                    Shape the system theme with flexible customization, bringing
                    a unified look across all elements
                  </text>


                </group> */}
              </group>







              <DemoThemeToggle/>


   
            </group>
          </group>

        <group
          data-space="adaptive-30-50"
          data-gap="20"
          data-direction="column"
          data-align="start"
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
            data-text-size="medium-small"
          >
            Check out some component demos below—just a glimpse of what's
            possible!
          </text>
        </group>

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
                data-radius="40"
                data-direction="column"
                data-wrap="no"
                data-background={link.color ? "main" : "adaptive-gray"}
                data-color={link.color ? "main-text" : ""}
              >
                <group
                  data-index="1"
                  data-direction="column"
                  data-gap="10"
                  data-space="50"
                  data-height="fit"
                  data-wrap="no"
                >
                  <text
                    data-text-size="medium"
                    data-font-type="hero"
                    data-line="1"
                    data-wrap="preline"
                   // data-ellipsis=""
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
                   // data-opacity="30"
                             data-font-feature="tnum"
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
            data-text-size="medium-small"
          >
            Got a question or just want to say hi? Drop me a message, and I'll
            get back to you soon.
          </text>
        </group>

        <group data-direction="column">
          <picture
            data-radius="50"
            data-brightness="adaptive"
            data-position="absolute"
            data-background="grey-light"

          >
            <img src={sampleImage_4} alt="" />
          </picture>

          <group data-direction="column" data-space="30" data-align="start">
            <group
              data-space="30"
              data-position="bottom"
              data-backdrop="20-adaptive"
              data-width="auto"
              data-radius="20"
            >
              <group data-gap="30" data-contain="">
                <text
                  data-wrap="wrap"
                  data-font-type="hero"
                  data-line="1"
                  data-text-size="medium-small"
                  data-max-length="800"
                >
                  Driven by <br></br>passion.
                </text>
                <separator data-vertical="adaptive" data-height=""></separator>
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
                    data-text-size="medium-small"
                  >
                    Let's connect! Whether you're curious about my work, looking
                    to collaborate, or simply want to reach out, feel free to
                    explore or drop a message.
                  </text>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group data-contain="" data-direction="column" data-gap="30">
          <group data-gap="30" data-type="grid" data-grid-template="200">
            <group data-direction="column" data-width="auto" data-align="start">
              {links.map((link, index) => (
                <Link
                  data-drag="none"
                  data-width="auto"
                  data-type="group"
                  data-interactive=""
                  data-over-color="neutral"
                  data-space-vertical="15"
                  data-space-horizontal="20"
                  data-radius="15"
                  data-weight="600"
                  to={link.url}
                  key={index}
                >
                  <text data-ellipsis="">{link.name}</text>
                </Link>
              ))}
            </group>

            <group data-direction="column" data-width="auto" data-align="start">
              <Link
                data-drag="none"
                data-width="auto"
                data-type="group"
                data-interactive=""
                data-over-color="neutral"
                  data-space-vertical="15"
                  data-space-horizontal="20"
                  data-radius="15"
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
                           data-space-vertical="15"
                  data-space-horizontal="20"
                  data-radius="15"
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
        <group data-space="15" data-direction="column" data-contain="">
          <group data-direction="column" data-gap="5">
            <text data-wrap="wrap" data-weight="700">Copyright {currentYear}, Credbone.</text>
            <text data-wrap="wrap" data-opacity="60">
              Last updated on {buildInfo.buildDateTime}
            </text>

          </group>
          <group data-height="20" data-adaptive="mobile-600"></group>
        </group>

      </group>

    </group>
  );
};
export default Components;
