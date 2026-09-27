import { FaSearch } from "react-icons/fa";

function ProductSearch({ search, setSearch }) {
  return (
    <div className="relative w-full sm:w-96">

      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
      />

    </div>
  );
}

export default ProductSearch;
