import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCopy,
} from "react-icons/fa";

function CategoryActions({
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  return (
    <div className="flex justify-center gap-2">

      <button
        onClick={onView}
        className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        <FaEye className="mx-auto" />
      </button>

      <button
        onClick={onEdit}
        className="w-10 h-10 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white transition"
      >
        <FaEdit className="mx-auto" />
      </button>

      <button
        onClick={onDuplicate}
        className="w-10 h-10 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition"
      >
        <FaCopy className="mx-auto" />
      </button>

      <button
        onClick={onDelete}
        className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
      >
        <FaTrash className="mx-auto" />
      </button>

    </div>
  );
}

export default CategoryActions;