import { FaStar, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

function QuickViewModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl max-w-5xl w-full relative overflow-hidden animate-[fadeIn_.3s]">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl hover:text-pink-500"
        >
          <FaTimes />
        </button>

        <div className="grid lg:grid-cols-2">

          {/* Left */}

          <div className="bg-pink-50 p-8">

            <img
              src={product.image}
              alt={product.name}
              className="rounded-3xl w-full h-[500px] object-cover"
            />

          </div>

          {/* Right */}

          <div className="p-10">

            <p className="uppercase tracking-[4px] text-pink-500">

              {product.category}

            </p>

            <h2 className="text-4xl font-bold mt-3">

              {product.name}

            </h2>

            <div className="flex items-center gap-3 mt-5">

              <div className="flex text-yellow-400">

                {[...Array(product.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}

              </div>

              <span className="text-gray-500">

                ({product.reviews} Reviews)

              </span>

            </div>

            <p className="text-pink-500 text-4xl font-bold mt-6">

              Rs. {product.price}

            </p>

            <p className="text-gray-600 leading-8 mt-8">

              {product.description}

            </p>

            {/* Quantity */}

            <div className="flex items-center gap-5 mt-10">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                className="bg-gray-100 px-5 py-3 rounded-xl"
              >
                -
              </button>

              <span className="text-2xl font-bold">

                {quantity}

              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="bg-gray-100 px-5 py-3 rounded-xl"
              >
                +
              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-500 text-white py-4 rounded-full hover:bg-pink-600 transition flex items-center justify-center gap-3"
              >
                <FaShoppingCart />

                Add To Cart
              </button>

              <button
                className="flex-1 border-2 border-pink-500 text-pink-500 py-4 rounded-full hover:bg-pink-500 hover:text-white transition"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickViewModal;