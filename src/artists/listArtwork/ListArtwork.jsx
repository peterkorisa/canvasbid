import { useState, useEffect } from "react";
import ArtworksCard from "../components/artworksCard/ArtworksCard";
import { artworkService } from "../../services/artworkService";
import { LoadingSpinner } from "../../component/LoadingSpinner";

import { getUserIdFromToken } from "../../services/tokenService";

const ListArtwork = ({ tags }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        // Fetch the artist's artworks using the new endpoint
        const data = await artworkService.getMyArtworks();
        const approvedArtworks = Array.isArray(data) ? data : [];
        
        let pendingArtworks = [];
        try {
          pendingArtworks = JSON.parse(localStorage.getItem('artistPendingArtworks') || '[]');
          
          // Filter out any pending artworks that have been approved (i.e. their ID is now in the approved list)
          const approvedIds = new Set(approvedArtworks.map(art =>  art.artworkId || art.id));
          pendingArtworks = pendingArtworks.filter(pendingArt => !approvedIds.has(pendingArt.artworkId || pendingArt.id));
          
          // Update local storage to remove approved ones
          localStorage.setItem('artistPendingArtworks', JSON.stringify(pendingArtworks));
        } catch (e) {
          console.error("Failed to load pending artworks from local storage", e);
        }

        // Combine approved and pending artworks
        const combined = [...pendingArtworks, ...approvedArtworks];
        
        // Filter out locally soft-deleted artworks
        const deletedList = JSON.parse(localStorage.getItem('deletedArtworks') || '[]');
        const activeArtworks = combined.filter(art => !deletedList.includes(art.artworkId || art.id));
        
        setArtworks(activeArtworks);
      } catch (err) {
        setError(err.message || "Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading your artworks..." />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-gray-500 text-lg py-10 text-center">
        No artworks found. Start by creating one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {artworks.map((artwork, index) => (
        <ArtworksCard
          key={artwork.artworkId || artwork.id || artwork._id || `artwork-${index}`}
          artworks={artworks}
          artwork={artwork}
          setArtworks={setArtworks}
          tags={tags}
        />
      ))}
    </div>
  );
};

export default ListArtwork;
