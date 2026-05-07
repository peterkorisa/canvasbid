import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import SearchBar from "../component/search_bar/Search_bar";
import ProductCard from "../component/prodect_card/Product_card";
import { LoadingSpinner } from "../component/LoadingSpinner";
import { artworkService } from "../services/artworkService";

const ArtworksHome = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const data = await artworkService.getAll();
        const deletedList = JSON.parse(localStorage.getItem('deletedArtworks') || '[]');
        const activeArtworks = (Array.isArray(data) ? data : []).filter(
          art => !deletedList.includes(art.artworkId || art.id)
        );
        setArtworks(activeArtworks);
      } catch (err) {
        setError(err.message || "Failed to load artworks");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";
  const tagsParam = searchParams.get("tags") || "";
  const tagsArray = tagsParam ? tagsParam.split(",").map(t => t.toLowerCase()) : [];

  const filteredArtworks = artworks.filter((artwork) => {
    if (query && !artwork.title?.toLowerCase().includes(query)) return false;
    if (category && artwork.category?.toLowerCase() !== category.toLowerCase()) return false;
    if (tagsArray.length > 0) {
      const artworkTags = (artwork.tags || []).map(t => typeof t === 'string' ? t.toLowerCase() : (t.tagName?.toLowerCase() || ""));
      const hasTag = tagsArray.some(tag => artworkTags.includes(tag));
      if (!hasTag) return false;
    }
    return true;
  });

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

      {filteredArtworks.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No artworks available yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-10 px-4 pb-10">
          {filteredArtworks.map((artwork) => (
            <ProductCard
              key={artwork.artworkId || artwork.id}
              id={artwork.artworkId || artwork.id}
              title={artwork.title}
              image={artwork.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              artistName={artwork.ownerName || artwork.user?.userName || artwork.user?.email || (typeof artwork.userId === 'string' && !artwork.userId.includes('-') ? artwork.userId : "Unknown Artist")}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ArtworksHome;