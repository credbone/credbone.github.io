import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider'; 

const MetaThemeColorUpdater: React.FC = () => {
  const { themeMode } = useTheme();
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaTag) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = "theme-color";
      document.head.appendChild(newMetaTag);
    }

    let themeColor: string;

    switch (themeMode) {
      case "light":
        themeColor = "#fbfbfb";
        break;
      case "dark":
        themeColor = "#191919";
        break;
      case "auto":
        themeColor = prefersDarkMode ? "#191919" : "#fbfbfb";
        break;
      default:
        themeColor = prefersDarkMode ? "#191919" : "#fbfbfb";
        break;
    }

    if (metaTag) {
      metaTag.content = themeColor;
    }
  }, [themeMode, prefersDarkMode]);

  return null;
};

export default MetaThemeColorUpdater;
