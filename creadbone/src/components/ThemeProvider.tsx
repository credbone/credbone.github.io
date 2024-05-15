import React, { createContext, useState, useEffect } from "react";
import { defaultPrimaryColor, defaultSecondaryColor, getPalette, ColorPalette, getCSSByPalette } from "../styles/skin";

export const ThemeContext = createContext<{
  theme: ColorPalette;
  setTheme: React.Dispatch<React.SetStateAction<ColorPalette>>;
} | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the theme state using default colors from skin.ts
  const [theme, setTheme] = useState<ColorPalette>(() => getPalette(defaultPrimaryColor, defaultSecondaryColor));

  useEffect(() => {
    const storedColors = localStorage.getItem("selectedColors");
    if (storedColors) {
      const parsedColors = JSON.parse(storedColors);
      setTheme(parsedColors);
    }
  }, []);

  useEffect(() => {
    const cssContent = getCSSByPalette(theme);
    let styleElement = document.querySelector("#theme-styles") as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "theme-styles";
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = cssContent;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
