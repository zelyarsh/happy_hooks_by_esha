import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getOrders,
  createOrder as createOrderAPI,
  updateOrderStatus,
  cancelOrder as cancelOrderAPI,
  deleteOrder as deleteOrderAPI,
} from "../services/orderService";

const OrderContext = createContext();
const STATUS_FLOW = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderTotal = (order) => order.totalAmount ?? 0;

  // -----------------------------
  // Create a real order (used by Checkout)
  // -----------------------------
  const createOrder = async (payload) => {
    try {
      const data = await createOrderAPI(payload);
      setOrders((prev) => [data.order, ...prev]);
      return { success: true, order: data.order };
    } catch (error) {
      console.error("Failed to create order:", error);
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // Update order status
  // -----------------------------
  const updateStatus = async (id, status) => {
    try {
      const data = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? data.order : o)));
      return { success: true };
    } catch (error) {
      console.error("Failed to update order status:", error);
      return { success: false, message: error.message };
    }
  };

  const advanceStatus = (id) => {
    const order = orders.find((o) => o._id === id);
    if (!order) return;
    const index = STATUS_FLOW.indexOf(order.orderStatus);
    if (index === -1 || index === STATUS_FLOW.length - 1) return;
    return updateStatus(id, STATUS_FLOW[index + 1]);
  };

  // -----------------------------
  // Cancel order
  // -----------------------------
  const cancelOrder = async (id) => {
    try {
      const data = await cancelOrderAPI(id);
      setOrders((prev) => prev.map((o) => (o._id === id ? data.order : o)));
      return { success: true };
    } catch (error) {
      console.error("Failed to cancel order:", error);
      return { success: false, message: error.message };
    }
  };

  // -----------------------------
  // Delete order
  // -----------------------------
  const deleteOrder = async (id) => {
    try {
      await deleteOrderAPI(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete order:", error);
      return { success: false, message: error.message };
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const processingOrders = orders.filter((o) => o.orderStatus === "Processing").length;
  const shippedOrders = orders.filter((o) => o.orderStatus === "Shipped").length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered").length;
  const cancelledOrders = orders.filter((o) => o.orderStatus === "Cancelled").length;

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + orderTotal(o), 0);

  const value = useMemo(
    () => ({
      orders,
      loading,
      fetchOrders,
      orderTotal,
      createOrder,
      updateStatus,
      advanceStatus,
      cancelOrder,
      deleteOrder,
      STATUS_FLOW,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    }),
    [orders, loading]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => useContext(OrderContext);
