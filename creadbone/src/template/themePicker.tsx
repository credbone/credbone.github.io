import React, { useState, useEffect } from "react";
import Scroll from "../components/scroll";
import Button from "../components/button";
import { getPalette, ColorPalette, getCSSByPalette } from "../styles/skin"; // Import getPalette and ColorPalette from your file

const ThemePicker: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<ColorPalette | null>(null);

  useEffect(() => {
    const storedColors = localStorage.getItem("selectedColors");
    if (storedColors) {
      const parsedColors = JSON.parse(storedColors);
      setSelectedColors(parsedColors);
      updateGlobalStyles(parsedColors);
    }
  }, []); // Empty dependency array to run only on mount

  const colors = [
    "#934f9a",
    "#544f9a",
    "#0066ff",
    "#598b7f",
    "#adbb88",
    "#ebd187",
    "#e89468",
    "#db6b5d",
    "#ff705e",
  ];

  const seccolors = [
    "#cbacd8",
    "#83749f",
    "#6cc5cc",
    "#06969e",
    "#055b5c",
    "#7da10d",
    "#dcda63",
  ];

  const handleColorSelection = (color: string, isPrimary: boolean) => {
    let primaryColor = selectedColors?.colorPrimary || "#544f9a";
    let secondaryColor = selectedColors?.colorSecondary || "#055b5c";

    if (isPrimary) {
      primaryColor = color;
    } else {
      secondaryColor = color;
    }

    const palette = getPalette(primaryColor, secondaryColor);
    setSelectedColors(palette);
    updateGlobalStyles(palette);
    localStorage.setItem("selectedColors", JSON.stringify(palette));
  };

  const updateGlobalStyles = (palette: ColorPalette) => {
    const cssContent = getCSSByPalette(palette);
    let styleElement = document.querySelector("#theme-styles") as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "theme-styles";
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = cssContent;
  };

  return (
    <group data-width="auto" data-snap-button="15" data-height="fit" data-contain="">
      <Scroll vertical>
        <group
          data-wrap="no"
          data-align="center"
          data-direction="column"
          data-name="themes"
        >
          <text data-space="20" data-orientation="vertical">
            Theme Primary Color
          </text>
          {colors.map((c) => (
            <Button
              key={c}
              mini
              rounded
             
              onClick={() => handleColorSelection(c, true)}
              data-background={selectedColors?.colorPrimary === c ? "main-lighter" : ""}
            >
              <icon>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill={c}></circle>
                </svg>
              </icon>
            </Button>
          ))}
          <text data-space="20" data-orientation="vertical">
            Secondary Color
          </text>
          {seccolors.map((c) => (
            <Button
              key={c}
              mini
              rounded
          
              onClick={() => handleColorSelection(c, false)}
              data-background={selectedColors?.colorSecondary === c ? "secondary-lighter" : ""}
            >
              <icon>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill={c}></circle>
                </svg>
              </icon>
            </Button>
          ))}
          <space data-height="10"></space>
        </group>
      </Scroll>
      {/* Render CSS variables using the selected colors */}
      {selectedColors && (
        <style>
          {getCSSByPalette(selectedColors)}
        </style>
      )}
    </group>
  );
};

export default ThemePicker;
