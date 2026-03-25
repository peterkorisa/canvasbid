import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tags = [
  "Abstract",
  "Realism",
  "Nature",
  "Portrait",
  "Digital",
  "Oil",
  "Watercolor",
  "Limited Edition",
  "Signed",
  "Modern",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(""); // dropdown state
  const [selectedTags, setSelectedTags] = useState([]); // for tag checkboxes
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      const url = `/search?q=${encodeURIComponent(query)}${
        category ? `&category=${encodeURIComponent(category)}` : ""
      }${
        selectedTags.length > 0
          ? `&tags=${encodeURIComponent(selectedTags.join(","))}`
          : ""
      }`;
      navigate(url);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 space-y-4">
      {/* Search bar + category + button */}
      <div className="flex items-center space-x-2 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="input input-lg flex-1 rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-neutral rounded-full w-40"
        >
          <option value="">Category</option>
          <option value="Painting">Painting</option>
          <option value="Pixel Art">Pixel Art</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Graffiti">Graffiti</option>
        </select>

        <button
          onClick={handleSearch}
          className="btn btn-accent rounded-full px-6"
        >
          Search
        </button>
      </div>

      {/* Tag filter form */}
<form className="flex flex-wrap gap-2 justify-center ">
  {tags.map((tag) => (
    <input
      key={tag}
      type="checkbox"
      name="tags"
      aria-label={tag}
      className={`btn btn-sm transition ${
        selectedTags.includes(tag)
          ? "!text-[#FF9E0C] border-[#FF9E0C] bg-transparent"
          : "btn-outline hover:!text-[#FF9E0C] hover:border-[#FF9E0C]"
      }`}
      checked={selectedTags.includes(tag)}
      onChange={() => toggleTag(tag)}
    />
  ))}

  <input
    type="reset"
    value="×"
    onClick={resetTags}
    className="btn btn-square"
  />
</form>
    </div>
  );
};

export default SearchBar;