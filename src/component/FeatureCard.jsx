import React from "react";
import monalisa from "../assets/mona.jpg"
import nft1 from "../assets/2.jpg"
import nft2 from "../assets/OIP.jpg"

const FeaturedCards = () => {
  const cards = [
    {
      id: 1,
      title: "Sunset Overdrive",
      description: "Exclusive artwork by emerging artist Luna Vega. Place your bid now!",
      img: nft2,
    },
    {
      id: 2,
      title: "Ocean Whispers",
      description: "Limited edition piece by Kai Nakamura. Join the live auction today.",
      img: nft2,
    },
    {
      id: 3,
      title: "Golden Horizon",
      description: "Masterpiece from Aria Santos, available for bidding now!",
      img: nft2,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-6 lg:px-20 my-16">
      {cards.map((card) => (
        <div key={card.id} className="card bg-base-100 image-full w-full lg:w-96 shadow-lg">
          <figure>
            <img src={card.img} alt={card.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
            <p>{card.description}</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCards;