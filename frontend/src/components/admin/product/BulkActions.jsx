import { FaTrash, FaStar, FaCheck } from "react-icons/fa";

function BulkActions({
  selected,
  deleteSelected,
  featureSelected,
  arrivalSelected,
}) {
  if (selected.length === 0) return null;

  return (
    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">

      <h3 className="font-bold text-gray-800">
        {selected.length} Product{selected.length > 1 ? "s" : ""} Selected
      </h3>

      <div className="flex gap-3 flex-wrap">

        <button
          onClick={featureSelected}
          className="bg-yellow-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 hover:bg-yellow-600 hover:shadow-md active:scale-95"
        >
          <FaStar />
          Feature
        </button>

        <button
          onClick={arrivalSelected}
          className="bg-green-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 hover:bg-green-600 hover:shadow-md active:scale-95"
        >
          <FaCheck />
          New Arrival
        </button>

        <button
          onClick={deleteSelected}
          className="bg-red-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 hover:bg-red-600 hover:shadow-md active:scale-95"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
}

export default BulkActions;
