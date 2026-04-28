import { apiCall } from "./api";

export const artworkService = {
  create: async (title, description, initialPrice, buyNowPrice, category, image, startTime, endTime) => {
    // If image is a base64 string, we need to handle it or pass it correctly. 
    // Wait, the backend expects a byte[]? Image. 
    // A base64 string can be accepted by ASP.NET Core as byte[] if it's correctly formatted (just the base64 part, without the data:image/png;base64, prefix).
    let base64Image = null;
    if (image && image.includes(',')) {
      base64Image = image.split(',')[1];
    } else if (image) {
      base64Image = image;
    }

    const newArtwork = await apiCall(
      "/Artwork",
      "POST",
      {
        title,
        discreption: description,
        intialPrice: initialPrice,
        buyNowPrice,
        category,
        Image: base64Image,
        StartTime: startTime ? new Date(startTime).toISOString() : null,
        EndTime: endTime ? new Date(endTime).toISOString() : null
      },
      true
    );

    // Save to local storage since backend doesn't return pending artworks to artists
    try {
      const pendingArtworks = JSON.parse(localStorage.getItem('artistPendingArtworks') || '[]');
      // Assuming backend returns status as an integer (e.g. 0 for Pending), we explicitly set it to 'Pending' for UI
      const artworkToSave = { ...newArtwork, status: 'Pending', tags: [], images: [image] };
      pendingArtworks.push(artworkToSave);
      localStorage.setItem('artistPendingArtworks', JSON.stringify(pendingArtworks));
    } catch(e) {
      console.error("Failed to save pending artwork to local storage", e);
    }

    return newArtwork;
  },

  // Get all artworks
  getAll: async () => {
    return await apiCall("/Artwork", "GET", null, true);
  },

  // Get pending artworks (admin)
  getPending: async () => {
    return await apiCall("/Artwork/pending", "GET", null, true);
  },

  // Get single artwork by ID
  getById: async (id) => {
    return await apiCall(`/Artwork/${id}`, "GET", null, true);
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
    return await apiCall(endpoint, "GET", null, true);
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
