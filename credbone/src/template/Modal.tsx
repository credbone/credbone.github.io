import React from "react";
import sampleImage from "../styles/images/samples/res_50.jpg";

import { useModal } from "../components/Modal";
import Search from "../pages/search/search";
import TooltipPopover from "./TooltipPopover";
import StuckReporter from "../components/StuckReporter";

const Modal: React.FC = () => {
  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior

  const sampleContent = (
    <group
      data-space="40"
      data-max-length="400"
      data-max-height="fit"
      data-scroll=""
    >
      <text data-wrap="wrap" data-line="20">
        This is a <b>Modal Component</b> built with <b>React</b> that provides a
        flexible modal dialog with custom content, headers, and toolbars. It
        uses context to manage multiple modals and ensures only the topmost
        modal can be interacted with when multiple are open.
      </text>
    </group>
  );


  

  const  modalData = [
    { title: "Basic Modal", content: sampleContent, toolbar: false, header: true, },
    { title: " Modal with no Header", content: sampleContent, toolbar: true, header: false, },
    { title: "Info Modal", content: ( <group data-max-length="600" data-max-height="fit" data-scroll=""> <TooltipPopover /> </group> ), toolbar: false, header: true, },
    { title: "Modal With no header and Toolbar", content: ( <group data-max-length="400" data-max-height="fit" data-contain=""> <Search /> </group> ), toolbar: false, header: false, },
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
              openModal(
                `modal-${index}`,
                title,
                <group data-max-height="fit" data-contain="">
                  {content}
                </group>,
                header,
                toolbar
              )
            }
          >
            <text>{title}</text>
          </group>
        </group>
      </group>
    ))}
  </group>
  )



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
          data-background="main"
          data-contain=""
          // data-dark=""
          data-align="center"
        >
          <picture data-position="absolute" data-opacity="30">
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
               // data-light=""
              >
              Modals are pop-up windows that capture attention, appearing after a user action. They display important content or options, requiring interaction before closing, ensuring focus on key tasks.
              </text>
            </group>
          </group>
        </group>

{demoModals}


      </group>
      <group
        data-size="medium"
        data-height="auto"
        data-max-height="fit"
        data-radius="10"
        data-elevation="1"
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
                  openModal(
                    "modal-1",
                    "Customized Popup",
                    <group data-max-height="fit"  data-max-length="600" data-scroll="">
                      {demoModals}
                      <group data-space="20" onClick={() => closeModal("modal-1")}> custom close button</group>
                    </group>,
                    false,
                    false,
            //        { "data-radius": "none", "data-background": "none", "data-elevation":"none" }
                  )
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
                  openModal(
                    "modal-1",
                    "Customized Popup",
                    <group data-max-length="500" data-position="center">
                      <group data-height="120"></group>
                      <group data-space-horizontal="30">
                        <text data-weight="700" data-text-size="xx-large" data-wrap="wrap" data-ellipsis="">
                          This is Custom Modal Window
                        </text>
                      </group>

                      <group data-height="20"></group>
                      
                      <StuckReporter>
          {(isSticky) => (




                      
                      <group   data-duration=".125" data-space-horizontal={isSticky ? "50" : "30"} data-space={isSticky ? "20" : ""}  data-sticky="top"   >
                      
                            <group
                              data-background="main"
                              data-color="main-text"
                              data-interactive=""
                              data-width="auto"
data-cursor="pointer"
                              data-space="15"
                              
              //  data-elevation={isSticky ? "1" : ""}
                data-radius="10"
                              //  data-duration=".125"
                              onClick={() => closeModal("modal-1")}
                            >
                              <text data-weight="700">
                              Custom Close Button
                            </text>
                            </group>
                           
                      </group>

          )}
        </StuckReporter>
                      <TooltipPopover/>
                      
                    </group>,
                    false,
                    false,
                    { "data-radius": "none", "data-margin":"0", "data-background": "none", "data-elevation":"none", "data-width":"fit", "data-scroll":"", "data-contain":"scroll" }
                  )
                }

              >
                <text>Open Customized Popup</text>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
export default Modal;
