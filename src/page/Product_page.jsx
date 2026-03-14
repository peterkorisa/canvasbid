import React, { useState } from 'react';
import Navbar from '../component/Navbar';

const Productpage = () => {
  const [bid, setBid] = useState('');
  const [showAlert, setShowAlert] = useState(false); // track if alert should show

  const handleBidChange = (e) => setBid(e.target.value);

  const handlePlaceBid = () => {
    if (!bid) return; // optional: prevent empty bids
    setShowAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 w-full min-h-screen py-8">
        <div className="flex flex-wrap md:flex-nowrap w-full -mx-4 px-4 items-stretch">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex flex-col">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Product"
              className="w-full h-full object-contain rounded-lg shadow-md mb-4 flex-1"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {[
                "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => document.getElementById('mainImage').src = src}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4 flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-2">Abstract Canvas Artwork</h2>
            <p className="text-gray-600 mb-4">SKU: ART12345</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">$349.99</span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>

            <div className="flex items-center mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>

            <p className="text-gray-700 mb-6">
              Own a stunning abstract canvas artwork to elevate your space. Perfect for collectors and art enthusiasts alike.
            </p>

            <div className="mb-6 w-full md:w-3/4">
              <label htmlFor="bid" className="block text-sm font-medium text-gray-700 mb-1">Place Your Bid:</label>
              <input
                type="number"
                id="bid"
                name="bid"
                value={bid}
                onChange={handleBidChange}
                placeholder="Enter your bid amount"
                className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
              />
            </div>

            <button
              onClick={handlePlaceBid}
              className="!bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full md:w-3/4 mt-auto"
            >
              Place Bid
            </button>

            {/* Inline Success Alert */}
            {showAlert && (
              <div role="alert" className="alert alert-success mt-4 flex items-center bg-green-100 text-green-800 p-4 rounded-md shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 mr-2 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your bid of ${bid} has been placed!</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;