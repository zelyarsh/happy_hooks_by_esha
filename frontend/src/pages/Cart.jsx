import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

function Cart() {
  const {
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = useCart();
const cartSubtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const shipping = 250;
  const total = cartSubtotal + shipping;

  return (
    <section className="bg-gradient-to-b from-pink-50/40 to-white min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">

          <div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 transition font-medium"
            >
              <FaArrowLeft />

              Continue Shopping

            </Link>

            <h1 className="text-5xl font-bold mt-4">
              Shopping Bag
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Handmade crochet treasures selected just for you.
            </p>

          </div>

          <div className="mt-6 lg:mt-0 bg-white rounded-2xl shadow-md px-6 py-4">

            <p className="text-gray-500 text-sm">
              Total Items
            </p>

            <h2 className="text-3xl font-bold text-pink-500">
              {cartItems.length}
            </h2>

          </div>

        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            {cartItems.map((item) => (

              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />

            ))}

          </div>

          {/* Right */}

          <CartSummary
            subtotal={cartSubtotal}
            shipping={shipping}
            total={total}
            clearCart={clearCart}
          />

        </div>

      </div>

    </section>
  );
}

export default Cart;