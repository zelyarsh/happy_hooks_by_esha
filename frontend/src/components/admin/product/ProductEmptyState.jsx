import { FaBoxOpen } from "react-icons/fa";

function ProductEmptyState({ onAdd }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-16 text-center animate-fadeIn">

      <FaBoxOpen className="mx-auto text-6xl text-pink-300 animate-bounce" />

      <h2 className="text-3xl font-bold mt-6 text-gray-800">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-3">
        Try adjusting your search or filters, or add a new product.
      </p>

      {onAdd && (
        <button
          onClick={onAdd}
          className="mt-6 px-6 py-3 rounded-xl bg-pink-500 text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg active:scale-95"
        >
          Add Product
        </button>
      )}

    </div>
  );
}

export default ProductEmptyState;
