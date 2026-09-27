import { apiRequest } from "./apiClient";

export const createReview = (review) =>
  apiRequest("/reviews", { method: "POST", body: review });

export const getProductReviews = (productId) =>
  apiRequest(`/reviews/product/${productId}`);

export const getReviews = () => apiRequest("/reviews");

export const getReviewById = (id) => apiRequest(`/reviews/${id}`);

export const updateReviewStatus = (id, status) =>
  apiRequest(`/reviews/${id}/status`, { method: "PUT", body: { status } });

export const deleteReview = (id) =>
  apiRequest(`/reviews/${id}`, { method: "DELETE" });

export const getReviewStats = () => apiRequest("/reviews/stats");
