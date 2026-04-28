import Home from "./page/Home";
import Contact from "./page/Contactus";
import LoginForm from "./page/Login";
import RegisterForm from "./page/Register";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Artworks from "./admin/pages/artworks/Artworks";
import Users from "./admin/pages/users/Users";
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
  const [artworks, setArtworks] = useState([
    {
      id: 1,
      artistName: "Laila Mostafa",
      title: "Sunset Dreams",
      description: "Abstract painting inspired by sunset colors.",
      initialPrice: 500,
      auctionStartTime: "2026-03-25 18:00:00",
      auctionEndTime: "2026-03-30 18:00:00",
      category: "Abstract",
      tags: ["sunset", "abstract"],
      images: [art1],
      status: "pending",
    },
    {
      id: 2,
      artistName: "Youssef Samy",
      title: "Ocean Whisper",
      description: "A calm view of the ocean with soft tones.",
      initialPrice: 700,
      auctionStartTime: "2026-03-26 12:00:00",
      auctionEndTime: "2026-03-31 12:00:00",
      category: "Nature",
      tags: ["ocean", "water", "calm"],
      images: [art2],
      status: "accepted",
    },
    {
      id: 3,
      artistName: "Nour Khaled",
      title: "City Lights",
      description: "Modern city at night with vibrant lights.",
      initialPrice: 900,
      auctionStartTime: "2026-03-27 15:00:00",
      auctionEndTime: "2026-04-01 15:00:00",
      category: "Urban",
      tags: ["city", "night", "lights"],
      images: [art3],
      status: "pending",
    },
    {
      id: 4,
      artistName: "Omar Adel",
      title: "Golden Desert",
      description: "Desert landscape with golden sand dunes.",
      initialPrice: 600,
      auctionStartTime: "2026-04-01 15:00:00",
      auctionEndTime: "2026-04-01 15:00:00",
      category: "Landscape",
      tags: ["desert", "sand", "nature"],
      images: [art4],
      status: "accepted",
    },
  ]);
  
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
          
          </Route>
          {/* Artist Routes */}
          <Route path="/artists/" element={<Artists />}>
            <Route
              path=""
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
