import React, { useState } from "react";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";

import { Icons } from "./utils/materialIcons";
import { useModal } from "../components/Modal";
 import { isDesktop } from "react-device-detect";

const MaterialIcons = () => {
  const { addSnackbar } = useSnackbar();
  const { openModal, closeModal } = useModal(); // Use the modal hook to control modal behavior

  // const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  // no default selection
  const [selectedIcon, setSelectedIcon] = useState<string>(
    Icons.length > 0 ? Icons[0].name : ""
  );

// Snackbar for copy feedback
const showCopySnackbar = (iconName: string) => {
  addSnackbar(
    <group data-align="center" data-gap="10">
      <icon data-height="auto" data-length="30">{iconName}</icon>
      <text data-ellipsis="">Copied To Clipboard</text>
    </group>,
    2000,
    "icon-source",
    true
  );
};






// Modal content structure
const getModalContent = (iconName: string, iconLabel: string) => (
  <group
    data-animation-name="appear-bottom"
    data-fill-mode="backwards"
    data-animation-duration={2.25}
    data-max-height="fit"
    data-contain=""
    data-direction="column"
    data-align="center"
    data-background="main-background"
  >
    <group
      data-space="30"
      data-direction="column"
      data-background="context"
      data-align="center"
      data-gap="20"
    >
      <text data-wrap="wrap">{iconLabel}</text>
      <icon data-icon-size="x-large" >{iconName}</icon>
    </group>




    <separator data-horizontal=""></separator>
    <group data-space="20" data-type="grid" data-gap="10">
      {isDesktop && (
        <group
          data-contain=""
          data-space="15"
          data-interactive=""
          data-cursor="pointer"
          data-radius="10"
          data-width="auto"
          data-align="center"
          data-direction="column"
          data-background="highlight"
          onClick={() => handleIconCopy(iconName)}
        >
          <text data-weight="600">Copy Name</text>
        </group>
      )}
      <group
        data-contain=""
        data-space="15"
        data-interactive=""
        data-cursor="pointer"
        data-radius="10"
        data-width="auto"
        data-align="center"
        data-direction="column"
        data-background="main"
        data-color="main-text"
        onClick={() => closeModal(`modal-${iconName}`)}
      >
        <text data-weight="600">Done</text>
      </group>
    </group>
  </group>
);


const handleIconCopy = (iconName: string) => {
  setSelectedIcon(iconName);
  showCopySnackbar(iconName);


  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(iconName)
      .then(() => {
        showCopySnackbar(iconName); 
      })
      .catch(() => {
        addSnackbar(
          <text data-ellipsis="">Unable to copy icon to clipboard.</text>,
          2000,
          "icon-source",
          true
        );
      });
  } else {
    // Fallback for unsupported Clipboard API on desktop
    addSnackbar(
      <text data-ellipsis="">Clipboard not supported in this browser.</text>,
      2000,
      "icon-source",
      true
    );
  }
};

const handleIconClick = (iconName: string, iconLabel: string) => {
  setSelectedIcon(iconName);
  
  openModal(
    `modal-${iconName}`,
    iconLabel,
    getModalContent(iconName, iconLabel),
    false,
    false
  );
};


  const isSelected = (iconName: string) => {
    return selectedIcon === iconName;
  };

  return (
    <>
      {Icons.map((icon, index) => (
        <Ripple key={index}>
          <group
            key={index}
            onClick={() => handleIconClick(icon.name, icon.label)}
            className={isSelected(icon.name) ? "selected" : ""}
            data-ink-color={isSelected(icon.name) ? "main-dark" : ""}
            data-background={isSelected(icon.name) ? "main" : ""}
            data-color={isSelected(icon.name) ? "main-text" : ""}
            data-name="icon-demo"
            data-contain=""
            data-interactive=""
            data-space="15"
            data-cursor="pointer"
            data-ratio="1:1"
            data-radius="10"
          >
            <group
              data-index="1"
              data-justify="center"
              data-align="center"
              data-gap="20"
              data-direction="column"
            >
              <icon data-icon-size="mini">{icon.name}</icon>
              <text data-light="" data-ellipsis="">
                {icon.Title}
              </text>
            </group>
          </group>
        </Ripple>
      ))}
    </>
  );
};

export default MaterialIcons;
