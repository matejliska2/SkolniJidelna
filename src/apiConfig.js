const API_BASE_URL = "http://localhost:3000/api";

const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login`,
  lunches: `${API_BASE_URL}/lunches/`,
  comments: `${API_BASE_URL}/comments`,
  reviews: `${API_BASE_URL}/reviews`,
  reviewStats: (lunchId) => `${API_BASE_URL}/reviews/stats?lunchId=${lunchId}`,
  commentsForLunch: (lunchId) => `${API_BASE_URL}/comments?lunchId=${lunchId}`,
  verifyToken: `${API_BASE_URL}/verify-token`
};

export default API_ENDPOINTS;