import React from "react";
import sampleImage from "../styles/images/samples/res_52.jpg";


import { useModal } from "../components/Modal";
import Search from "../pages/search/search";

const Modal: React.FC = () => {
  const { openModal } = useModal(); // Use the modal hook to control modal behavior

  const modalData = [
    { title: "Regular Modal", content: "Welcome to our platform! Enjoy your stay.", toolbar: false, header: true },
    { title: " Modal with no Header", content: "Oops! Something went wrong. Please try again.", toolbar: true, header: false },
    { title: "Info Modal", content: "Don't forget to update your profile for a better experience.", toolbar: false, header: true },
    { title: "Modal With no header and Toolbar", content: <group data-max-length="400"><Search/></group>, toolbar: false, header: false },
    { title: "Success Modal", content: <group data-length="400"><Modal/></group>, toolbar: true, header: false },
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

          </group>
        </group>
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
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  
                  onClick={() => openModal(
                    title,
                    <group data-space="20"><text>{content}</text></group>,
                    header,
                    toolbar
                  )}
                >
                  <text>{title}</text>
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
