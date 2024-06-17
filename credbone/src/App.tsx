import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Template from "./template";
import About from "./pages/about";


import Settings from "./pages/settings";
import { Navigation } from "./components/navigation";

import VerticalNav from "./template/verticalNav";
import SnackbarContainer from "./components/snackbar/SnackbarContainer";
import MetaThemeColorUpdater from "./components/MetaThemeColorUpdater";
import TitleUpdater from "./components/TitleUpdater";


function App() {

  return (
    <>
      <Router>

      <TitleUpdater />

        <group
          data-adaptive="mobile"
          data-adaptive-order="2"
          data-index="3"
          data-border="overprint"
          data-background="main-background"
        >
          <group
            data-wrap="no"
            data-gap="10"
            data-space="15"
            data-space-bottom="15-sab"
            data-justify="adaptive-space-around"
          >
            <Navigation />

            <group
              data-type="group"
              data-width="auto"
              data-name="nav-item"
              data-select-theme="main"
              data-radius="30"
              data-contain=""
              data-interactive=""
              data-weight="600"
            >
              <group
                data-justify="center"
                data-align="center"
                data-space="10"
                data-height="45"
                data-space-horizontal="15"
                data-wrap="no"
              >
                <icon data-length="30" data-height="auto">
                  Search
                </icon>
              </group>
            </group>
          </group>
        </group>
        <SnackbarContainer>
          <view data-vertical="">
            <VerticalNav data-adaptive="desktop" />
            <Routes>
              <Route path="/*" element={<Navigate replace to="/home" />} />
              <Route path="/Home/*" element={<Template />} />
              <Route path="/About" element={<About />} />
              <Route path="/Settings" element={<Settings />} />
            </Routes>
          </view>
          <div id="popover-container" data-max-length="fit"></div>
        </SnackbarContainer>
      </Router>
    </>
  );
}

export default App;
