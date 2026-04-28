import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  isTokenExpired,
  decodeToken as decodeTokenUtil,
  getUser as getStoredUser,
  setUser as setStoredUser,
  getUserRoleFromToken,
} from "./tokenService";

const BASE_URL = "https://app-260421214011.azurewebsites.net/api";

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise = null;

// Token management (for backward compatibility and delegation to tokenService)
export const getToken = () => getAccessToken();
export const setToken = (token) => setTokens(token, null);
export const removeToken = () => clearTokens();

export const getUser = () => getStoredUser();
export const setUser = (user) => setStoredUser(user);
export const removeUser = () => clearTokens();

// Base API call function
export const apiCall = async (
  endpoint,
  method = "GET",
  body = null,
  requiresAuth = true
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add JWT token if required and available
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
    mode: "cors",
  };

  if (body && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`API Call: ${method} ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    console.log(`API Response Status: ${response.status}`);

    // Handle unauthorized (token expired or invalid)
    if (response.status === 401) {
      removeToken();
      removeUser();
      window.location.href = "/login"; // Redirect to login
      return null;
    }

    // Handle server errors
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access Denied: Your account may be pending admin approval, or you do not have permission to view this.");
      }
      
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          errorMessage = Array.isArray(errorData.errors[firstKey]) ? errorData.errors[firstKey][0] : errorData.errors[firstKey];
        } else {
          errorMessage = errorData.message || errorData.error || errorData.title || errorMessage;
        }
      } catch (e) {
        // Ignored if not JSON
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// Helper to decode JWT and extract role
export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Helper to extract user role from token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  // JWT stores roles in "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const roles = decoded[roleKey];

  // Could be string or array
  return Array.isArray(roles) ? roles[0] : roles;
};
