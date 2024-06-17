// src/themeUtils.ts

export const updateMetaThemeColor = (themeMode: string, prefersDarkMode: boolean): void => {
  let metaTag = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
  if (!metaTag) {
    metaTag = document.createElement('meta') as HTMLMetaElement;
    metaTag.name = "theme-color";
    document.head.appendChild(metaTag);
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

  metaTag.content = themeColor;
};