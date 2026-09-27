import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";
import QuickViewModal from "./QuickViewModal";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product.id);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs uppercase px-4 py-2 rounded-full font-semibold shadow">
              {product.badge}
            </span>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-500">

            {/* Wishlist */}
           <button
  onClick={() => {
    if (liked) {
      removeFromWishlist(product.id);

      showToast({
        type: "warning",
        title: "Removed from Wishlist",
        message: product.name,
      });
    } else {
      addToWishlist(product);

      showToast({
        type: "success",
        title: "Added to Wishlist",
        message: product.name,
      });
    }
  }}
  className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
>
  <FaHeart
    className={`transition ${
      liked
        ? "text-red-500 scale-125"
        : "text-gray-600"
    }`}
  />
</button>

            {/* Quick View */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <FaEye className="text-pink-500" />
            </button>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <p className="uppercase tracking-widest text-pink-500 text-sm font-medium">
            {product.category}
          </p>

          <Link to={`/product/${product.id}`}>
            <h3 className="text-2xl font-bold mt-2 hover:text-pink-500 transition">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">

            <div className="flex text-yellow-400">
              {[...Array(product.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <span className="text-gray-500 text-sm">
              ({product.reviews} Reviews)
            </span>

          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-pink-500 mt-5">
            Rs. {product.price}
          </p>

          {/* Add To Cart */}
          <button
            onClick={() => {
  addToCart(product);

  showToast({
    type: "success",
    title: "Added to Cart",
    message: product.name,
  });
}}
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full hover:scale-[1.03] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>

      </div>

      {/* Quick View Modal */}
      {showModal && (
        <QuickViewModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default ProductCard;