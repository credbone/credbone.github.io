import React from "react";
import Count from "../components/Coutner";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";




const SnackbarContent = (
  <group>
    <text>
      <text data-opacity="60">Snackbar will dismiss in ... </text>
      <text data-weight="700">
        <Count
          from={30}
          to={0}
          duration={3000}
          //  direction="down"
        />
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
          //  data-color="main"
          data-ellipsis=""
        >
          Snackbar
        </text>
        <text data-wrap="wrap" data-length="300" data-line="1.5">
          Snackbars provide brief notifications about app activities at the
          bottom of the screen.
        </text>
      </group>

      <group
        data-column-gap="15"
        data-align="start"
        data-max-length="800"
        data-type="column"
      >
        <group
          data-direction="column"
          data-radius="15"
          data-border=""
          data-contain=""
          data-background="context"
        >
          <group
            data-contain=""
            data-align="center"
            // data-dark=""
          >
            <group
              data-space="30"
              data-gap="20"
              data-direction="column"
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
                  data-background="main"
                  data-color="main-text"
                  onClick={() => addSnackbar(<>{SnackbarContent}</>)}
                >
                  <text data-weight="700" data-ellipsis="">
                    Show Snackbar
                  </text>
                </group>
              </group>

              <group>
                <text data-wrap="wrap" data-line="1.5" data-max-length="300">
                  Click to view a sample snackbar. The default duration is 3000
                  milliseconds.
                </text>
              </group>
            </group>

            {/* <group data-contain="" data-height="120">
                <picture data-min-length="300" data-contain="" data-ratio="1:1">
                  <img src={sampleImage_2} alt="" />
                </picture>
              </group> */}
          </group>
        </group>

        <group
          data-background="context"
          data-width="auto"
          data-height="auto"
          data-radius="15"
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
