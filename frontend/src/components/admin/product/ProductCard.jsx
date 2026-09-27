import ProductStatusBadge from "./ProductStatusBadge";
import ProductActions from "./ProductActions";

function ProductCard({ product, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product.featured && (
          <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">
            ⭐ Featured
          </span>
        )}
      </div>

      <div className="p-6">

        <div className="flex justify-between items-start gap-2">
          <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
          <ProductStatusBadge stock={product.stock} />
        </div>

        <p className="text-gray-500 mt-2">
          {product.category}
          {product.subCategory ? ` • ${product.subCategory}` : ""}
        </p>

        <h3 className="text-pink-500 text-2xl font-bold mt-4">
          Rs. {product.price}
        </h3>

        <p className="mt-2 text-gray-600 text-sm">Stock: {product.stock}</p>

        <div className="mt-6">
          <ProductActions
            product={product}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

      </div>

    </div>
  );
}

export default ProductCard;
