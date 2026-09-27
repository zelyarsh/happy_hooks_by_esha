import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

function ArrivalCard({ product = {} }) {
  const {
    image = "https://placehold.co/600x600/fce7f3/ec4899?text=No+Image",
    name = "Unnamed Product",
    category = "Uncategorized",
    price = "Rs. 0",
    status = "Active",
  } = product;

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

      <div className="relative">

        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />

        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="p-6">

        <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">
          New Arrival
        </span>

        <h2 className="text-xl font-bold mt-4">
          {name}
        </h2>

        <p className="text-gray-500 mt-2">
          {category}
        </p>

        <h3 className="text-2xl font-bold text-pink-500 mt-4">
          {price}
        </h3>

        <div className="grid grid-cols-3 gap-3 mt-6">

          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition">
            <FaEye className="mx-auto" />
          </button>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition">
            <FaEdit className="mx-auto" />
          </button>

          <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
            <FaTrash className="mx-auto" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ArrivalCard;