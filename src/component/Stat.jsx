import React from "react";
import { FaGavel, FaUsers, FaPalette } from "react-icons/fa";

const StatsSection = () => {
  return (
    <div className="w-full bg-white shadow-lg py-10">
      <div className="stats w-full max-w-full flex justify-around flex-col sm:flex-row px-4 sm:px-0">
        {/* Live Auctions */}
        <div className="stat place-items-center flex-1 px-4 py-6">
          <FaGavel className="text-4xl text-primary mb-2" />
          <div className="stat-title">Live Auctions</div>
          <div className="stat-value">24</div>
          <div className="stat-desc">Currently ongoing</div>
        </div>

        {/* Registered Bidders */}
        <div className="stat place-items-center flex-1 px-4 py-6">
          <FaUsers className="text-4xl text-secondary mb-2" />
          <div className="stat-title">Registered Bidders</div>
          <div className="stat-value text-secondary">4,200</div>
          <div className="stat-desc text-secondary">Active participants</div>
        </div>

        {/* Artworks Sold */}
        <div className="stat place-items-center flex-1 px-4 py-6">
          <FaPalette className="text-4xl text-accent mb-2" />
          <div className="stat-title">Artworks Sold</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">This month</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;