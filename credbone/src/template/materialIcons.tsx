
import React, { useState } from "react";
import Ripple from "../components/Ripple";
import { useSnackbar } from "../components/snackbar/SnackbarContainer";


import { Icons } from "./utils/materialIcons";
// import { isDesktop } from "react-device-detect";

const MaterialIcons = () => {
  const { addSnackbar } = useSnackbar();

  // const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  // no default selection
  const [selectedIcon, setSelectedIcon] = useState<string>(Icons.length > 0 ? Icons[0].name : "");

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);

    if (navigator.clipboard) {


      // if (isDesktop) {

      //   addSnackbar(
      //     <group data-align="center" data-gap="10">
      //      <icon data-height="auto" data-length="30">{iconName}</icon> <text data-ellipsis=""> Copied To Clipboard </text>
      //     </group>,
      //      2000,
      //      "icon-source",
      //      true
      //    );

      // };

   

      navigator.clipboard.writeText(iconName).catch((error) => {
        console.error("Failed to copy icon name to clipboard:", error);
      });
    } else {
      // console.error("Clipboard API is not supported in this environment.");
      addSnackbar(
        <text data-ellipsis="">Clipboard API not supported here</text>,
        2000,
        "icon-source",
        true
      );
    }
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
            onClick={() => handleIconClick(icon.name)}
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
