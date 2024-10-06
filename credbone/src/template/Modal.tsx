import React from "react";
import sampleImage from "../styles/images/samples/res_52.jpg";

import Ripple from "../components/Ripple";
import { useModal } from "../components/Modal";
import Miscellaneous from "./Miscellaneous";
import ThemeToggle from "../components/themeToggle";
import TooltipPopover from "./TooltipPopover";
import Cards from "./Cards";

const Modal: React.FC = () => {
  const { openModal } = useModal(); // Use the modal hook to control modal behavior

  const modalData = [
    {
      title: "Welcome Modal",
      content: "Welcome to our platform! Enjoy your stay.",
    },
    {
      title: "Error Modal",
      content: "Oops! Something went wrong. Please try again.",
    },
    {
      title: "Info Modal",
      content: "Don't forget to update your profile for a better experience.",
    },
    {
      title: "Confirmation Modal",
      content: "Are you sure you want to delete this item?",
    },
    {
      title: "Success Modal",
      content: "Your changes have been saved successfully.",
    },
  ];

  return (
    <group
      data-space="30"
      data-gap="15"
      data-align="start"
      data-type="column"
      data-column-gap="15"
    >
      <group
        data-size="medium"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
        data-contain=""
      >
        <group
          data-background="main-dark"
          data-contain=""
          // data-dark=""
          data-align="center"
        >
          <picture data-position="absolute">
            <img src={sampleImage} alt="" data-name="color-demo" />
          </picture>
          <group data-space="30" data-gap="30">
            <group data-color="main-text" data-direction="column" data-gap="10">
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-wrap="wrap"
                data-ellipsis=""
              >
                Modal
              </text>
              <text
                data-wrap="wrap"
                data-length="300"
                data-line="1.5"
                data-light=""
              >
                Buttons allow users to take actions, and make choices, with a
                single tap.
              </text>
            </group>
            <group data-length="fit">
              <Ripple>
                <group
                  data-wrap="no"
                  data-width="auto"
                  data-ink-color="main-dark"
                  data-align="center"
                  data-cursor="pointer"
                  data-contain=""
                  data-background="main"
                  data-color="main-text"
                  data-interactive=""
                  data-space-horizontal="30"
                  data-radius="15"
                  data-height="120"
                  data-gap="20"
                  //   onClick={handleOpenModal}
                >
                  <icon data-icon-size="large">arrow_outward</icon>
                  {/* <text
                  data-ellipsis=""
                  data-weight="700"
                  data-text-size="36"
                  data-index="1"
                >
                  Button
                </text> */}
                </group>
              </Ripple>
            </group>
          </group>
        </group>
        <group
          data-space="20"
          data-gap="15"
          data-weight="600"
          data-background="context"
        >
          {modalData.map(({ title, content }, index) => (
            <group data-gap="15" data-name="separation">
              <separator data-horizontal=""></separator>
              <group>
                <group
                  data-width="auto"
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  key={index}
                  onClick={() => openModal(title, <group data-space="30"><text data-wrap="wrap">{content}</text></group>
                  )}
                >
                  <text> Open {title}</text>
                </group>
              </group>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
};
export default Modal;
