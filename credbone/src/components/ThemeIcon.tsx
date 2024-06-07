import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const ThemeIcon = () => {
  const { themeMode } = useTheme();
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  let icon;
  switch (themeMode) {
    case "light":
      icon = "light_mode";
      break;
    case "dark":
      icon = "dark_mode";
      break;
    case "auto":
      icon = prefersDarkMode ? "dark_mode" : "light_mode";
      break;
    default:
      icon = "auto_mode";
      break;
  }

  return <icon data-length="30">{icon}</icon>;
};

export default ThemeIcon;
