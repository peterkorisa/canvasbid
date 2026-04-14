const UpdateArtworkForm = ({ tags, artwork, setArtworks,modalRef}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // const updatedArtwork = artworks.find((a) => a.id === artwork.id);
    // send updatedArtwork to backend
    modalRef.current.close();
  };
  const handleChange = (e) => {
    setArtworks((prev) =>
      prev.map((art) =>
        art.id == artwork.id
          ? { ...art, [e.target.name]: e.target.value }
          : art,
      ),
    );
  };
  const handleTagChange = (tag) => {
    if (artwork.tags.includes(tag)) {
      setArtworks((prev) =>
        prev.map((art) =>
          art.id == artwork.id
            ? { ...art, tags: art.tags.filter((t) => t != tag) }
            : art,
        ),
      );
    } else {
      setArtworks((prev) =>
        prev.map((art) =>
          art.id == artwork.id ? { ...art, tags: [...art.tags, tag] } : art,
        ),
      );
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setArtworks((prev) =>
      prev.map((art) =>
        art.id == artwork.id
          ? { ...art, images: [...art.images, ...files] }
          : art,
      ),
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start p-8 pt-3 pb-0 text-black  rounded-4xl "
    >
      <div className="first-row flex row justify-around gap-3 w-full">
        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">
              Enter artwork's title
            </legend>
            <input
              name="title"
              type="text"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={artwork.title}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">
              Enter artwork's description
            </legend>
            <input
              name="description"
              type="text"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={artwork.description}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
      </div>
      <div className="second-row flex row justify-around gap-3 w-full">
        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">
              Enter artwork's initial price
            </legend>
            <input
              name="initialPrice"
              type="number"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={artwork.initialPrice}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>

        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend   ">
              Choose your category
            </legend>
            <select
              className="select text-black input-secondary bg-secondary"
              name="category"
              value={artwork.category}
              onChange={(e) => handleChange(e)}
            >
              <option disabled={true}>Pick a color</option>
              <option>Painting</option>
              <option>Pixel Art</option>
              <option>Digital Art</option>
              <option>Graffiti</option>
            </select>
          </fieldset>
        </div>
      </div>
      <div className="third-row flex row justify-around gap-3 w-full">
        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">
              Enter artwork's start time
            </legend>
            <input
              name="auctionStartTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black input-secondary bg-secondary"
              value={artwork.auctionStartTime}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
        <div className="w-[50%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ">
              Enter artwork's end time
            </legend>
            <input
              name="auctionEndTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black placeholder: input-secondary bg-secondary"
              value={artwork.auctionEndTime}
              onChange={(e) => handleChange(e, artwork.id)}
            />
          </fieldset>
        </div>
      </div>
      <div className="fourth-row flex row justify-around gap-3 w-full items-center">
        <div className="w-[50%]">
          <fieldset className="fieldset   rounded-box w-64 border border-yellow-300 p-4 w-full !text-base ">
            <legend className="fieldset-legend text-lg ">Tags</legend>
            {tags.map((tag, index) => (
              <label key={index} className="label ">
                <input
                  name="tags"
                  type="checkbox"
                  className="checkbox  checkbox-secondary"
                  checked={artwork.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="w-[50%]">
          <input
            name="images"
            type="file"
            multiple
            className="file-input file-input-secondary text-black"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="mt-9 flex justify-center w-full">
        <button type="submit" className="btn !bg-[#FF9E0C] ">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateArtworkForm;
