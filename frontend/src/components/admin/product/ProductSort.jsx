function ProductSort({ sort, setSort }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="px-5 py-3 rounded-xl border transition-all duration-200 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
    >
      <option value="">Newest</option>
      <option value="priceLow">Price Low → High</option>
      <option value="priceHigh">Price High → Low</option>
      <option value="stock">Stock</option>
      <option value="rating">Rating</option>
      <option value="name">A-Z</option>
    </select>
  );
}

export default ProductSort;
