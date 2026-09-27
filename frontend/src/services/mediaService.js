import { apiRequest } from "./apiClient";

export const getMedia = () => apiRequest("/media");

export const deleteMedia = (id) =>
  apiRequest(`/media/${id}`, { method: "DELETE" });
