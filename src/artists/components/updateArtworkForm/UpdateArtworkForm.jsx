import { useState } from "react";
import { artworkService } from "../../../services/artworkService";

const UpdateArtworkForm = ({ tags, artwork, setArtworks, modalRef }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const title = artwork.title;
    const description = artwork.discreption || artwork.description;
    const initialPrice = artwork.initialPrice || artwork.intialPrice;
    const category = artwork.category;
    const startTimeStr = artwork.startTime || artwork.auctionStartTime;
    const endTimeStr = artwork.endTime || artwork.auctionEndTime;
    const hasImages = (artwork.images && artwork.images.length > 0) || artwork.image;

    // Check if all fields are filled
    if (!title || !description || !initialPrice || !category || category === "Pick a color" || !startTimeStr || !endTimeStr) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if images are uploaded or exist
    if (!hasImages) {
      alert("Please upload at least one image.");
      return;
    }

    // Validate times
    const start = new Date(startTimeStr);
    const end = new Date(endTimeStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      alert("Auction start time cannot be before today.");
      return;
    }

    if (start >= end) {
      alert("Auction start time must be before the end time.");
      return;
    }

    setLoading(true);
    try {
      const targetId = artwork.id || artwork.artworkId;

      let imageBase64 = artwork.image || null;
      if (artwork.images && artwork.images.length > 0 && artwork.images[0] instanceof File) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(artwork.images[0]);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }

      if (targetId) {
        await artworkService.update(
          targetId,
          artwork.title,
          artwork.discreption || artwork.description,
          parseFloat(artwork.initialPrice || artwork.intialPrice) || 0,
          (parseFloat(artwork.initialPrice || artwork.intialPrice) || 0) * 1.5,
          artwork.category,
          imageBase64,
          artwork.startTime || artwork.auctionStartTime,
          artwork.endTime || artwork.auctionEndTime
        );
      }

      // Update local storage if it's pending
      const pendingArtworks = JSON.parse(localStorage.getItem('artistPendingArtworks') || '[]');
      const index = pendingArtworks.findIndex(a => (a.id || a.artworkId) === targetId);
      if (index !== -1) {
        pendingArtworks[index] = artwork;
        localStorage.setItem('artistPendingArtworks', JSON.stringify(pendingArtworks));
      }

      modalRef.current.close();
    } catch (error) {
      alert("Failed to update artwork: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setArtworks((prev) =>
      prev.map((art) =>
        (art.id || art.artworkId) == (artwork.id || artwork.artworkId)
          ? { ...art, [e.target.name]: e.target.value }
          : art,
      ),
    );
  };
  const handleTagChange = (tag) => {
    const currentTags = (artwork.tags || artwork.artworkTags || []).map(t => typeof t === 'string' ? t : t.tagName);
    if (currentTags.includes(tag)) {
      setArtworks((prev) =>
        prev.map((art) =>
          (art.id || art.artworkId) == (artwork.id || artwork.artworkId)
            ? { ...art, tags: currentTags.filter((t) => t != tag) }
            : art,
        ),
      );
    } else {
      setArtworks((prev) =>
        prev.map((art) =>
          (art.id || art.artworkId) == (artwork.id || artwork.artworkId) ? { ...art, tags: [...currentTags, tag] } : art,
        ),
      );
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setArtworks((prev) =>
      prev.map((art) =>
        (art.id || art.artworkId) == (artwork.id || artwork.artworkId)
          ? { ...art, images: [...(art.images || []), ...files] }
          : art,
      ),
    );
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    let str = typeof dateString === 'string' ? dateString : dateString.toString();
    if (str.includes('0001-01-01')) return ""; // Handle C# min value
    
    if (str.endsWith('Z')) {
       // Convert UTC ISO string to local time format YYYY-MM-DDThh:mm
       const d = new Date(str);
       if (isNaN(d.getTime())) return "";
       const pad = (n) => String(n).padStart(2, '0');
       return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    
    // If no Z, assume it's already local, just slice up to minutes
    if (str.length >= 16) return str.substring(0, 16);
    return str;
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
              value={artwork.title || ""}
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
              name="discreption"
              type="text"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={artwork.discreption || artwork.description || ""}
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
              name="intialPrice"
              type="number"
              className="input text-black input-secondary bg-secondary placeholder:text-base-300"
              placeholder="Type here"
              value={artwork.intialPrice || artwork.initialPrice || ""}
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
              value={artwork.category || "Pick a color"}
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
              name="startTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black input-secondary bg-secondary"
              value={formatDateForInput(artwork.startTime || artwork.auctionStartTime || "")}
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
              name="endTime"
              type="datetime-local"
              className="input min-w-0 w-full text-black placeholder: input-secondary bg-secondary"
              value={formatDateForInput(artwork.endTime || artwork.auctionEndTime || "")}
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
                  checked={(artwork.tags || artwork.artworkTags || []).map(t => typeof t === 'string' ? t : t.tagName).includes(tag)}
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
        <button type="submit" disabled={loading} className="btn !bg-[#FF9E0C] ">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default UpdateArtworkForm;
