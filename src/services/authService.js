import { apiCall, setToken, setUser, removeToken, removeUser } from "./api";
import { getAccessToken } from "./tokenService";

export const authService = {
  // Register new user
  register: async (email, password, fullName, role) => {
    console.log("📝 Starting registration for:", email);
    const response = await apiCall(
      "/Auth/register",
      "POST",
      {
        Email: email,
        password: password,
        fullName: fullName,
        role: role,
      },
      false // No auth required for registration
    );
    console.log("✅ Registration response:", response);
    return response;
  },

  // Login user
  login: async (email, password) => {
    console.log("🔐 Starting login for:", email);
    
    try {
      const response = await apiCall(
        "/Auth/login",
        "POST",
        {
          Email: email,
          password: password,
        },
        false // No auth required for login
      );

      console.log("📥 Login API Response:", response);
      console.log("📥 Response keys:", response ? Object.keys(response) : "null");

      if (response && response.token) {
        console.log("🔑 Token found in response, saving...");
        console.log("   Token preview:", response.token.substring(0, 50) + "...");
        
        setToken(response.token);
        
        // Verify token was saved
        const savedToken = getAccessToken();
        if (savedToken) {
          console.log("✅ Token successfully saved to storage");
        } else {
          console.error("❌ Token was NOT saved to storage!");
        }

        // Store basic user info
        setUser({ email, role: "user" }); // Role will be updated from token
        console.log("✅ User info stored");
      } else {
        console.error("❌ No token in response:", response);
      }

      return response;
    } catch (error) {
      console.error("❌ Login failed with error:", {
        message: error.message,
        stack: error.stack,
        error: error,
      });
      throw error;
    }
  },

  // Admin-only endpoint (to verify authorization)
  adminOnly: async () => {
    return await apiCall("/Auth/admin-only", "GET", null, true);
  },

  // Get pending artists
  getPendingArtists: async () => {
    return await apiCall("/Auth/pending-artists", "GET", null, true);
  },

  // Approve artist
  approveArtist: async (id) => {
    return await apiCall(`/Auth/approve-artist/${id}`, "POST", {}, true);
  },

  // Reject artist
  rejectArtist: async (id) => {
    return await apiCall(`/Auth/reject-artist/${id}`, "POST", {}, true);
  },

  // Logout
  logout: () => {
    removeToken();
    removeUser();
  },
};
