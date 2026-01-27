import React from "react";
import Count from "../components/Coutner";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import sectionImage from "../styles/images/samples/wide_res_67.webp";
import Ripple from "../components/Ripple";
import TemplatePageHeader from "./TemplatePageHeader";

const SnackbarContent = (
  <group>
    <text>
      <text data-opacity="60">Snackbar will dismiss in ... </text>
      <text data-weight="700">
        <Count from={30} to={0} duration={3000} />
      </text>
    </text>
  </group>
);

const Snackbar: React.FC = () => {
  const { addSnackbar } = useSnackbar();

  const messages = [
    "⭐ Welcome! You're now connected.",
    "Hey there! New notification incoming.",
    "Alert! Important message ahead. ⭐",
    "Success! Button clicked successfully. 🎉",
    "Heads up! A different message for you. ",
    "Hello! How are you today? ",
    "Reminder: Meeting at 2 PM tomorrow.",
    "Don't forget to check your email.",
    "You've got a new follower! ",
    "Congratulations! You've reached a milestone.",
  ];

  const handleSeriesClick = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];

    const messageNode = <text data-ellipsis="">{randomMessage}</text>;
    addSnackbar(messageNode, 3000, "custom-source", true);
  };

  return (
    <group data-space="30" data-gap="30" data-align="start">



      <TemplatePageHeader
        title="Snackbar"
        description="Snackbars provide brief notifications about app activities at the
          bottom of the screen."
        version="2.0.0"
        type="Component"
        descriptionProps={{"data-length":"300"}}
      />



      <group>
        <picture
          data-radius="40"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
        >
          <img src={sectionImage} alt="" />
        </picture>

        <group data-space="30" data-width="auto" data-direction="column" data-align="start" data-gap="30">
          <group
            data-direction="column"
            data-radius="15"
            data-background="main-background"
            data-contain=""
            data-align="start"
            data-space="30"
            data-gap="20"
          >


            <group>
              <text data-wrap="wrap" data-line="1.5" data-max-length="300">
                Click to view a sample snackbar. The default duration is 3000
                milliseconds.
              </text>
            </group>
          </group>


<group

data-contain=""
              data-width="auto"
              data-interactive=""
             data-over-color="neutral"
              data-space="15"
              data-space-horizontal="40"
              data-radius="30"
              data-cursor="pointer"
              data-background="text"
              data-color="main-background"
              onClick={() => addSnackbar(<>{SnackbarContent}</>)}
            >
              <text data-weight="700" data-ellipsis="">
                Show Snackbar
              </text>
            </group>


        </group>
      </group>

      <group
        data-column-gap="15"
        data-align="start"
        data-max-length="800"
        data-type="column"
      >


        <group
          data-background="context"
          data-width="auto"
          data-height="auto"
          data-radius="30"
          data-border=""
          data-contain=""
          data-direction="column"
          data-space="20"
          data-gap="15"
          data-weight="600"
        >
          <group>
            <group
              data-width="auto"
              data-interactive=""
              data-interact="popover"
              data-space="15"
              data-radius="10"
              data-cursor="pointer"
              onClick={() => addSnackbar(<>{SnackbarContent}</>)}
            >
              <text data-ellipsis="">Show Snackbar</text>
            </group>
          </group>
          <separator data-horizontal=""></separator>
          <group>
            <group
              data-width="auto"
              data-interactive=""
              data-interact="popover"
              data-space="15"
              data-radius="10"
              data-cursor="pointer"
              onClick={handleSeriesClick}
            >
              <text data-ellipsis="">Replace Snackbars From This Source</text>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Snackbar;
