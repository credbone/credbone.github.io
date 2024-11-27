import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
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
import Resume from "./pages/resume";
import { ModalProvider } from "./components/Modal";

const MainLayout = () => {
  return (
    <view
   //   data-space="30"
      data-scroll=""
      data-border="no"
      data-background="none"
    >
      <Outlet />
    </view>
  );
};

function App() {
  return (
    <>
      <Router>
        <TitleUpdater />
        <ModalProvider>
          <group
            data-adaptive="mobile"
            data-adaptive-order="2"
            data-index="3"
            data-border="overprint"
            data-background="main-background"
            data-print="hide"
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

          <view data-vertical="">
            <VerticalNav data-adaptive="desktop" data-print="hide" />
            <Routes>
              <Route path="/*" element={<Navigate replace to="/Home" />} />
              <Route path="/Home/*" element={<Template />} />
              <Route path="/Home" element={<Components />} />

              <Route path="/*" element={<MainLayout />}>
                <Route path="About" element={<About />} />
                <Route path="Settings" element={<Settings />} />
                <Route path="Search" element={<Search />} />
              </Route>
              
              <Route path="/Resume" element={<Resume />} />
            </Routes>
          </view>
          <div id="popover-container" data-max-length="fit"></div>
        </ModalProvider>
      </Router>
    </>
  );
}

export default App;
