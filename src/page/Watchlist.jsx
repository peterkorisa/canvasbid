import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { LoadingSpinner } from '../component/LoadingSpinner';
import { artworkService } from '../services/artworkService';
import { getUserRole } from '../services/api';
import ProductCard from '../component/prodect_card/Product_card';

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(null); // null | 'success' | 'error'
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is a buyer
    const userRole = getUserRole();
    if (!userRole || userRole !== 'Buyer') {
      navigate('/');
      return;
    }

    fetchWatchlist();
  }, [navigate]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await artworkService.getWatchlist();
      setWatchlistItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load watchlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (artworkId) => {
    try {
      await artworkService.removeFromWatchlist(artworkId);
      setWatchlistItems(watchlistItems.filter(item => item.artworkId !== artworkId));
      setShowAlert('success');
      setAlertMessage('Item removed from watchlist');
      setTimeout(() => setShowAlert(null), 3000);
    } catch (err) {
      setShowAlert('error');
      setAlertMessage('Failed to remove item from watchlist');
      setTimeout(() => setShowAlert(null), 3000);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner text="Loading your watchlist..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-screen py-8 pt-[7rem]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">My Watchlist</h1>

          {error && (
            <div role="alert" className="alert alert-error mb-6 flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {showAlert === 'success' && (
            <div role="alert" className="alert alert-success mb-6 flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md shadow">
              <span>{alertMessage}</span>
            </div>
          )}
          {showAlert === 'error' && (
            <div role="alert" className="alert alert-error mb-6 flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{alertMessage}</span>
            </div>
          )}

          {watchlistItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">Your watchlist is empty</p>
              <a href="/artworks" className="btn btn-primary !text-white">
                Browse Artworks
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlistItems.map((item) => (
                <div key={item.artworkId} className="relative group">
                  <ProductCard
                    id={item.artworkId}
                    title={item.title}
                    image={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'}
                  />
                  <button
                    onClick={() => handleRemove(item.artworkId)}
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from watchlist"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Watchlist;
