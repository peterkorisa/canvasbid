//pending artwork

import { useState } from "react";
import PendingArtworksTable from "../../components/pendingArtworksTable/PendingArtworksTable";
import art1 from "../../../assets/art1.png";
import art2 from "../../../assets/art2.jpg";
import art3 from "../../../assets/art3.jpg";
import art4 from "../../../assets/art4.jpg";
const Artworks = () => {
  const [pendingArtworks, setPendingArtworks] = useState([
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
      status: "pending",
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
      status: "pending",
    },
  ]);
  const handleAccept = (id) => {
    setPendingArtworks((prev) =>
      prev.map((art) => (id === art.id ? { ...art, status: "accepted" } : art)),
    );
    //send updated to backend
    // const art = pendingArtworks.find((a) => a.id === id);
  };
  const handleDecline = (id) => {
    setPendingArtworks((prev) =>
      prev.map((art) => (id === art.id ? { ...art, status: "declined" } : art)),
    );
    //send updated to backend
    // const art = pendingArtworks.find((a) => a.id === id);  };
  };

  return (
    <div>
      <PendingArtworksTable
        pendingArtworks={pendingArtworks}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
      />
    </div>
  );
};

export default Artworks;
