import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { LoadingSpinner } from '../component/LoadingSpinner';
import { artworkService } from '../services/artworkService';
import { bidService } from '../services/bidService';
import { getToken, getUserRole } from '../services/api';
import { formatImage } from '../utils/imageUtils';

// BidHistoryTable Component
const BidHistoryTable = ({ bids }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Bidder Name</th>
            <th>Bid Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {bids && bids.length > 0 ? (
            bids.map((bid, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{bid.userName || 'Anonymous'}</td>
                <td>${bid.amount?.toFixed(2) || bid.price?.toFixed(2) || '0.00'}</td>
                <td>{bid.timeStamp ? new Date(bid.timeStamp).toLocaleString() : bid.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">
                No bids yet
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Bidder Name</th>
            <th>Bid Price</th>
            <th>Timestamp</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

// Product page
const Productpage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [showAlert, setShowAlert] = useState(null); // null | 'success' | 'error'
  const [alertMessage, setAlertMessage] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidLoading, setBidLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const checkWatchlistStatus = async (artworkId) => {
    try {
      const userRole = getUserRole();
      if (userRole !== 'Buyer') {
        setIsInWatchlist(false);
        return;
      }

      const watchlist = await artworkService.getWatchlist();
      const isWatched = Array.isArray(watchlist) && watchlist.some(item => item.artworkId === parseInt(artworkId));
      setIsInWatchlist(isWatched);
    } catch (err) {
      // If error or not buyer, don't show in watchlist
      setIsInWatchlist(false);
    }
  };

  useEffect(() => {
    const fetchArtworkAndBids = async () => {
      try {
        setLoading(true);
        const artworkData = await artworkService.getById(id);
        setProduct(artworkData);

        const bidsData = await bidService.getBids(id);
        setBidHistory(Array.isArray(bidsData) ? bidsData : []);

        // Check if in watchlist
        await checkWatchlistStatus(id);
      } catch (err) {
        setShowAlert('error');
        setAlertMessage('Failed to load artwork details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtworkAndBids();
    }
  }, [id]);

  const handlePlaceBid = async () => {
    if (!isLoggedIn) {
      setShowAlert('error');
      setAlertMessage('Please login to place a bid');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    const numericBid = parseFloat(bidAmount);
    if (!bidAmount || isNaN(numericBid)) {
      setShowAlert('error');
      setAlertMessage('Please enter a valid bid amount');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    if (product && numericBid < product.intialPrice + 10) {
      setShowAlert('error');
      setAlertMessage(`Bid must be at least $${(product.intialPrice + 10).toFixed(2)}`);
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    try {
      setBidLoading(true);
      const result = await bidService.placeBid(parseInt(id), numericBid);

      if (result) {
        setShowAlert('success');
        setAlertMessage(`Your bid of $${numericBid.toFixed(2)} has been placed!`);
        setBidAmount('');

        // Refresh bid history
        const bidsData = await bidService.getBids(id);
        setBidHistory(Array.isArray(bidsData) ? bidsData : []);

        setTimeout(() => setShowAlert(null), 3000);
      }
    } catch (err) {
      setShowAlert('error');
      setAlertMessage(err.message || 'Failed to place bid');
      setTimeout(() => setShowAlert(null), 3000);
    } finally {
      setBidLoading(false);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!isLoggedIn) {
      setShowAlert('error');
      setAlertMessage('Please login to add to watchlist');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    try {
      setWatchlistLoading(true);
      if (isInWatchlist) {
        // Remove from watchlist
        await artworkService.removeFromWatchlist(parseInt(id));
        setIsInWatchlist(false);
        setShowAlert('success');
        setAlertMessage('Removed from watchlist');
      } else {
        // Add to watchlist
        await artworkService.addToWatchlist(parseInt(id));
        setIsInWatchlist(true);
        setShowAlert('success');
        setAlertMessage('Added to watchlist');
      }
      setTimeout(() => setShowAlert(null), 3000);
    } catch (err) {
      setShowAlert('error');
      setAlertMessage(err.message || 'Failed to update watchlist');
      setTimeout(() => setShowAlert(null), 3000);
    } finally {
      setWatchlistLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner text="Loading artwork details..." />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Artwork not found.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-900 w-full min-h-screen py-8 pt-[5rem]">
        <div className="flex flex-wrap md:flex-nowrap w-full -mx-4 px-4 items-stretch">

          {/* Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex flex-col">
            <img
              src={formatImage(product.image, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080')}
              alt={product.title}
              className="w-full h-full object-contain rounded-lg shadow-md mb-4 flex-1 bg-white"
              id="mainImage"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 px-4 flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-2 dark:text-white">{product.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Category: {product.category}</p>
            
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2 dark:text-white">${product.intialPrice?.toFixed(2) || '0.00'}</span>
              <span className="text-gray-500 line-through">${product.buyNowPrice?.toFixed(2) || '0.00'}</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.discreption || product.description}</p>

            {!isLoggedIn && (
              <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded-lg">
                Please <a href="/login" className="underline font-semibold">login</a> to place a bid
              </div>
            )}

            <div className="mb-6 w-full md:w-3/4">
              <label htmlFor="bid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Place Your Bid:
              </label>
              <input
                type="number"
                id="bid"
                name="bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Enter bid amount (minimum: $${(product.intialPrice + 10).toFixed(2)})`}
                disabled={!isLoggedIn || bidLoading}
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg disabled:opacity-50"
              />
            </div>

            <button
              onClick={handlePlaceBid}
              disabled={!isLoggedIn || bidLoading}
              className="!bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full md:w-3/4 mt-auto disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {bidLoading ? 'Placing Bid...' : 'Place Bid'}
            </button>

            <div className="flex gap-4 mt-4 w-full md:w-3/4">
              <button
                onClick={handleWatchlistToggle}
                disabled={watchlistLoading}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md text-lg font-semibold transition ${
                  isInWatchlist
                    ? '!bg-red-600 hover:!bg-red-700 text-white'
                    : '!bg-gray-400 hover:!bg-gray-500 text-white'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <span className="text-xl">
                  {isInWatchlist ? '❤️' : '🤍'}
                </span>
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>

            {/* Alerts */}
            {showAlert === 'success' && (
              <div role="alert" className="alert alert-success mt-4 flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md shadow">
                <span>{alertMessage}</span>
              </div>
            )}
            {showAlert === 'error' && (
              <div role="alert" className="alert alert-error mt-4 flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{alertMessage}</span>
              </div>
            )}

            {/* Bid History Table */}
            <BidHistoryTable bids={bidHistory} />

          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;