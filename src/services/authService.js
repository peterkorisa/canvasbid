import { apiCall, setToken, setUser, removeToken, removeUser } from "./api";
import { getAccessToken } from "./tokenService";

export const authService = {
  register: async (email, password, fullName, role) => {
    console.log(" Starting registration for:", email);
    const response = await apiCall(
      "/Auth/register",
      "POST",
      {
        Email: email,
        password: password,
        fullName: fullName,
        role: role,
      },
      false
    );
    console.log(" Registration response:", response);
    return response;
  },

  login: async (email, password) => {
    console.log(" Starting login for:", email);

    try {
      authService.logout();

      const response = await apiCall(
        "/Auth/login",
        "POST",
        {
          Email: email,
          password: password,
        },
        false
      );

      console.log("Login API Response:", response);
      console.log(" Response keys:", response ? Object.keys(response) : "null");

      if (response && response.token) {
        console.log(" Token found in response, saving...");
        console.log("   Token preview:", response.token.substring(0, 50) + "...");

        setToken(response.token);

        const savedToken = getAccessToken();
        if (savedToken) {
          console.log(" Token successfully saved to storage");
        } else {
          console.error(" Token was NOT saved to storage!");
        }

        setUser({ email, role: "user" });
        console.log(" User info stored");
      } else {
        console.error(" No token in response:", response);
      }

      return response;
    } catch (error) {
      console.error(" Login failed with error:", {
        message: error.message,
        stack: error.stack,
        error: error,
      });
      throw error;
    }
  },

  adminOnly: async () => {
    return await apiCall("/Auth/admin-only", "GET", null, true);
  },

  getPendingArtists: async () => {
    return await apiCall("/Auth/pending-artists", "GET", null, true);
  },

  approveArtist: async (id) => {
    return await apiCall(`/Auth/accept/${id}`, "POST", {}, true);
  },

  rejectArtist: async (id) => {
    return await apiCall(`/Auth/reject/${id}`, "POST", {}, true);
  },

  logout: () => {
    removeToken();
    removeUser();
  },
};
