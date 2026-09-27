import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext";

function NewArrivalTable({ arrivals, onView, onEdit }) {
  const { deleteProduct, toggleStatus } = useProducts();

  if (arrivals.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center text-gray-400">
        No new arrivals match your filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-pink-50">
          <tr>
            <th className="p-5 text-left">Image</th>
            <th className="text-left">Product</th>
            <th className="text-left">Category</th>
            <th className="text-left">Price</th>
            <th className="text-left">Stock</th>
            <th className="text-left">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {arrivals.map((item) => (
            <tr key={item.id} className="border-t hover:bg-pink-50 transition">
              <td className="p-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              </td>
              <td className="font-semibold">{item.name}</td>
              <td>
                {item.category}
                {item.subCategory && <div className="text-xs text-gray-400">{item.subCategory}</div>}
              </td>
              <td>Rs. {item.price}</td>
              <td>{item.stock}</td>
              <td>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                    item.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </button>
              </td>
              <td>
                <div className="flex justify-center gap-3 py-2">
                  <button onClick={() => onView(item)} className="bg-blue-500 text-white w-10 h-10 rounded-xl hover:bg-blue-600"><FaEye /></button>
                  <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white w-10 h-10 rounded-xl hover:bg-yellow-600"><FaEdit /></button>
                  <button
                    onClick={() => { if (window.confirm(`Remove ${item.name} from New Arrivals?`)) deleteProduct(item.id); }}
                    className="bg-red-500 text-white w-10 h-10 rounded-xl hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewArrivalTable;
