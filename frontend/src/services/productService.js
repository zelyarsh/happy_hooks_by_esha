import { apiRequest } from "./apiClient";

export const getProducts = () => apiRequest("/products");

export const getProductById = (id) => apiRequest(`/products/${id}`);

export const createProduct = (product) =>
  apiRequest("/products", { method: "POST", body: product });

export const updateProduct = (id, product) =>
  apiRequest(`/products/${id}`, { method: "PUT", body: product });

export const deleteProduct = (id) =>
  apiRequest(`/products/${id}`, { method: "DELETE" });
