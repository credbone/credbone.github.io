import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { defaultPrimaryColor, defaultSecondaryColor, getPalette, ColorPalette, getCSSByPalette, isColorLight } from "../styles/skin";

type ThemeContextType = {
  theme: ColorPalette;
  setTheme: React.Dispatch<React.SetStateAction<ColorPalette>>;
  themeMode: string;
  setThemeMode: (mode: string) => void;
  resetTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorPalette>(() => getPalette(defaultPrimaryColor, defaultSecondaryColor));
  const [themeMode, setThemeMode] = useState<string>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
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

    // Update luminance data attributes
    const primaryLuminance = isColorLight(theme.colorPrimary) ? 'light' : 'dark';
    const secondaryLuminance = isColorLight(theme.colorSecondary) ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-main-color-luminance', primaryLuminance);
    document.documentElement.setAttribute('data-secondary-color-luminance', secondaryLuminance);
  }, [theme]);

  useEffect(() => {
    updateTheme(themeMode);
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const updateTheme = (mode: string) => {
    document.documentElement.setAttribute('data-theme', mode);
  //  document.documentElement.classList.toggle('dark-mode', mode === 'dark');
  };

  const resetTheme = () => {
    localStorage.removeItem('selectedColors');
    localStorage.removeItem('themeMode');
    setTheme(getPalette(defaultPrimaryColor, defaultSecondaryColor));
    setThemeMode('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeMode, setThemeMode, resetTheme }}>
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