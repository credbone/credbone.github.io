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

import TitleUpdater from "./components/TitleUpdater";
import Search from "./pages/search/search";
import Components from "./template/components";



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


          </group>
        </group>
        <SnackbarContainer>
          <view data-vertical="">
            <VerticalNav data-adaptive="desktop" />
            <Routes>
              <Route path="/*" element={<Navigate replace to="/Home" />} />
              <Route path="/Home/*" element={<Template />} />
              <Route path="/Home" element={<Components />} />

              <Route path="/About" element={<About />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Search" element={<Search />} />
            </Routes>
          </view>
          <div id="popover-container" data-max-length="fit"></div>
        </SnackbarContainer>
      </Router>
    </>
  );
}

export default App;
