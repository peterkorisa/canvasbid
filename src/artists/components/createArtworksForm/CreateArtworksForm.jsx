import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { artworkService } from "../../../services/artworkService";

const CreateArtworksForm = ({ tags }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageBase64 = "";
      if (formData.images && formData.images.length > 0) {
        // Convert first image to base64
        const file = formData.images[0];
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }

      await artworkService.create(
        formData.title,
        formData.description,
        parseFloat(formData.initialPrice) || 0,
        parseFloat(formData.initialPrice) * 1.5 || 0, // Placeholder buyNowPrice
        formData.category,
        imageBase64,
        formData.auctionStartTime,
        formData.auctionEndTime
      );

      alert("Artwork created successfully!");
      navigate("/artists/");
    } catch (err) {
      alert("Failed to create artwork: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTagChange = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: tags.filter((t) => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
  
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    initialPrice: "",
    auctionStartTime: "",
    auctionEndTime: "",
    category: "Pick a color",
    tags: [],
    images: [],
  });


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start p-8 pt-3 bg-[#010176] w-[60%] rounded-4xl "
    >
      <div className="first-row flex row justify-around gap-3 w-full">
        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's title
            </legend>
            <input
              name="title"
              type="text"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's description
            </legend>
            <input
              name="description"
              type="text"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
      </div>
      <div className="second-row flex row justify-around gap-3 w-full">
        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's initial price
            </legend>
            <input
              name="initialPrice"
              type="number"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={formData.initialPrice}
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>

        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend  text-white ">
              Choose your category
            </legend>
            <select
              value={formData.category}
              className="select text-black input-secondary bg-secondary"
              name="category"
              onChange={(e) => handleChange(e)}
            >
              <option disabled={true}>Pick a color</option>
              <option>Painting</option>
              <option>Pixel Art</option>
              <option>Digital Art</option>
              <option>Graffiti</option>
            </select>{" "}
          </fieldset>
        </div>
      </div>
      <div className="third-row flex row justify-around gap-3 w-full">
        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's start time
            </legend>
            <input
              name="auctionStartTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black input-secondary bg-secondary"
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
        <div className="w-[45%]">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">
              Enter artwork's end time
            </legend>
            <input
              name="auctionEndTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black placeholder:text-white input-secondary bg-secondary"
              onChange={(e) => handleChange(e)}
            />
          </fieldset>
        </div>
      </div>
      <div className="fourth-row flex row justify-around gap-3 w-full items-center">
        <div className="w-[45%]">
          <fieldset className="fieldset   rounded-box w-64 border border-yellow-300 p-4 w-full !text-base ">
            <legend className="fieldset-legend text-lg text-white">Tags</legend>
            {tags.map((tag, index) => (
              <label key={index} className="label text-white">
                <input
                  name="tags"
                  type="checkbox"
                  className="checkbox text-white checkbox-secondary"
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="w-[45%]">
          <input
            name="images"
            type="file"
            multiple
            className="file-input file-input-secondary text-black"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-center w-full">
        <button type="submit" disabled={loading} className="btn !bg-[#FF9E0C] text-white">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateArtworksForm;
