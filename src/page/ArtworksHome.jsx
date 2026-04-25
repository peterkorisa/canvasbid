import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import SearchBar from "../component/search_bar/Search_bar";
import ProductCard from "../component/prodect_card/Product_card";
import { LoadingSpinner } from "../component/LoadingSpinner";
import { artworkService } from "../services/artworkService";

const ArtworksHome = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const data = await artworkService.getAll();
        setArtworks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load artworks");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner text="Loading artworks..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-[5rem]">
        <SearchBar />
      </div>

      {error && (
        <div className="mx-auto mt-10 max-w-4xl p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
          Error: {error}
        </div>
      )}

      {artworks.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No artworks available yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-10 px-4 pb-10">
          {artworks.map((artwork) => (
            <ProductCard
              key={artwork.artworkId}
              id={artwork.artworkId}
              title={artwork.title}
              image={artwork.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ArtworksHome;