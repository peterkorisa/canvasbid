import { apiCall } from "./api";

export const notificationService = {
  // Get user's notifications
  getNotifications: async () => {
    return await apiCall("/Notification", "GET", null, true);
  },
};
