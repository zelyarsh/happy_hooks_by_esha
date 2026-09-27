import { apiRequest } from "./apiClient";

export const getCustomers = () => apiRequest("/customers");

export const getCustomerById = (id) => apiRequest(`/customers/${id}`);

export const updateCustomer = (id, customer) =>
  apiRequest(`/customers/${id}`, { method: "PUT", body: customer });

export const deleteCustomer = (id) =>
  apiRequest(`/customers/${id}`, { method: "DELETE" });

export const getCustomerStats = () => apiRequest("/customers/stats");
