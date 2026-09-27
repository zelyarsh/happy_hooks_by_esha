import { Link } from "react-router-dom";

function SearchItem({ product, onClick }) {
  return (
    <Link
      to={`/product/${product.id}`}
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-pink-50 transition duration-300"
    >
      {/* Product Image */}

      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded-2xl object-cover border"
      />

      {/* Product Details */}

      <div className="flex-1">

        <h3 className="font-semibold text-gray-800">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <p className="text-pink-500 font-bold mt-1">
          Rs. {product.price.toLocaleString()}
        </p>

      </div>

    </Link>
  );
}

export default SearchItem;