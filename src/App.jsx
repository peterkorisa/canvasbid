import Home from "./page/Home";
import Contact from "./page/Contactus";
import LoginForm from "./page/Login";
import RegisterForm from "./page/Register";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Artworks from "./admin/pages/artworks/Artworks";
import Users from "./admin/pages/users/Users";
import Auctions from "./admin/pages/auctions/Auctions";
import AdminMain from "./admin/pages/adminMain/AdminMain";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productpage from "./page/Product_page";
import Artists from "./artists/artists/Artists";
import ListArtwork from "./artists/listArtwork/ListArtwork";
import { useState } from "react";
import art1 from "./assets/art1.png";
import art2 from "./assets/art2.jpg";
import art3 from "./assets/art3.jpg";
import art4 from "./assets/art4.jpg";
import CreateArtwork from "./artists/createArtwork/CreateArtwork";
import ArtworksHome from "./page/ArtworksHome";
import Watchlist from "./page/Watchlist";
import { ErrorProvider } from "./component/ErrorDialog";

function App() {
  const tags = [
    "Abstract",
    "Realism",
    "Nature",
    "Portrait",
    "Digital",
    "Oil",
    "Watercolor",
    "Limited Edition",
    "Signed",
    "Modern",
  ];
  return (
    <ErrorProvider>
      <div className="">
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Admin Routes */}
          <Route path="/admin/" element={<Dashboard />}>
            <Route index element={<AdminMain />} />
            <Route path="artworks" element={<Artworks />} />
            <Route path="users" element={<Users />} />
            <Route path="auctions" element={<Auctions />} />
          </Route>
          {/* Artist Routes */}
          <Route path="/artists/" element={<Artists />}>
            <Route
              path="artworks"
              element={
                <ListArtwork tags={tags} />
              }
            />
            <Route
              path="create"
              element={<CreateArtwork tags={tags} />}
            />
          </Route>
          <Route path="/artworks" element={<ArtworksHome />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/product/:id" element={<Productpage />} />
        </Routes>
      </div>
    </ErrorProvider>
  );
}

export default App;
