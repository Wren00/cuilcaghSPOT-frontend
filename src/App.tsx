import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './components/about';
import Contact from './components/contact';
import Home from './components/main';
import Sightings from './components/sightings';
import Species from './components/species';
import Use from './components/use';
import ResponsiveAppBar from './components/navbar';

function App() {

  return (

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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </div>
  );
}

export default App;
