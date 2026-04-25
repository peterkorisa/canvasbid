import { apiCall, setToken, setUser, removeToken, removeUser } from "./api";

export const authService = {
  // Register new user
  register: async (email, password, fullName, role) => {
    const response = await apiCall(
      "/Auth/register",
      "POST",
      {
        email,
        password,
        fullName,
        role,
      },
      false // No auth required for registration
    );
    return response;
  },

  // Login user
  login: async (email, password) => {
    const response = await apiCall(
      "/Auth/login",
      "POST",
      {
        email,
        password,
      },
      false // No auth required for login
    );

    if (response && response.token) {
      setToken(response.token);
      // Store basic user info
      setUser({ email, role: "user" }); // Role will be updated from token
    }

    return response;
  },

  // Admin-only endpoint (to verify authorization)
  adminOnly: async () => {
    return await apiCall("/Auth/admin-only", "GET", null, true);
  },

  // Logout
  logout: () => {
    removeToken();
    removeUser();
  },
};
