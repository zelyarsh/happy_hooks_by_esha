import { FaSearch, FaTimesCircle } from "react-icons/fa";
import ProductSort from "./ProductSort";
import ProductViewToggle from "./ProductViewToggle";
import { useCategories } from "../../../context/CategoryContext";

function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  view,
  setView,
}) {
  const { categories } = useCategories();
  const hasActiveFilters = search !== "" || category !== "" || sort !== "";

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  return (
    <div className="bg-white rounded-3xl shadow p-5 transition-shadow duration-300 hover:shadow-md">

      <div className="grid lg:grid-cols-6 gap-4 items-stretch">

        <div className="relative lg:col-span-2">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full border rounded-xl pl-11 pr-4 py-3 transition-all duration-200 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />

        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3 transition-all duration-200 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <ProductSort sort={sort} setSort={setSort} />

        <ProductViewToggle view={view} setView={setView} />

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center gap-2 py-3 transition-all duration-200 hover:bg-pink-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-pink-100"
        >
          <FaTimesCircle />
          Clear
        </button>

      </div>

    </div>
  );
}

export default ProductToolbar;
