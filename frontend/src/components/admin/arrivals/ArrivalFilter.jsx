import { FaSearch, FaFilter } from "react-icons/fa";
import { useCategories } from "../../../context/CategoryContext";

function ArrivalFilter({ search, setSearch, category, setCategory, status, setStatus }) {
  const { categories } = useCategories();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="grid lg:grid-cols-4 gap-5">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product..."
            className="border rounded-xl px-10 py-3 w-full"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded-xl px-5 py-3">
          <option value="">All Categories</option>
          {categories.map((c) => (<option key={c._id} value={c.name}>{c.name}</option>))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-xl px-5 py-3">
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl flex justify-center items-center gap-3 py-3">
          <FaFilter />
          Filters Applied
        </div>
      </div>
    </div>
  );
}

export default ArrivalFilter;
