// Token storage keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

/**
 * Decode JWT token payload
 */
export const decodeToken = (token) => {
  try {
    if (!token) {
      console.warn("⚠️ No token provided to decodeToken()");
      return null;
    }
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      console.error("❌ Invalid token format (no payload section):", token.substring(0, 50));
      return null;
    }
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    console.log("✅ Token decoded successfully");
    return decoded;
  } catch (error) {
    console.error("❌ Error decoding token:", error.message, "Token:", token?.substring(0, 50));
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
  console.log("🔐 setTokens called with token:", accessToken?.substring(0, 50) + "...");
  
  if (!accessToken) {
    console.error("❌ No accessToken provided to setTokens()");
    return;
  }
  
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    console.log("✅ Token stored in localStorage");
  } catch (error) {
    console.warn("⚠️ localStorage failed, trying sessionStorage:", error.message);
    try {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      console.log("✅ Token stored in sessionStorage as fallback");
    } catch (err) {
      console.error("❌ Both storage methods failed:", err);
    }
  }
  
  if (refreshToken) {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      try {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      } catch (err) {
        console.error("❌ Failed to store refresh token:", err);
      }
    }
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
  if (!token) {
    console.warn("⚠️ No token found for role extraction");
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.error("❌ Could not decode token for role extraction");
    return null;
  }

  // JWT standard role claim
  if (decoded.role) {
    console.log("✅ Role found in 'role' claim:", decoded.role);
    return Array.isArray(decoded.role) ? decoded.role[0] : decoded.role;
  }

  // Microsoft Identity claims
  const msRoleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  if (decoded[msRoleClaim]) {
    console.log("✅ Role found in Microsoft claim:", decoded[msRoleClaim]);
    return Array.isArray(decoded[msRoleClaim])
      ? decoded[msRoleClaim][0]
      : decoded[msRoleClaim];
  }

  console.warn("⚠️ No role claim found in token. Available keys:", Object.keys(decoded));
  return null;
};

/**
 * Extract user ID from access token
 */
export const getUserIdFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  // Microsoft Identity claim for User ID
  const nameIdentifierClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  if (decoded[nameIdentifierClaim]) {
    return Array.isArray(decoded[nameIdentifierClaim])
      ? decoded[nameIdentifierClaim][0]
      : decoded[nameIdentifierClaim];
  }
  
  if (decoded.sub) return decoded.sub;

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
