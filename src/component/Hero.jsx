import React from "react";
import pic from "../assets/mona.jpg"

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-indigo-50 via-white to-pink-50">
      <div className="hero-content flex-col lg:flex-row-reverse px-6 lg:px-20 gap-12">
        {/* Featured Artwork Image */}
        <img
          src={pic}
          className="max-w-xs rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
          alt="Featured Artwork"
        />

        {/* Text Content */}
        <div className="text-center lg:text-left lg:ml-10 max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Discover & Bid on Masterpieces
          </h1>
          <p className="py-6 text-lg md:text-xl text-gray-700">
            Explore rare artworks from emerging and renowned artists. Join live auctions, place your bids, and bring your favorite pieces home.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <button className="btn btn-primary btn-lg px-8 py-4 hover:scale-105 transition">
              Start Bidding
            </button>
            <button className="btn btn-outline btn-lg px-8 py-4 hover:bg-indigo-100 transition">
              Learn More
            </button>
          </div>

          <p className="mt-6 text-gray-500 text-sm">
            Join thousands of art enthusiasts already bidding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;