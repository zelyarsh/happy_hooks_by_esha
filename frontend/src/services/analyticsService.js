import { apiRequest } from "./apiClient";

export const getDashboardStats = () => apiRequest("/analytics/dashboard");

export const getSalesAnalytics = () => apiRequest("/analytics/sales");

export const getOrderAnalytics = () => apiRequest("/analytics/orders");

export const getPaymentAnalytics = () => apiRequest("/analytics/payments");

export const getTopProducts = () => apiRequest("/analytics/top-products");

export const getCustomerAnalytics = () => apiRequest("/analytics/customers");

export const getReviewAnalytics = () => apiRequest("/analytics/reviews");
