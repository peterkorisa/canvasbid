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

export const BASE_URL = "http://localhost:5028/api";

let isRefreshing = false;
let refreshPromise = null;

export const getToken = () => getAccessToken();
export const setToken = (token) => setTokens(token, null);
export const removeToken = () => clearTokens();

export const getUser = () => getStoredUser();
export const setUser = (user) => setStoredUser(user);
export const removeUser = () => clearTokens();

export const apiCall = async (
  endpoint,
  method = "GET",
  body = null,
  requiresAuth = true,
) => {
  const headers = {};
  const isFormData = body instanceof FormData;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

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
    options.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    console.log(`API Call: ${method} ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    console.log(`API Response Status: ${response.status}`);

    if (response.status === 401) {
      removeToken();
      removeUser();
      window.location.href = "/login";
      return null;
    }

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "Access Denied: Your account may be pending admin approval, or you do not have permission to view this.",
        );
      }

      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      const responseText = await response.text();
      
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.errors) {
          const firstKey = Object.keys(errorData.errors)[0];
          errorMessage = Array.isArray(errorData.errors[firstKey])
            ? errorData.errors[firstKey][0]
            : errorData.errors[firstKey];
        } else {
          errorMessage =
            errorData.message ||
            errorData.error ||
            errorData.title ||
            errorMessage;
        }
      } catch (e) {
        if (responseText) {
          errorMessage = responseText;
        }
      }
      throw new Error(errorMessage);
    }

    const textData = await response.text();
    if (!textData) return null;

    try {
      return JSON.parse(textData);
    } catch (e) {
      return textData;
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  const roleKey =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const roles = decoded[roleKey];

  return Array.isArray(roles) ? roles[0] : roles;
};
