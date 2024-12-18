import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, MoonStar, Sun, SunMoon } from "lucide-react";

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
      icon = <Sun size={20}/>;
      break;
    case "dark":
      icon = <Moon size={20}/>;
      break;
    case "auto":
      icon = prefersDarkMode ? <MoonStar size={20}/> : <Sun size={20}/>;
      break;
    default:
      icon = <SunMoon size={20}/>;
      break;
  }

  return <icon data-length="30" data-type="interact">{icon}</icon>;
};

export default ThemeIcon;
