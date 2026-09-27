import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getCustomers,
  updateCustomer as updateCustomerAPI,
  deleteCustomer as deleteCustomerAPI,
} from "../services/customerService";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      await deleteCustomerAPI(id);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete customer:", error);
      return { success: false, message: error.message };
    }
  };

  const toggleStatus = async (id) => {
    const customer = customers.find((c) => c._id === id);
    if (!customer) return;

    const nextStatus = customer.status === "Active" ? "Inactive" : "Active";

    try {
      const data = await updateCustomerAPI(id, { status: nextStatus });
      setCustomers((prev) => prev.map((c) => (c._id === id ? { ...c, ...data.customer } : c)));
      return { success: true };
    } catch (error) {
      console.error("Failed to update customer:", error);
      return { success: false, message: error.message };
    }
  };

  const getCustomer = (id) => customers.find((c) => c._id === id);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const newCustomers = customers.filter(
    (c) => Date.now() - new Date(c.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000
  ).length;
  const totalOrdersFromCustomers = customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0);

  const value = useMemo(
    () => ({
      customers,
      loading,
      fetchCustomers,
      deleteCustomer,
      toggleStatus,
      getCustomer,
      totalCustomers,
      activeCustomers,
      newCustomers,
      totalOrdersFromCustomers,
    }),
    [customers, loading]
  );

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export const useCustomers = () => useContext(CustomerContext);
