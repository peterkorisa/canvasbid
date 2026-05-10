import { apiCall, getUser } from "./api";

export const artworkService = {
  create: async (title, description, initialPrice, buyNowPrice, category, imageFile, tags = [], artistId = null, startTime, endTime) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("discreption", description);
    formData.append("buyNowPrice", buyNowPrice);
    formData.append("intialPrice", initialPrice);
    formData.append("category", category);
    
    if (imageFile instanceof File) {
      formData.append("Image", imageFile);
    } else if (imageFile) {
      formData.append("image", imageFile);
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => formData.append("Tags", tag));
    }

    if (artistId) {
      formData.append("artistId", artistId);
    }

    if (startTime) formData.append("startTime", new Date(startTime).toISOString());
    if (endTime) formData.append("endTime", new Date(endTime).toISOString());

    const newArtwork = await apiCall(
      "/Artwork",
      "POST",
      formData,
      true
    );

    try {
      const pendingArtworks = JSON.parse(localStorage.getItem('artistPendingArtworks') || '[]');
      const user = getUser();
      const userName = user?.name || user?.username || "You";
      const artworkToSave = { ...newArtwork, ownerName: newArtwork.ownerName || userName, status: 'Pending', tags: tags, images: [] };
      pendingArtworks.push(artworkToSave);
      localStorage.setItem('artistPendingArtworks', JSON.stringify(pendingArtworks));
    } catch (e) {
      console.error("Failed to save pending artwork to local storage", e);
    }

    return newArtwork;
  },

  getAll: async () => {
    const artworks = await apiCall("/Artwork/all", "GET", null, true);
    console.log("All Artworks:", artworks);
    return artworks;
  },

  getPending: async () => {
    return await apiCall("/Artwork/pending", "GET", null, true);
  },

  getById: async (id) => {
    return await apiCall(`/Artwork/${id}`, "GET", null, true);
  },

  update: async (id, title, description, initialPrice, buyNowPrice, category, imageFile, tags = [], artistId = null, startTime, endTime) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("discreption", description);
    formData.append("buyNowPrice", buyNowPrice);
    formData.append("intialPrice", initialPrice);
    formData.append("category", category);
    
    if (imageFile instanceof File) {
      formData.append("Image", imageFile);
    } else if (imageFile) {
      formData.append("image", imageFile);
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => formData.append("Tags", tag));
    }

    if (artistId) {
      formData.append("artistId", artistId);
    }

    if (startTime) formData.append("startTime", new Date(startTime).toISOString());
    if (endTime) formData.append("endTime", new Date(endTime).toISOString());

    return await apiCall(
      `/Artwork/${id}`,
      "PUT",
      formData,
      true
    );
  },

  delete: async (id) => {
    return await apiCall(`/Artwork/${id}`, "DELETE", null, true);
  },

  approve: async (id) => {
    return await apiCall(`/Artwork/approve/${id}`, "POST", {}, true);
  },

  reject: async (id) => {
    return await apiCall(`/Artwork/reject/${id}`, "POST", {}, true);
  },

  filter: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/Artwork/filter?${queryParams}` : "/Artwork/filter";
    return await apiCall(endpoint, "GET", null, true);
  },

  getMyArtworks: async () => {
    const artworks = await apiCall("/Artwork/my-artworks", "GET", null, true);
    console.log("User Artworks:", artworks);
    return artworks;
  },

  addToWatchlist: async (artworkId) => {
    return await apiCall(`/Artwork/watchlist/${artworkId}`, "POST", {}, true);
  },

  getWatchlist: async () => {
    return await apiCall("/Artwork/watchlist", "GET", null, true);
  },

  removeFromWatchlist: async (artworkId) => {
    try {
      return await apiCall(`/Artwork/watchlist/${artworkId}`, "DELETE", null, true);
    } catch (e) {
      if (e.message.includes("405") || e.message.includes("404")) {
        return await apiCall(`/Artwork/watchlist?artworkId=${artworkId}&id=${artworkId}`, "DELETE", null, true);
      }
      throw e;
    }
  },

  extend: async (id) => {
    return await apiCall(`/Artwork/extend/${id}`, "POST", {}, true);
  },
};
