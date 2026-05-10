import { apiCall } from "./api";

export const bidService = {
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

  getBids: async (artworkId) => {
    return await apiCall(`/Bid/${artworkId}/bids`, "GET", null, false);
  },

  closeAuction: async (artworkId) => {
    return await apiCall(`/Bid/close/${artworkId}`, "POST", {}, true);
  },
};
