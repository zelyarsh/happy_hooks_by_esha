function ProductStatusBadge({ stock = 0 }) {
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Out of Stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Active
    </span>
  );
}

export default ProductStatusBadge;
