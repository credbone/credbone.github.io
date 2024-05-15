
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./template";
import About from "./pages/about";
import Navigation from "./components/navigation";
import ThemeProvider from "./components/ThemeProvider";


function App() {
  return (
    <>
       <ThemeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Template />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
