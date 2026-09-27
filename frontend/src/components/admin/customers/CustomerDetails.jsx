import { FaTimes } from "react-icons/fa";

function CustomerDetails({ open, customer, onClose }) {
  if (!open || !customer) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{customer.name}</h2>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${customer.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>{customer.status}</span>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-pink-100 flex items-center justify-center transition"><FaTimes /></button>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-3"><span className="text-gray-400">Email</span><span>{customer.email}</span></div>
          <div className="flex justify-between border-b pb-3"><span className="text-gray-400">Joined</span><span>{new Date(customer.createdAt).toLocaleDateString()}</span></div>
          <div className="flex justify-between border-b pb-3"><span className="text-gray-400">Total Orders</span><span>{customer.totalOrders ?? 0}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Total Spend</span><span className="font-bold text-pink-600">Rs. {customer.totalSpent ?? 0}</span></div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
