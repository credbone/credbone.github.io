
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./template";
import About from "./pages/about";
import Navigation from "./components/navigation";


function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Template />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
