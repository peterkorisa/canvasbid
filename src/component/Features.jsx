import React from "react";
import { FaPaintBrush, FaStar, FaGavel } from "react-icons/fa"; // Icons for features

const features = [
  {
    id: 1,
    icon: <FaPaintBrush className="text-4xl text-primary mb-4" />,
    title: "Original Artworks",
    description: "Browse unique pieces from talented artists worldwide.",
  },
  {
    id: 2,
    icon: <FaStar className="text-4xl text-primary mb-4" />,
    title: "Curated Selection",
    description: "Only the finest artworks are featured for auctions.",
  },
  {
    id: 3,
    icon: <FaGavel className="text-4xl text-primary mb-4" />,
    title: "Live Bidding",
    description: "Place your bids in real-time and win exclusive art.",
  },
];

const FeaturedSection = () => {
  return (
    <div className="bg-base-100 py-16 px-6 lg:px-20">
      <h2 className="text-4xl font-bold text-center mb-12">Why Choose CanvasBid?</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center">
        {features.map((feature) => (
          <div key={feature.id} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;