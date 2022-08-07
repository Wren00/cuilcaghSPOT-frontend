import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './pages/about';
import Contact from './pages/contact';
import Home from './pages/main';
import Sightings from './pages/sightings';
import Species from './pages/species';
import Use from './pages/use';
import ResponsiveAppBar from './components/navbar';
import { ThemeProvider, createTheme } from '@mui/material';
import {theme} from "./components/theme";


function App() {

  return (
    <ThemeProvider theme={theme}>
   <div className="wrapper"> 
      <ResponsiveAppBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/sightings" element={<Sightings />} />
        <Route path="/species" element={<Species />} />
        <Route path="/how%20To%20Use" element={<Use />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <link href='https://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet'/>
    </div>
    </ThemeProvider>
  );
}

export default App;
