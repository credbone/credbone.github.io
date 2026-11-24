import React from "react";
import Count from "../components/Counter";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";
import sectionImage from "../styles/images/samples/wide_res_68.webp";

import TemplatePageHeader from "./TemplatePageHeader";
import SnackbarPropsDemo from "./SnackbarPropsDemo";

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

  return (
    <group data-space="30"  data-align="start">



      <TemplatePageHeader
        title="Snackbar"
        description="Snackbars provide brief notifications about app activities at the
          bottom of the screen."
        version="2.0.0"
        type="Component"
        descriptionProps={{"data-length":"300"}}
      />

<group data-height="30"></group>

      <group>
        <picture
          data-radius="50"
          data-contain=""
          data-brightness="adaptive"
          data-background="grey-light"
          data-position="absolute"
        >
          <img src={sectionImage} alt="" />
        </picture>

        <group data-space="15" data-width="auto" data-direction="column" data-align="start" data-gap="15">
          <group
            data-direction="column"
            data-radius="35"
            data-background="main-background"
            data-contain=""
            data-align="start"
            data-space="15"
            data-gap="20"
            data-backdrop="20-adaptive"
          >


            <group data-space="15">
        <text data-wrap="wrap" data-line="1.5" data-max-length="400">
          Set what the snackbar says, how long it stays and where it shows. The
          code follows the controls below, and Preview lets you try the result.
        </text>
            </group>


  {/* <group

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
            </group> */}



          </group>





        </group>
      </group>

      <SnackbarPropsDemo />
    </group>
  );
};
export default Snackbar;
