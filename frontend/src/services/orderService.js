import { apiRequest } from "./apiClient";

export const getOrders = () => apiRequest("/orders");

export const getOrderById = (id) => apiRequest(`/orders/${id}`);

export const getCustomerOrders = (customerId) =>
  apiRequest(`/orders/customer/${customerId}`);

export const createOrder = (order) =>
  apiRequest("/orders", { method: "POST", body: order });

export const updateOrderStatus = (id, orderStatus) =>
  apiRequest(`/orders/${id}/status`, { method: "PUT", body: { orderStatus } });

export const updatePaymentStatus = (id, paymentStatus) =>
  apiRequest(`/orders/${id}/payment`, { method: "PUT", body: { paymentStatus } });

export const cancelOrder = (id) =>
  apiRequest(`/orders/${id}/cancel`, { method: "PUT" });

export const deleteOrder = (id) =>
  apiRequest(`/orders/${id}`, { method: "DELETE" });
