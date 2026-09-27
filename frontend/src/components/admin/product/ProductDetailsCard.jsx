function ProductDetailsCard({ product }) {
  if (!product) return null;

  return (
    <div className="space-y-6 animate-fadeIn">

      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-pink-600 text-3xl font-bold mt-4">
          Rs. {product.price}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Category</p>
          <h3 className="font-bold">
            {product.category}
            {product.subCategory ? ` / ${product.subCategory}` : ""}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Stock</p>
          <h3 className="font-bold">{product.stock}</h3>
        </div>

        <div>
          <p className="text-gray-500">Rating</p>
          <h3>⭐ {product.rating}</h3>
        </div>

        <div>
          <p className="text-gray-500">Reviews</p>
          <h3>{product.reviews}</h3>
        </div>

      </div>

      <div>
        <p className="text-gray-500 mb-2">Description</p>
        <p className="leading-7 text-gray-700">{product.description}</p>
      </div>

      <div className="flex gap-3 flex-wrap">

        {product.featured && (
          <span className="px-4 py-2 bg-yellow-100 rounded-full transition-transform duration-200 hover:scale-105">
            ⭐ Featured
          </span>
        )}

        {product.isNew && (
          <span className="px-4 py-2 bg-green-100 rounded-full transition-transform duration-200 hover:scale-105">
            🆕 New Arrival
          </span>
        )}

        {product.badge && (
          <span className="px-4 py-2 bg-pink-100 rounded-full transition-transform duration-200 hover:scale-105">
            {product.badge}
          </span>
        )}

      </div>

    </div>
  );
}

export default ProductDetailsCard;
