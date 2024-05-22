
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Template from "./template";
import About from "./pages/about";
import Navigation from "./components/navigation";
import { ThemeProvider }  from "./components/ThemeProvider";
import Settings from "./pages/settings";



function App() {
  return (
    <>
       <ThemeProvider>
        <Router>

          

          <group data-adaptive="mobile" data-adaptive-order="2" data-index="3" data-border="overprint" data-background="main-background">
          <group  data-type="grid" data-weight="600" data-grid-template="100" data-gap="5" data-space="10"  >
          <Navigation />
          </group>
</group>
        
          <view data-vertical="">
          <group data-adaptive="desktop" data-length="110" data-direction="column" data-space="10" data-gap="5" data-index="3" data-border=""  >
          <Navigation />
          </group>
          <Routes>
            
              <Route path='/*'  element={<Navigate replace to="/home" />} />
              <Route path='/Home/*' element={<Template />} />
              <Route path='/About' element={<About />} />
              <Route path='/Settings' element={<Settings />} />

            
        </Routes>
</view>
        </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
