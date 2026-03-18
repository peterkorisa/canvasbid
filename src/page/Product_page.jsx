import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';
//import {mona} from '../assets/mona.jpg';

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
                <td>{bid.name}</td>
                <td>${bid.price.toFixed(2)}</td>
                <td>{bid.timestamp}</td>
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
  const [bid, setBid] = useState('');
  const [showAlert, setShowAlert] = useState(null); // null | 'success' | 'error'
  const [bidHistory, setBidHistory] = useState([]);

  // Example products
  const products = [
    {
      id: '1',
      name: 'Abstract Canvas Artwork',
      sku: 'ART12345',
      price: 349.99,
      oldPrice: 399.99,
      rating: 4.5,
      reviews: 120,
      description: 'Own a stunning abstract canvas artwork to elevate your space. Perfect for collectors and art enthusiasts alike.',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
      ]
    },
    {
      id: '2',
      name: 'Modern Painting',
      sku: 'ART12346',
      price: 299.99,
      oldPrice: 349.99,
      rating: 4.7,
      reviews: 120,
      description: 'Own a stunning abstract canvas artwork to elevate your space. Perfect for collectors and art enthusiasts alike.',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'
      ]
    },
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  const handleBidChange = (e) => setBid(e.target.value);

  const handlePlaceBid = () => {
    const numericBid = parseFloat(bid);
    if (!bid || isNaN(numericBid)) return;

    if (numericBid < product.price + 10) {
      setShowAlert('error');
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    // Valid bid
    const timestamp = new Date().toLocaleString();
    const newBid = { name: 'Guest', price: numericBid, timestamp };

    setProduct({ ...product, price: numericBid });
    setBidHistory([newBid, ...bidHistory]);
    setShowAlert('success');
    setBid('');
    setTimeout(() => setShowAlert(null), 3000);
  };

  if (!product) return <div className="pt-24 text-center">Product not found.</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 w-full min-h-screen py-8 pt-[5rem]">
        <div className="flex flex-wrap md:flex-nowrap w-full -mx-4 px-4 items-stretch">

          {/* Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex flex-col">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg shadow-md mb-4 flex-1"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images.map((src, index) => (
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

          {/* Details */}
          <div className="w-full md:w-1/2 px-4 flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              <span className="text-gray-500 line-through">${product.oldPrice}</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

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

            {/* Alerts */}
            {showAlert === 'success' && (
              <div role="alert" className="alert alert-success mt-4 flex items-center bg-green-100 text-green-800 p-4 rounded-md shadow">
                <span>Your bid of ${bid} has been placed!</span>
              </div>
            )}
            {showAlert === 'error' && (
              <div role="alert" className="alert alert-error mt-4 flex items-center bg-red-100 text-red-800 p-4 rounded-md shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! Each new bid must be at least $10 higher than the previous bid.</span>
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