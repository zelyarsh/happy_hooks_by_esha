import {
  FaTrash,
  FaCheck,
  FaBan,
  FaStar,
} from "react-icons/fa";

function BulkCategoryActions({
  selected,
  onDelete,
  onActivate,
  onDeactivate,
  onFeature,
}) {

  if (selected.length === 0) return null;

  return (

    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between">

      <h3 className="font-bold text-pink-600">

        {selected.length} Categories Selected

      </h3>

      <div className="flex gap-3">

        <button
          onClick={onFeature}
          className="px-4 py-2 rounded-xl bg-yellow-500 text-white flex items-center gap-2"
        >
          <FaStar />
          Feature
        </button>

        <button
          onClick={onActivate}
          className="px-4 py-2 rounded-xl bg-green-500 text-white flex items-center gap-2"
        >
          <FaCheck />
          Activate
        </button>

        <button
          onClick={onDeactivate}
          className="px-4 py-2 rounded-xl bg-gray-500 text-white flex items-center gap-2"
        >
          <FaBan />
          Deactivate
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-xl bg-red-500 text-white flex items-center gap-2"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>

  );
}

export default BulkCategoryActions;