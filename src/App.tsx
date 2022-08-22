import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/main";
import SpeciesDetail from "./pages/selectSpecies";
import Sightings from "./pages/sightings";
import Species from "./pages/species";
import Use from "./pages/use";
import Register from "./pages/register";
import ResponsiveAppBar from "./components/navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/theme";
import SpeciesDataForm from "./pages/submitSpeciesData";
import SightingDetail from "./pages/selectSighting";
import SightingDataForm from "./pages/submitSightingData";
import UserLogin from "./pages/userLogin";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <ResponsiveAppBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sightings" element={<Sightings />} />
          <Route
            path="sightings/sightingpage/:sightingId"
            element={<SightingDetail />}
          />
          <Route
            path="sightings/submitSightingData"
            element={<SightingDataForm />}
          />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:organismId" element={<SpeciesDetail />} />
          <Route path="submitSpeciesData" element={<SpeciesDataForm />} />
          <Route path="/how%20To%20Use" element={<Use />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userLogin" element={<UserLogin />} />
        </Routes>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand"
          rel="stylesheet"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
