import React, { useState, useEffect } from "react";
import { artworkService } from "../../../services/artworkService";
import { LoadingSpinner } from "../../../component/LoadingSpinner";

const PendingArtworksTable = () => {
  const [pendingArtworks, setPendingArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingArtworks = async () => {
    try {
      setLoading(true);
      const data = await artworkService.getPending();
      if (Array.isArray(data)) {
        setPendingArtworks(data);
      } else {
        setPendingArtworks([]);
      }
    } catch (err) {
      setError(err.message || "Failed to load pending artworks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingArtworks();
  }, []);

  const handleApprove = async (id) => {
    try {
      await artworkService.approve(id);
      setPendingArtworks(prev => prev.filter(art => art.artworkId !== id && art.id !== id));
    } catch (err) {
      alert("Failed to approve: " + (err.message || "Unknown error"));
    }
  };

  const handleReject = async (id) => {
    try {
      await artworkService.reject(id);
      setPendingArtworks(prev => prev.filter(art => art.artworkId !== id && art.id !== id));
    } catch (err) {
      alert("Failed to reject: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <LoadingSpinner text="Loading pending artworks..." />;

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-[#5937E0]">Pending Artworks</h2>
        
        {pendingArtworks.length === 0 ? (
          <p className="text-gray-500 py-4 text-center text-lg">No pending artworks to review.</p>
        ) : (
          <table className="table w-full">
            <thead className="text-[#FF9E0C]">
              <tr>
                <th>Artwork</th>
                <th>Category / Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingArtworks.map((art) => (
                <tr key={art.artworkId || art.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16 bg-gray-200">
                          <img
                            src={art.image || art.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150'}
                            alt={art.title}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{art.title}</div>
                        <div className="text-sm opacity-70">{art.artistName || 'Unknown Artist'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {art.category || 'Uncategorized'}
                    <br />
                    <span className="badge badge-ghost badge-sm mt-1">
                      Initial: ${art.intialPrice?.toFixed(2) || '0.00'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning gap-1">
                      {art.status}
                    </span>
                  </td>
                  <th>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(art.artworkId || art.id)}
                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(art.artworkId || art.id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Reject
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendingArtworksTable;
