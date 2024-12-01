import React from "react";
import Popover from "../components/popover";
import RichThemePicker from "./richThemePicker";

const ThemePickerNav: React.FC = () => {
  return (
    <group
    data-position="bottom"
    // data-sticky="bottom"
  >
    <group data-space-horizontal="30">
      <separator data-horizontal=""></separator>
    </group>

    <group data-space="30" data-background="main-background">
      <Popover
        placement="top"
        content={
          <group
            data-animation-name="appear-bottom"
            data-fill-mode="backwards"
            data-animation-duration="1.25"
            data-length="700"
          >
            <group
              data-gap="5"
              data-wrap="wrap"
              data-direction="column"
            >
              <RichThemePicker />
            </group>
          </group>
        }
        data-space="5"
        data-radius="10"
        data-backdrop="10"
        data-width="auto"
      >
        <group
          data-cursor="pointer"
          data-radius="10"
          data-align="center"
          data-interactive=""
          data-gap="10"
          data-space="15"
        >
          <text data-weight="700" data-ellipsis="">
            Change Theme
          </text>
          {/* 
          <group data-interact="" data-length="50"  data-display="none" data-position="right" data-radius="3"  data-contain="">

<group data-background="white" data-length="10" data-height="20"><group data-length="10" data-height="20"  data-justify="center" data-background="main-light" data-align="center"></group></group>
<group data-length="10" data-height="20"  data-justify="center" data-background="main" data-align="center"></group>
<group data-length="10" data-height="20"  data-justify="center" data-background="main-dark" data-align="center"></group>
<group data-length="10" data-height="20"  data-justify="center" data-background="secondary-dark" data-align="center"></group>
<group data-length="10" data-height="20"  data-justify="center" data-background="secondary" data-align="center"></group>

</group> */}
        </group>
      </Popover>
    </group>
  </group>
  );
};
export default ThemePickerNav;
