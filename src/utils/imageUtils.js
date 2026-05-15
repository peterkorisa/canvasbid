import { BASE_URL } from "../services/api";

export const formatImage = (img, fallback = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150", artworkId = null) => {
  if (artworkId) {
    return `${BASE_URL}/Artwork/${artworkId}/image`;
  }

  if (!img) return fallback;
  if (typeof img !== 'string') return fallback;
  if (img.startsWith("http") || img.startsWith("data:image") || img.startsWith("blob:")) return img;
  

  if (img.startsWith("/") && !img.startsWith("/9j/")) return img;
  
  return `data:image/jpeg;base64,${img}`;
};
