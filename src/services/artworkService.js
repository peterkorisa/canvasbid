import { apiCall } from "./api";

export const artworkService = {
  // Create new artwork
  create: async (title, description, initialPrice, buyNowPrice, category, image) => {
    return await apiCall(
      "/Artwork",
      "POST",
      {
        title,
        discreption: description,
        intialPrice: initialPrice,
        buyNowPrice,
        category,
        image, // Should be base64 or byte array
      },
      true
    );
  },

  // Get all artworks
  getAll: async () => {
    return await apiCall("/Artwork", "GET", null, false);
  },

  // Get single artwork by ID
  getById: async (id) => {
    return await apiCall(`/Artwork/${id}`, "GET", null, false);
  },

  // Update artwork
  update: async (id, title, description, initialPrice, buyNowPrice, category, image) => {
    return await apiCall(
      `/Artwork/${id}`,
      "PUT",
      {
        title,
        discreption: description,
        intialPrice: initialPrice,
        buyNowPrice,
        category,
        image,
      },
      true
    );
  },

  // Delete artwork
  delete: async (id) => {
    return await apiCall(`/Artwork/${id}`, "DELETE", null, true);
  },

  // Approve artwork (admin)
  approve: async (id) => {
    return await apiCall(`/Artwork/approve/${id}`, "POST", {}, true);
  },

  // Reject artwork (admin)
  reject: async (id) => {
    return await apiCall(`/Artwork/reject/${id}`, "POST", {}, true);
  },

  // Filter artworks
  filter: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/Artwork/filter?${queryParams}` : "/Artwork/filter";
    return await apiCall(endpoint, "GET", null, false);
  },

  // Add artwork to watchlist
  addToWatchlist: async (artworkId) => {
    return await apiCall(`/Artwork/watchlist/${artworkId}`, "POST", {}, true);
  },

  // Get user's watchlist
  getWatchlist: async () => {
    return await apiCall("/Artwork/watchlist", "GET", null, true);
  },

  // Remove artwork from watchlist
  removeFromWatchlist: async (artworkId) => {
    return await apiCall(`/Artwork/watchlist/${artworkId}`, "DELETE", null, true);
  },

  // Extend auction
  extend: async (id) => {
    return await apiCall(`/Artwork/extend/${id}`, "POST", {}, true);
  },
};
