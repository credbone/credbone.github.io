import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { defaultPrimaryColor, defaultSecondaryColor, getPalette, ColorPalette, getCSSByPalette } from "../styles/skin";

type ThemeContextType = {
  theme: ColorPalette;
  setTheme: React.Dispatch<React.SetStateAction<ColorPalette>>;
  themeMode: string;
  setThemeMode: (mode: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorPalette>(() => getPalette(defaultPrimaryColor, defaultSecondaryColor));
  const [themeMode, setThemeMode] = useState<string>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'auto';
  });

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

  useEffect(() => {
    updateTheme(themeMode);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const updateTheme = (mode: string) => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.toggle('dark-mode', mode === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
