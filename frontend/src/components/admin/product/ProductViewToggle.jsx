import { FaThLarge, FaList } from "react-icons/fa";

function ProductViewToggle({ view, setView }) {
  return (
    <div className="flex border rounded-xl overflow-hidden">

      <button
        type="button"
        title="Grid view"
        onClick={() => setView("grid")}
        className={`flex-1 px-4 py-3 flex items-center justify-center transition-all duration-200 ${
          view === "grid"
            ? "bg-pink-500 text-white"
            : "bg-white text-gray-500 hover:bg-pink-50"
        }`}
      >
        <FaThLarge />
      </button>

      <button
        type="button"
        title="Table view"
        onClick={() => setView("table")}
        className={`flex-1 px-4 py-3 flex items-center justify-center transition-all duration-200 ${
          view === "table"
            ? "bg-pink-500 text-white"
            : "bg-white text-gray-500 hover:bg-pink-50"
        }`}
      >
        <FaList />
      </button>

    </div>
  );
}

export default ProductViewToggle;
