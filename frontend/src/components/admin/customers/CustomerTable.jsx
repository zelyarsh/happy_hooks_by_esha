import { useMemo, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useCustomers } from "../../../context/CustomerContext";
import CustomerDetails from "./CustomerDetails";

function CustomerTable() {
  const { customers, deleteCustomer } = useCustomers();
  const [search, setSearch] = useState("");
  const [viewCustomer, setViewCustomer] = useState(null);

  const filtered = useMemo(() => {
    return customers.filter(
      (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <div className="p-5 flex justify-between">
        <input placeholder="Search customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-xl px-5 py-3 w-80 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500" />
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center text-gray-400">No customers match your search.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-50">
              <tr>
                <th className="p-5 text-left">Customer</th>
                <th>Email</th>
                <th>Status</th>
                <th>Orders</th>
                <th>Total Spend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer._id} className="border-t hover:bg-pink-50 transition">
                  <td className="p-5 font-semibold">{customer.name}</td>
                  <td className="text-center">{customer.email}</td>
                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${customer.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="text-center">{customer.totalOrders ?? 0}</td>
                  <td className="text-center">Rs. {customer.totalSpent ?? 0}</td>
                  <td>
                    <div className="flex justify-center gap-4 py-3">
                      <button onClick={() => setViewCustomer(customer)} className="text-blue-500 hover:scale-110 transition"><FaEye /></button>
                      <button onClick={() => { if (window.confirm(`Remove ${customer.name} from your customer list?`)) deleteCustomer(customer._id); }} className="text-red-500 hover:scale-110 transition"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerDetails open={!!viewCustomer} customer={viewCustomer} onClose={() => setViewCustomer(null)} />
    </div>
  );
}

export default CustomerTable;
