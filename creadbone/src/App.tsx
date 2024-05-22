
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
        <Navigation />
          <Routes>
            
              <Route path='/*'  element={<Navigate replace to="/home" />} />
              <Route path='/Home/*' element={<Template />} />
              <Route path='/About' element={<About />} />
              <Route path='/Settings' element={<Settings />} />

            
        </Routes>
        </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
