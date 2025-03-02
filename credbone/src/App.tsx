import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";


import "./styles"


import Template from "./template";
import About from "./pages/about";

import Settings from "./pages/settings";


import VerticalNav from "./template/verticalNav";


import TitleUpdater from "./components/TitleUpdater";
import Search from "./pages/search/search";
import Components from "./template/components";
import Resume from "./pages/resume";
import { ModalProvider } from "./components/Modal";
import { NavProvider } from "./components/NavProvider";
import HorizontalNav from "./template/horizontalNav";
import Tools from "./pages/tools";

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
        <NavProvider> 
        <ModalProvider>
<HorizontalNav data-print="hide"/>
          <view data-vertical="">
          <VerticalNav  data-print="hide" /> 
            <Routes>
              <Route path="/*" element={<Navigate replace to="/" />} />
              <Route path="/Components/*" element={<Template />} />
              <Route path="/" element={<Components />} />



              <Route path="/*" element={<MainLayout />}>
                <Route path="About" element={<About />} />
                <Route path="Settings" element={<Settings />} />
                <Route path="Search" element={<Search />} />
                <Route path="Components" element={<Template />} />
                <Route path="Tools" element={<Tools />} />
              </Route>
              
              <Route path="/Resume" element={<Resume />} />
            </Routes>
          </view>
          <div id="popover-container" data-max-length="fit"></div>
        </ModalProvider>
        </NavProvider>
      </Router>
    </>
  );
}

export default App;
