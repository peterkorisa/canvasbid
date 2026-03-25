import React from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/search_bar/Search_bar";
import ProductCard from "../component/prodect_card/Product_card";

const Artworks = () => {
  const cards = [
    { id: "1", title: "Abstract Art", image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
    { id: "2", title: "Ocean Painting", image: "https://img.daisyui.com/images/stock/photo-1504215680853-026ed2a45def.webp" },
    { id: "3", title: "Mountains", image: "https://img.daisyui.com/images/stock/photo-1500530855697-b586d89ba3ee.webp" },
    { id: "4", title: "City Lights", image: "https://img.daisyui.com/images/stock/photo-1492724441997-5dc865305da7.webp" },
    { id: "5", title: "Forest", image: "https://img.daisyui.com/images/stock/photo-1501785888041-af3ef285b470.webp" },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-[5rem]">
        <SearchBar />
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {cards.map((card) => (
          <ProductCard
            key={card.id}
            id={card.id}
            title={card.title}
            image={card.image}
          />
        ))}
      </div>
    </>
  );
};

export default Artworks;