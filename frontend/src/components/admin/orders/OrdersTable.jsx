import { useMemo, useState } from "react";
import { FaEye, FaPrint, FaTrash, FaArrowRight } from "react-icons/fa";
import { useOrders } from "../../../context/OrderContext";
import OrderStatus from "./OrderStatus";
import InvoiceModal from "./InvoiceModal";

function OrdersTable() {
  const { orders, orderTotal, updateStatus, advanceStatus, deleteOrder, STATUS_FLOW } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || order.orderStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <div className="p-5 flex flex-col sm:flex-row gap-4 sm:justify-between">
        <input placeholder="Search order or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-xl px-5 py-3 w-full sm:w-80 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500">
          <option value="">All Orders</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center text-gray-400">No orders match your filters.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-50">
              <tr>
                <th className="p-5 text-left">Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id} className="border-t hover:bg-pink-50/70 transition">
                  <td className="p-5 font-semibold">{order.orderNumber}</td>
                  <td className="text-center">{order.customerName}</td>
                  <td className="text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">Rs. {orderTotal(order)}</td>
                  <td className="text-center">
                    <select value={order.orderStatus} onChange={(e) => updateStatus(order._id, e.target.value)} className="border-none bg-transparent">
                      {[...STATUS_FLOW, "Cancelled"].map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                    <div className="mt-1"><OrderStatus status={order.orderStatus} /></div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-3 py-3">
                      <button onClick={() => setInvoiceOrder(order)} title="View invoice" className="text-blue-500 hover:scale-110 transition"><FaEye /></button>
                      <button onClick={() => setInvoiceOrder(order)} title="Print invoice" className="text-pink-500 hover:scale-110 transition"><FaPrint /></button>
                      {STATUS_FLOW.indexOf(order.orderStatus) !== -1 && STATUS_FLOW.indexOf(order.orderStatus) < STATUS_FLOW.length - 1 && (
                        <button onClick={() => advanceStatus(order._id)} title="Advance to next status" className="text-green-500 hover:scale-110 transition"><FaArrowRight /></button>
                      )}
                      <button onClick={() => { if (window.confirm(`Delete order ${order.orderNumber}?`)) deleteOrder(order._id); }} title="Delete order" className="text-red-500 hover:scale-110 transition"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <InvoiceModal open={!!invoiceOrder} order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
    </div>
  );
}

export default OrdersTable;
