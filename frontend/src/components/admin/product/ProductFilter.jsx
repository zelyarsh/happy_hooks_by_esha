import { useCategories } from "../../../context/CategoryContext";

function ProductFilter({ category, setCategory }) {
  const { categories } = useCategories();

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="px-5 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default ProductFilter;
