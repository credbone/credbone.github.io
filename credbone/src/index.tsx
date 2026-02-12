import React from "react";
import ReactDOM from "react-dom/client";
import "./configs/customTags";
//import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { isDesktop, isMobile } from "react-device-detect";
import { ThemeProvider } from "./components/ThemeProvider";
import MetaThemeColorUpdater from "./components/MetaThemeColorUpdater";

import SnackbarContainer from "./components/snackbar/SnackbarContainer";
import { FontSizeProvider } from "./components/FontSizeProvider";

isMobile && document.documentElement.classList.add("mobile");
isDesktop && document.documentElement.classList.add("desktop");


// Universal PWA detection
const isPWA = (): boolean => {
  return (
    window.matchMedia("(display-mode: standalone)").matches || // Android & modern browsers
    (window.navigator as any).standalone === true // iOS Safari
  );
};

isPWA() && document.documentElement.classList.add("pwa");

const TooltipContainer = () => (
  <div id="tooltip-container" data-max-length="fit" />
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <SnackbarContainer>
    <ThemeProvider>
      
  <MetaThemeColorUpdater />

<FontSizeProvider>
      <App />
      </FontSizeProvider>
      <TooltipContainer />

      
    </ThemeProvider>
    </SnackbarContainer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
