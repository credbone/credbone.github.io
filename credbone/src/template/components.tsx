import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Ripple from "../components/Ripple";

import { IconSearch } from "../components/icon/credIcons";
import { useModal } from "../components/Modal";

// import sampleImage_2 from "../styles/images/samples/wide_res_66.webp";
// import sampleImage_3 from "../styles/images/samples/res_82.webp";
import sampleImage_4 from "../styles/images/samples/wide_res_66.webp";

import buildInfo from "../buildInfo.json";
// import ThemePicker from "./themePicker";
import { linksArray } from "./utils/OverviewData";
// import DemoThemeToggle from "../components/DemoThemeToggle";

import Content from "./content";
import SearchFloating from "../pages/search/SearchFloating";
import { ChevronRight } from "lucide-react";

const links = [
  { name: "Get Started", url: "../Components/Overview" },
  { name: "About The Project", url: "/About" },
  { name: "Search", url: "/Search" },
];

const currentYear: number = new Date().getFullYear();

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

  return (
    <group
      data-scroll=""
      data-timeline-name="main-scroll"
      data-index="1"
      ref={viewRef}
    >
      <group
        data-space="adaptive-30-50"
        data-gap="50"
        data-direction="column"
        data-max-length="1200"
        data-contain=""
      >
        <group
          data-width="auto"
          data-space="adaptive-20-50"
          data-direction="column"
          data-gap="50"
          data-index="3"
          data-wrap="no"
        >


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

            <group data-width="auto" data-align="center" data-wrap="no">
            <Ripple>
              <group
                data-over-color="neutral-10"
                data-ink-color="neutral"
                data-index="2"
                data-contain=""
                data-drag="none"
                data-type="group"
                data-cursor="pointer"
                data-interactive=""
                data-width="auto"
                data-background="text"
                data-color="main-background"
                data-space="20"
                data-radius="60"
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
                <group
                  //data-height="fit"
                  data-align="center"
                  data-justify="center"
                  data-length="30"
                  data-height="30"
                >
                  <IconSearch stroke={1.5} />
                </group>
              </group>
            </Ripple>

            <group data-width="auto" data-margin-horizontal="-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="42"
                viewBox="0 0 24 42"
                fill="none"
              >
                <path
                  data-fill="text"
                  d="M24 41.999C22.8167 40.4234 21.7622 38.7454 20.8545 36.9795C19.1046 33.575 15.8279 31 12 31C8.17214 31 4.89544 33.575 3.14551 36.9795C2.23779 38.7454 1.1833 40.4234 0 41.999V0C1.18349 1.57576 2.23767 3.25436 3.14551 5.02051C4.89544 8.42495 8.17214 11 12 11C15.8279 11 19.1046 8.42495 20.8545 5.02051C21.7623 3.25436 22.8165 1.57576 24 0V41.999Z"
                />
              </svg>
            </group>

            <Ripple>
              <Link
                data-contain=""
                data-drag="none"
                data-type="group"
                to="/Components"
                data-interactive=""
                data-over-color="neutral-10"
                data-ink-color="neutral"
                data-width="auto"
                data-background="text"
                data-color="main-background"
                data-space="20"
                //  data-space-horizontal="50"
                //   data-space-vertical="20"

                //    data-direction="column"
                data-length="autofit-600"
                data-align="center"
                data-radius="60"
                data-gap="10"
                data-wrap="no"
              >
                <group
                  data-space-horizontal="10"
                  data-direction="column"
                  data-width="auto"
                  data-contain=""
                >
                  <text data-opacity="30">Discover</text>
                  <text
                    data-weight="700"
                    //  data-wrap="wrap"
                    data-ellipsis=""
                  >
                    Get Started
                  </text>
                </group>

                <group
                  data-position="right"
                  data-height="30"
                  data-align="center"
                  data-justify="center"
                  data-interact=""
                  data-length="30"

                 // data-adaptive="desktop"
                >
                  <ChevronRight strokeWidth={1.5} />
                </group>
              </Link>
            </Ripple>
          </group>


          <text
            data-wrap="wrap"
            data-max-length="280"
            data-line="1.5"
            data-opacity="70"
           // data-weight="500"
            //  data-text-size="medium-small"
          >
            A hybrid, atomic, and declarative design system that brings
            flexibility, control and speed to projects.
          </text>

        <Content />

        </group>





        <group
          data-space="adaptive-30-50"
          data-gap="10"
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
            data-max-length="240"
            data-line="1.5"
            data-opacity="70"
            // data-text-size="medium-small"
          >
            Check out some component demos below—just a glimpse of what's
            possible!
          </text>
        </group>

        <group data-gap="10" data-type="grid" data-grid-template="200">
          {linksArray.map((link, index) => (
            <Ripple key={index}>
              <Link
                data-drag="none"
                to={link.to}
                key={index}
                data-interactive=""
                data-over-color="neutral"
                data-ink-color="neutral"
                // data-width="auto"
                data-type="group"
                data-contain=""
                data-min-height="300"
                data-radius="40"
                data-direction="column"
                data-wrap="no"
                data-background={
                  link.color
                    ? "main"
                    : index === 0
                      ? "adaptive-gray"
                      : undefined
                }
                data-color={link.color ? "main-text" : undefined}
                data-border={link.color ? "1-primary" : "inset"}
                data-index={link.color ? "2" : undefined}
                data-elevation={index === 7 ? "2" : undefined}
              >
                {link.new === "true" && (
                  <group
                    data-background="red"
                    data-space="3"
                    data-position="absolute"
                    data-width="auto"
                    data-radius="5"
                    data-right="30"
                    data-top="30"
                    data-index="2"
                  ></group>
                )}

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
                    //  data-max-length="300"
                    data-opacity="60"
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
          data-gap="10"
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
            data-max-length="300"
            data-line="1.5"
            data-opacity="70"
            //   data-text-size="medium-small"
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
                    //data-text-size="medium-small"
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
            <text data-wrap="wrap" data-weight="700">
              Copyright {currentYear}, Credbone.
            </text>
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
