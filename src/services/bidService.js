import { apiCall } from "./api";

export const bidService = {
  // Place a bid on an artwork
  placeBid: async (artworkId, amount) => {
    return await apiCall(
      "/Bid",
      "POST",
      {
        amount,
        artworkId,
      },
      true
    );
  },

  // Get all bids for a specific artwork
  getBids: async (artworkId) => {
    return await apiCall(`/Bid/${artworkId}/bids`, "GET", null, false);
  },

  // Close/finish auction for an artwork
  closeAuction: async (artworkId) => {
    return await apiCall(`/Bid/close/${artworkId}`, "POST", {}, true);
  },
};
