import { apiRequest } from "./apiClient";

export const getSettings = () => apiRequest("/settings");

export const updateSettings = (payload) =>
  apiRequest("/settings", { method: "PUT", body: payload });
