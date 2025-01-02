import React from "react";

import { useModal } from "../components/Modal";
import TooltipPopover from "./TooltipPopover";
import StuckReporter from "../components/StuckReporter";
import ThemeToggle from "../components/themeToggle";
import RichThemePicker from "./richThemePicker";
import Ripple from "../components/Ripple";

import sampleImage from "../styles/images/samples/res_73.webp";

const Modal: React.FC = () => {
  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior

  const sampleContent = (
    <group
      data-space="30"
      data-max-length="400"
      data-max-height="fit"
      data-scroll=""
      data-gap="10"
    >
      <text
        data-line="20"
        data-color="main"
        data-text-size="medium"
        data-wrap="wrap"
        data-weight="600"
      >
        This is a Modal Component
      </text>
      <text data-line="20" data-wrap="wrap">
        It uses context to manage multiple modals and ensures only the topmost
        modal can be interacted with when multiple are open.
      </text>
    </group>
  );

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

  const modalData = [
    {
      title: "Basic Modal",
      content: sampleContent,
      toolbar: false,
      header: true,
    },
    {
      title: " Modal with no Header",
      content: sampleContent,
      toolbar: true,
      header: false,
    },
    {
      title: "Info Modal",
      content: sampleContent,
      toolbar: true,
      header: true,
    },
    //   { title: "Modal With no header and Toolbar", content: ( <group data-max-length="400" data-max-height="fit" data-contain="">  </group> ), toolbar: false, header: false, },
    // { title: "Success Modal", content: ( <group data-length="500" data-max-height="fit" data-scroll=""> {demoModals} </group> ), toolbar: true, header: false, },
  ];

  const demoModals = (
    <group
      data-space="20"
      data-gap="15"
      data-weight="600"
      data-background="context"
    >
      {modalData.map(({ title, content, header, toolbar }, index) => (
        <group key={index} data-gap="15" data-name="separation">
          <separator data-horizontal=""></separator>
          <group>
            <group
              data-width="auto"
              data-interactive=""
              // data-interact="popover"
              data-space="15"
              data-radius="10"
              data-cursor="pointer"
              onClick={() =>
                openModal({
                  id: `modal-map-${index}`,
                  title: title,
                  content: (
                    <group data-max-height="fit" data-contain="">
                      {content}
                    </group>
                  ),
                  hasHeader: header,
                  hasToolbar: toolbar,
                })
              }
            >
              <text data-ellipsis="">Open {title}</text>
            </group>
          </group>
        </group>
      ))}
    </group>
  );

  return (
    <group data-space="30" data-gap="30" data-align="start">
      <group data-gap="30">
        <group
          data-direction="column"
          data-gap="10"
          data-background="adaptive-gray"
          data-radius="20"
          data-justify="end"
          data-space="30"
        >
          <group data-height="100" data-adaptive="desktop"></group>
          <text
            data-weight="700"
            data-text-size="xxx-large"
            data-wrap="wrap"
            data-ellipsis=""
          >
            Modal
          </text>
          <text data-wrap="wrap" data-length="600" data-line="1.5">
            Modals are pop-up windows that capture attention, appearing after a
            user action. They display important content or options, requiring
            interaction before closing, ensuring focus on key tasks.
          </text>
        </group>
      </group>

      <group
        data-gap="15"
        data-align="start"
        data-type="column"
        data-column-gap="15"
      >
        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="20"
          //       data-border=""
          data-contain=""
        >
          <group
            data-direction="column"
            data-min-height="400"
            data-justify="end"
          >
            <picture
              data-contain=""
              data-brightness="adaptive"
              data-position="absolute"
              data-background="grey-light"
            >
              <img src={sampleImage} alt="" />
            </picture>

            <group data-space="30">
              <group
                data-space="30"
                data-index="2"
                data-radius="15"
                data-contain=""
                //   data-backdrop="20-dark"
                data-background="main-background"
              >
                <group data-width="auto" data-gap="20">
                  <text data-wrap="wrap" data-line="1.5">
                    Component with customizable headers, toolbars, and
                    attributes, supporting global management via context and
                    handling open/close logic.
                  </text>
                  <Ripple>
                    <group
                      data-ink-color="main-deep"
                      data-contain=""
                      data-width="auto"
                      data-interactive=""
                      data-interact="popover"
                      data-space="15"
                      data-radius="10"
                      data-cursor="pointer"
                      data-background="main"
                      data-color="main-text"
                      onClick={() =>
                        openModal({
                          id: "modal-01",
                          title: "Sample Basic Popup",

                          content: (
                            <group
                              data-space="30"
                              data-direction="column"
                              data-gap="30"
                              data-align="start"
                            >
<group                               data-direction="column"
                              data-gap="10"
                              data-align="start">
<text data-weight="700" data-text-size="medium">
                                Example Modal
                              </text>
                              <text
                                data-wrap="wrap"
                                data-line="1.5"
                                data-length="300"
                              >
                                This is a sample modal to demonstrate how
                                content is displayed. Click the button below to
                                proceed.
                              </text>
  </group>
<Ripple>
<group
                               data-ink-color="main-deep"
data-contain=""
                                data-width="auto"
                                data-interactive=""
                                data-interact="popover"
                                data-space="15"
                                data-radius="5"
                                data-cursor="pointer"
                                data-background="main"
                                data-color="main-text"
                                onClick={() => closeModal("modal-01")}
                              >
                                <text data-weight="700">Confirm and Close</text>
                              </group>
</Ripple>
                            </group>
                          ),
                          //  hasHeader: false,
                          //   hasToolbar: false,
                          //    customAttributes: modalConfig,
                          // spacing: 0,
                        })
                      }
                    >
                      <text data-weight="700" data-ellipsis="">
                        Open Basic Modal
                      </text>
                    </group>
                  </Ripple>
                </group>
              </group>
            </group>
          </group>
        </group>

        <group
          data-height="auto"
          data-max-height="fit"
          data-radius="15"
          data-border=""
          data-contain=""
        >
          {demoModals}
        </group>

        <group
          data-size="medium"
          data-height="auto"
          data-max-height="fit"
          data-radius="15"
          data-border=""
          data-contain=""
        >
          <group
            data-space="20"
            data-gap="15"
            data-weight="600"
            data-background="context"
          >
            <group data-gap="15" data-name="separation">
              <separator data-horizontal=""></separator>
              <group>
                <group
                  data-width="auto"
                  data-interactive=""
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={() =>
                    openModal({
                      id: "modal-1",
                      title: "Customized Popup",

                      content: (
                        <group data-min-height="fit">
                          <group
                            data-position="absolute"
                            data-height="fit"
                            data-background="main-background-top"
                            onClick={() => closeModal("modal-1")}
                          ></group>

                          <group
                            data-position="center"
                            data-max-length="500"
                            data-space="30"
                            // data-gap="30"
                          >
                            <group data-gap="20">
                              <text
                                data-weight="700"
                                data-text-size="x-large"
                                data-wrap="wrap"
                                data-ellipsis=""
                                data-animation-name="appear-bottom"
                                data-fill-mode="backwards"
                                data-animation-duration="2.25"
                              >
                                Custom Modal Window
                              </text>

                              <text
                                data-animation-name="appear-bottom"
                                data-fill-mode="backwards"
                                data-animation-duration="2"
                                data-weight="600"
                                data-wrap="wrap"
                                data-line="20"
                                data-max-length="400"
                              >
                                This demo showcases a highly customizable modal
                                window, configured through dynamic props and
                                attributes. It includes a custom close button,
                                highlighting the modal's flexibility and
                                adaptability for various use cases.
                              </text>
                            </group>
                            <StuckReporter>
                              {(isSticky) => (
                                <group
                                  data-duration=".125"
                                  data-space-horizontal={isSticky ? "30" : ""}
                                  data-space-vertical="30"
                                  data-sticky="top"
                                >
                                  <Ripple>
                                    <group
                                      data-animation-name="appear-bottom"
                                      data-fill-mode="backwards"
                                      data-animation-duration="1.75"
                                      data-align="center"
                                      flex-direction="column"
                                      data-justify="center"
                                      data-min-length="140"
                                      data-ink-color="main-dark"
                                      data-background="main"
                                      data-color="main-text"
                                      data-interactive=""
                                      data-width="auto"
                                      data-cursor="pointer"
                                      data-space="15"
                                      data-space-horizontal="20"
                                      data-radius="30"
                                      data-contain=""
                                      onClick={() => closeModal("modal-1")}
                                    >
                                      <text data-weight="700">Close</text>
                                    </group>
                                  </Ripple>
                                </group>
                              )}
                            </StuckReporter>

                            <group
                              data-contain=""
                              data-radius="15"
                              data-elevation="2"
                              data-animation-name="appear-bottom"
                              data-fill-mode="backwards"
                              data-animation-duration="1.5"
                            >
                              {demoModals}
                            </group>
                            <group data-height="120"></group>
                          </group>
                        </group>
                      ),
                      hasHeader: false,
                      hasToolbar: false,
                      customAttributes: modalConfig,
                      spacing: 0,
                    })
                  }
                >
                  <text>Open Customized Demo</text>
                </group>
              </group>
            </group>

            <group data-gap="15" data-name="separation">
              <separator data-horizontal=""></separator>
              <group>
                <group
                  data-width="auto"
                  data-interactive=""
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={() =>
                    openModal({
                      id: "modal-2",
                      title: "Customized Popup",
                      content: (
                        <group data-min-height="fit">
                          <group
                            data-position="absolute"
                            data-height="fit"
                            data-background="main-background-top"
                            onClick={() => closeModal("modal-2")}
                          ></group>
                          <group data-max-length="500" data-position="center">
                            <group data-height="120"></group>
                            <group data-space-horizontal="30">
                              <group data-gap="20">
                                <text
                                  data-weight="700"
                                  data-text-size="x-large"
                                  data-wrap="wrap"
                                  data-ellipsis=""
                                >
                                  Custom Modal Window
                                </text>

                                <text
                                  data-weight="600"
                                  data-wrap="wrap"
                                  data-line="20"
                                  data-max-length="400"
                                >
                                  This demo showcases a highly customizable
                                  modal window, configured through dynamic props
                                  and attributes. It includes a custom close
                                  button, highlighting the modal's flexibility
                                  and adaptability for various use cases.
                                </text>
                              </group>
                            </group>

                            {/* <group data-height="20"></group> */}

                            <StuckReporter>
                              {(isSticky) => (
                                <group
                                  data-duration=".125"
                                  data-space-horizontal={isSticky ? "50" : "30"}
                                  data-space-top="20"
                                  data-sticky="top"
                                >
                                  <Ripple>
                                    <group
                                      data-ink-color="main-dark"
                                      data-background="main"
                                      data-color="main-text"
                                      data-interactive=""
                                      data-width="auto"
                                      data-cursor="pointer"
                                      data-space="15"
                                      data-space-horizontal="20"
                                      data-radius="30"
                                      data-contain=""
                                      onClick={() => closeModal("modal-2")}
                                    >
                                      <text data-weight="700">
                                        Custom Close Button
                                      </text>
                                    </group>
                                  </Ripple>
                                </group>
                              )}
                            </StuckReporter>
                            <TooltipPopover />
                          </group>
                        </group>
                      ),
                      hasHeader: false,
                      hasToolbar: false,
                      customAttributes: modalConfig,
                      spacing: 0,
                    })
                  }
                >
                  <text>Open Customized Popup</text>
                </group>
              </group>
            </group>

            <group data-gap="15" data-name="separation">
              <separator data-horizontal=""></separator>
              <group>
                <group
                  data-width="auto"
                  data-interactive=""
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={() =>
                    openModal({
                      id: "modal-2",
                      title: "Customized Popup",
                      content: (
                        <group data-min-height="fit">
                          <group
                            data-position="absolute"
                            data-height="fit"
                            data-background="main-background-top"
                            onClick={() => closeModal("modal-2")}
                          ></group>
                          <group
                            data-width="auto"
                            data-position="center"
                            data-direction="column"
                            data-align="center"
                            data-gap="30"
                            data-space="30"
                          >
                            <group
                              data-gap="20"
                              data-direction="column"
                              data-align="center"
                              data-width="auto"
                            >
                              <text
                                data-weight="700"
                                data-text-size="x-large"
                                data-wrap="wrap"
                                data-ellipsis=""
                                data-text-align="center"
                              >
                                Custom Apperance Settings
                              </text>

                              <text
                                data-text-align="center"
                                data-weight="600"
                                data-wrap="wrap"
                                data-line="20"
                                data-max-length="400"
                              >
                                This demo showcases a highly customizable modal
                                window, configured through dynamic props and
                                attributes.
                              </text>
                            </group>

                            <separator data-horizontal=""></separator>

                            <group>
                              <ThemeToggle />
                            </group>
                          </group>
                        </group>
                      ),
                      hasHeader: false,
                      hasToolbar: false,
                      customAttributes: modalConfig,
                      spacing: 0,
                    })
                  }
                >
                  <text>Open Custom Apperance Settings</text>
                </group>
              </group>
            </group>

            <group data-gap="15" data-name="separation">
              <separator data-horizontal=""></separator>
              <group>
                <group
                  data-width="auto"
                  data-interactive=""
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  onClick={() =>
                    openModal({
                      id: "modal-2",
                      title: "Customized Popup",
                      content: (
                        <group data-min-height="fit">
                          <group
                            data-position="absolute"
                            data-height="fit"
                            data-background="main-background-top"
                            onClick={() => closeModal("modal-2")}
                          ></group>

                          <group
                            data-width="auto"
                            data-position="center"
                            data-direction="column"
                            data-align="center"
                            data-gap="30"
                            data-space="30"
                          >
                            <group
                              data-gap="20"
                              data-direction="column"
                              data-align="center"
                              data-width="auto"
                            >
                              <text
                                data-weight="700"
                                data-text-size="x-large"
                                data-wrap="wrap"
                                data-ellipsis=""
                                data-text-align="center"
                              >
                                Custom Apperance Settings
                              </text>

                              <text
                                data-text-align="center"
                                data-weight="600"
                                data-wrap="wrap"
                                data-line="20"
                                data-max-length="400"
                              >
                                This demo showcases a highly customizable modal
                                window, configured through dynamic props and
                                attributes.
                              </text>
                            </group>

                            <separator data-horizontal=""></separator>
                            <group>
                              <RichThemePicker pickerType="primary" />
                            </group>
                          </group>
                        </group>
                      ),
                      hasHeader: false,
                      hasToolbar: false,
                      customAttributes: modalConfig,
                      spacing: 0,
                    })
                  }
                >
                  <text>Open Custom Theme Settings</text>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Modal;
