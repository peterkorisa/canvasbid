import React from "react";
import pic from "../assets/mona.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero pt-16 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse px-6 lg:px-20 gap-12">

        <div className="hover-3d">
          <figure className="max-w-xs rounded-2xl overflow-hidden">
            <img
              src={pic}
              alt="Featured Artwork"
              className="w-full h-full object-cover"
            />
          </figure>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="text-center lg:text-left lg:ml-10 max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Discover & Bid on Masterpieces
          </h1>

          <p className="py-6 text-lg md:text-xl text-gray-700">
            Explore rare artworks from emerging and renowned artists. Join live
            auctions, place your bids, and bring your favorite pieces home.
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <Link to="/artworks" className="btn btn-primary btn-lg px-8 py-4 hover:scale-105 transition !text-white !bg-[#FF9E0C]">
              Start Bidding
            </Link>

            <Link to="/contact" className="btn btn-outline btn-lg px-8 py-4 hover:bg-indigo-100 transition">
              Learn More
            </Link>
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