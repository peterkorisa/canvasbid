const ListArtwork = ({ artworks }) => {
  return (
    <div className="grid  grid-cols-1  lg:grid-cols-2 gap-5">
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className="card card-side shadow-sm bg-[#0000a1] "
        >
          <figure>
            <img className="sm:w-55 w-40 " src={artwork.image} alt="Movie" />
          </figure>
          <div className="card-body items-start flex-1">
            <h2 className="text-2xl font-extrabold">{artwork.title}</h2>
            <p className="font-medium">{artwork.description}</p>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Artist name:</p>
              <p className="font-normal">{artwork.artistName}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Initial price:</p>
              <p className="font-normal">{artwork.initialPrice}$</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Auction start time:</p>
              <p className="font-normal">{artwork.auctionStartTime}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Auction end time:</p>
              <p className="font-normal">{artwork.auctionEndTime}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Category:</p>
              <p className="font-normal">{artwork.category}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Tags:</p>
              {artwork.tags.map((tag, index) => (
                <div key={index}>
                  <p className="font-normal">
                    {tag}
                    {index != artwork.tags.length - 1 && ","}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-base font-semibold">Status:</p>
              <p className="font-normal">{artwork.status}</p>
            </div>
            <div className="card-actions self-end">
              <button className="btn btn-secondary !bg-[#4a979c] text-white border-none shadow-none">
                Watch
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListArtwork;
