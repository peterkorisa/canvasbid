import { apiCall } from "./api";

export const notificationService = {
  getNotifications: async () => {
    try {
      const serverNotifs = await apiCall("/Notification", "GET", null, true);
      let data = [];
      if (Array.isArray(serverNotifs)) {
        data = serverNotifs;
      } else if (serverNotifs && Array.isArray(serverNotifs.data)) {
        data = serverNotifs.data;
      } else if (serverNotifs && Array.isArray(serverNotifs.notifications)) {
        data = serverNotifs.notifications;
      } else if (serverNotifs && typeof serverNotifs === 'object') {
        data = [serverNotifs];
      }

      const localNotifs = JSON.parse(localStorage.getItem('localNotifications') || '[]');
      return [...data, ...localNotifs];
    } catch (e) {
      const localNotifs = JSON.parse(localStorage.getItem('localNotifications') || '[]');
      return localNotifs;
    }
  },
};
