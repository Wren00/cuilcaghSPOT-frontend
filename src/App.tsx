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
import ConfirmedSightingDetail from "./pages/selectConfirmedSighting";
import UserProfile from "./pages/userProfile";
import UserPosts from "./pages/userPosts";
import AllUnverifiedSightings from "./pages/allUnverifiedSightings";
import AllConfirmedSightings from "./pages/allConfirmedSightings";
import PostById from "./components/getPostById";
import AddPost from "./pages/addPost";
import Settings from "./pages/settings";

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
          <Route path="/sightings" element={<Sightings />} />
          <Route
            path="sightings/confirmedSightingPage/:sightingId"
            element={<ConfirmedSightingDetail />}
          />
          <Route
            path="sightings/submitSightingData"
            element={<SightingDataForm />}
          />
          <Route path="/species" element={<Species />} />
          <Route path="/species/:organismId" element={<SpeciesDetail />} />
          <Route path="submitSpeciesData" element={<SpeciesDataForm />} />
          <Route
            path="/sightings/allUnverifiedSightings"
            element={<AllUnverifiedSightings />}
          />
          <Route
            path="/sightings/allConfirmedSightings"
            element={<AllConfirmedSightings />}
          />
          <Route path="/guide" element={<Use />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/posts" element={<UserPosts />} />
          <Route path="/posts/:id" element={<PostById />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/species/post" element={<SpeciesDataForm />} />
          <Route path="/settings/:id" element={<Settings />} />
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
