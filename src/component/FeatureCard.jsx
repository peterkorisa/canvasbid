import art1 from "../assets/art1.png"
import art2 from "../assets/art2.jpg"
import art3 from "../assets/art3.jpg"

const FeaturedCards = () => {
  const cards = [
    {
      id: 1,
      title: "Sunset Overdrive",
      description: "Exclusive artwork by emerging artist Luna Vega. Place your bid now!",
      img: art1,
    },
    {
      id: 2,
      title: "Ocean Whispers",
      description: "Limited edition piece by Kai Nakamura. Join the live auction today.",
      img:art2,
    },
    {
      id: 3,
      title: "Golden Horizon",
      description: "Masterpiece from Aria Santos, available for bidding now!",
      img: art3,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 px-6 lg:px-20 my-16">
      {cards.map((card) => (
        <div key={card.id} className="card  image-full w-full shadow-lg">
          <figure className="h-75">
            <img src={card.img} alt={card.title} className="w-full h-full "/>
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