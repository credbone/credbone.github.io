import React from "react";
import Ripple from "../components/Ripple";


import Popover from "../components/popover";
import Button from "../components/button";
import Tooltip from "../components/tooltip";
import Count from "../components/Coutner";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

const SimplePopover = (
  <group
    data-direction="column"
    data-gap="10"
    data-length="200"
    data-space="10"
  >
    <text data-weight="700" data-text-size="large">
      Simple Popover
    </text>
    <text data-wrap="wrap" data-line="1.5">
      The floating card pops up when clicking an element.
    </text>
  </group>
);

const SnackbarContent = (
  <group>
    <text>
      <text data-opacity="60">Snackbar will dismiss in ... </text>
      <text data-weight="700">
        <Count from={30} to={0} duration={3000} direction="down" />
      </text>
    </text>
  </group>
);

const ClosePopover = (
  <Popover
    data-elevation="2"
    placement="auto"
    data-width="auto"
    data-space="20"
    content={(closePopover) => (
      <group data-direction="column" data-gap="15">
        <text data-weight="700" data-text-size="large">
          Popover
        </text>
        <text data-line="1.5" data-wrap="wrap" data-max-length="300">
          Comparing with
          <Tooltip content="Sample Tooltip">
            <text data-weight="700"> Tooltip</text>
          </Tooltip>
          , besides information Popover card can also provide action elements
          like links and buttons.
        </text>
        <separator data-horizontal=""></separator>
        <Button onClick={closePopover} primary large text="Got It"></Button>
      </group>
    )}
  >
    <group data-width="auto">
      <Ripple>
        <group
          data-wrap="no"
          data-ink-color="main-dark"
          data-align="center"
          data-cursor="pointer"
          data-contain=""
          data-background="main"
          data-color="main-text"
          data-interactive=""
          data-space="15"
          data-radius="10"
         // data-height="80"
          data-gap="20"
        >
          <group data-index="1">
            <text data-weight="700" >Show Popover</text>
          </group>
        </group>
      </Ripple>
    </group>
  </Popover>
);

const SampleData = (
  <group
    data-length="600"
    data-height="auto"
    data-radius="10"
   data-border=""
    data-contain=""
  >
    <group data-direction="column" data-space="30" data-gap="15">
      <text
        data-weight="700"
        data-text-size="x-large"
        data-wrap="wrap"
        data-color="main"
        data-ellipsis=""
      >
        Rich Content
      </text>
      <text data-wrap="wrap" data-length="300" data-line="1.5" data-light="">
        Tooltips display informative text when users hover over, focus on, or
        tap an element, while a popover is a floating card that appears when
        users click or hover over an element.
      </text>
    </group>

    <group
    //  data-background="main"
      data-contain=""
      // data-dark=""
      data-align="center"
    >
      
<separator data-horizontal=""></separator>
      <group data-length="fit" data-space="30">
        {ClosePopover}
      </group>
    </group>
  </group>
);

const SampleTooltipData = (
  <group data-direction="column" data-space="20" data-gap="15">
    <text data-weight="700" data-text-size="xxx-large">
      <Count from={0} duration={1500} to={128} />
    </text>
    <text
      data-weight="700"
      data-text-size="large"
      data-wrap="wrap"
      data-ellipsis=""
    >
      Rich Contect
    </text>
    <text data-wrap="wrap" data-length="300" data-line="1.5" data-light="">
      Tooltips display informative text when users hover over, focus on, or tap
      an element.
    </text>
  </group>
);

const TooltipPopover: React.FC = () => {
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
       // data-background="main-background"
      >
        <text
          data-weight="700"
          data-text-size="xxx-large"
          data-wrap="wrap"
          data-color="main"
          data-ellipsis=""
        >
          Tooltip & Popover
        </text>
        <text data-wrap="wrap" data-length="600" data-line="1.5" data-light="">
          Tooltips display informative text when users hover over, focus on, or
          tap an element, while a popover is a floating card that appears when
          users click or hover over an element.
        </text>
      </group>

      <group data-gap="15">
        <group
          data-max-length="800"
          data-height="auto"
          data-radius="15"
         data-elevation="2"
         data-index="2"
          data-contain=""
            data-background="context"
        >
          <group
          //  data-background="main"
            data-contain=""
            // data-dark=""
            data-align="center"
            data-space="30"
            data-gap="20"
          >
              <group data-width="auto"  data-position="left">
                {ClosePopover}
              </group>

              <group>
                  <text data-wrap="wrap" data-line="1.5" data-max-length="400">
                  Click to view a sample popover. The default placement is on top, but if there's not enough space, it will find a way to display itself.
                  </text>
                </group>


          </group>
          <separator data-horizontal=""></separator>
          <group
            data-space="20"
            data-gap="15"
            data-weight="600"
          
          >
            <group>
              <Popover content={SimplePopover} data-width="auto">
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Simple Popover</text>
                </group>
              </Popover>
            </group>

            <separator data-horizontal=""></separator>

            <group>
              <Popover
                placement="auto"
                data-radius="20"
                data-space="0"
                data-elevation="2"
                content={SampleData}
                data-length="300"
              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Rich Popover</text>
                </group>
              </Popover>
            </group>
            <separator data-horizontal=""></separator>
            <group>
              {/* <Tooltip

                content="This is Simple Tooltip"

              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="5"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Simple Tooltip</text>
                </group>
              </Tooltip> */}
              <Tooltip
                // delay={0}
                placement="auto"
                data-radius="10"
                data-space="0"
                data-elevation="2"
                content={SampleTooltipData}
                data-length="300"
              >
                <group
                  data-interactive=""
                  data-interact="popover"
                  data-space="15"
                  data-radius="10"
                  data-cursor="pointer"
                  data-width="auto"
                >
                  <text decoration="">Show Rich Tooltip</text>
                </group>
              </Tooltip>
            </group>
          </group>
        </group>



{/* <group


data-max-length="800"
data-radius="15"

data-border=""
data-contain=""

>

<group

   data-background="context"
   data-dark=""

   data-text-size="14"
   data-user-select="text"


>


<pre data-scroll=""    data-space="30" >
  <code>
{`<Tooltip content="I am a tooltip" placement="right">
  <button>Hover over me</button>
</Tooltip>`}
  </code>
</pre>


</group>

<group     data-border=""  data-background="context"

   data-space="30">
<Tooltip content="I am a tooltip" placement="right">
  <button data-space="15" data-radius="10">Hover over me</button>
</Tooltip>
</group>

</group> */}

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
              data-space="30"
              data-direction="column"
              data-gap="10"
             
            >
              <text
                data-weight="700"
                data-text-size="xxx-large"
                data-wrap="wrap"
                data-color="main"
                data-ellipsis=""
              >
                Snackbar
              </text>
              <text
                data-wrap="wrap"
                data-line="1.5"
                data-light=""
                data-max-length="300"
              >
                Snackbars provide brief notifications about app activities at
                the bottom of the screen.
              </text>
            </group>

<separator data-horizontal=""></separator>

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
                    Click to view a sample snackbar. The default duration is
                    3000 milliseconds.
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
    </group>
  );
};
export default TooltipPopover;
