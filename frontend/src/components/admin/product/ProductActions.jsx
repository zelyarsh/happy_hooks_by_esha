import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCopy,
  FaStar,
} from "react-icons/fa";

import { useProducts } from "../../../context/ProductContext";

const baseBtn =
  "w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md active:scale-95";

function ProductActions({
  product,
  onView,
  onEdit,
  onDelete,
}) {
  const { duplicateProduct, toggleFeatured } = useProducts();

  return (
    <div className="flex justify-center gap-2">

      <button
        type="button"
        title="View"
        onClick={() => onView?.(product)}
        className={`${baseBtn} bg-blue-500 hover:bg-blue-600`}
      >
        <FaEye />
      </button>

      <button
        type="button"
        title="Edit"
        onClick={() => onEdit?.(product)}
        className={`${baseBtn} bg-yellow-500 hover:bg-yellow-600`}
      >
        <FaEdit />
      </button>

      <button
        type="button"
        title="Duplicate"
        onClick={() => duplicateProduct(product)}
        className={`${baseBtn} bg-purple-500 hover:bg-purple-600`}
      >
        <FaCopy />
      </button>

      <button
        type="button"
        title={product.featured ? "Unfeature" : "Mark as Featured"}
        onClick={() => toggleFeatured(product.id)}
        className={`${baseBtn} ${
          product.featured
            ? "bg-pink-600 hover:bg-pink-700"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
      >
        <FaStar className={`transition-transform duration-300 ${product.featured ? "scale-110" : ""}`} />
      </button>

      <button
        type="button"
        title="Delete"
        onClick={() => onDelete?.(product)}
        className={`${baseBtn} bg-red-500 hover:bg-red-600`}
      >
        <FaTrash />
      </button>

    </div>
  );
}

export default ProductActions;
