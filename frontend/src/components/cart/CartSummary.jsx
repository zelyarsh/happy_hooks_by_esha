import {
  FaArrowRight,
  FaLock,
  FaHeart,
  FaTruck,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
function CartSummary({
  subtotal,
  shipping,
  total,
  clearCart,
}) {
  const { showToast } = useToast();
  return (
    <div className="lg:sticky lg:top-28">

      <div className="bg-white rounded-[30px] shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-8">

          <p className="uppercase tracking-[4px] text-sm opacity-90">
            Happy Hooks
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Order Summary
          </h2>

        </div>

        {/* Summary */}

        <div className="p-8">

          <div className="space-y-6">

            <div className="flex justify-between text-gray-600">

              <span>Subtotal</span>

              <span className="font-semibold">
                Rs. {subtotal.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between text-gray-600">

              <span>Delivery</span>

              <span className="font-semibold">
                Rs. {shipping.toLocaleString()}
              </span>

            </div>

            <hr />

            <div className="flex justify-between items-center">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-3xl font-bold text-pink-500">
                Rs. {total.toLocaleString()}
              </span>

            </div>

          </div>

          {/* Checkout Button */}

          <Link
  to="/checkout"
  className="group mt-10 w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
>

  Proceed To Checkout

  <FaArrowRight className="group-hover:translate-x-1 transition" />

</Link>

          {/* Continue Shopping */}

          <Link
            to="/shop"
            className="block text-center mt-5 text-pink-500 hover:text-pink-600 font-medium"
          >
            Continue Shopping
          </Link>

          {/* Clear Cart */}

          <button
            onClick={() => {
  clearCart();

  showToast({
    type: "info",
    title: "Cart Cleared",
    message: "Your shopping cart is now empty.",
  });
}}
            className="w-full mt-5 border border-red-300 text-red-500 py-3 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <div className="flex items-center justify-center gap-2">

              <FaTrash />

              Clear Cart

            </div>

          </button>

          {/* Trust Section */}

          <div className="mt-10 border-t pt-8 space-y-5">

            <div className="flex items-center gap-3 text-gray-600">

              <FaHeart className="text-pink-500" />

              Handmade with Love

            </div>

            <div className="flex items-center gap-3 text-gray-600">

              <FaTruck className="text-pink-500" />

              Delivery Across Pakistan

            </div>

            <div className="flex items-center gap-3 text-gray-600">

              <FaLock className="text-pink-500" />

              Safe & Secure Checkout

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CartSummary;