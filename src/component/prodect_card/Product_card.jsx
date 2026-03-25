import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, title, image }) => {
  return (
    <Link to={`/product/${id}`} className="hover:scale-105 transition-transform">
      <div className="card bg-base-100 w-96 shadow-sm cursor-pointer">
        <figure>
          <img src={image} alt={title} className="rounded-lg" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Click to view details and place a bid.</p>

          <div className="card-actions justify-end">
            <button className="btn !bg-[#FF9E0C] !border-[#FF9E0C] text-white hover:!bg-[#e68f0b]">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;