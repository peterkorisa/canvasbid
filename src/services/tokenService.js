// Token storage keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

/**
 * Decode JWT token payload
 */
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

/**
 * Get the current access token
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get the current refresh token
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Store both access and refresh tokens
 */
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Clear all tokens
 */
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Get token expiry time from JWT payload
 */
export const getTokenExpiryTime = (token) => {
  if (!token) return null;
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  return new Date(decoded.exp * 1000); // Convert from seconds to milliseconds
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;
  // Consider token expired if less than 1 minute remaining
  return new Date() >= new Date(expiryTime.getTime() - 60000);
};

/**
 * Get user info from localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Store user info
 */
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Extract user role from access token
 */
export const getUserRoleFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  // JWT standard role claim
  if (decoded.role) {
    return Array.isArray(decoded.role) ? decoded.role[0] : decoded.role;
  }

  // Microsoft Identity claims
  const msRoleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  if (decoded[msRoleClaim]) {
    return Array.isArray(decoded[msRoleClaim])
      ? decoded[msRoleClaim][0]
      : decoded[msRoleClaim];
  }

  return null;
};

/**
 * Get remaining time before token expires (in milliseconds)
 */
export const getTimeUntilExpiry = (token) => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return 0;
  const remaining = expiryTime.getTime() - new Date().getTime();
  return Math.max(0, remaining);
};
