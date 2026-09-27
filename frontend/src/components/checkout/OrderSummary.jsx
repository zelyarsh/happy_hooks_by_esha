import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { useAuth } from "../../context/AuthContext";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import OrderSuccessModal from "./OrderSuccessModal";
import { useToast } from "../../context/ToastContext";

function OrderSummary({ billing, shippingFee, paymentMethod }) {

  const { cartItems, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [placing, setPlacing] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingFee;

  const validate = () => {
    if (cartItems.length === 0) {
      showToast({ type: "error", title: "Your cart is empty", message: "Add something before checking out." });
      return false;
    }
    if (!billing.firstName || !billing.lastName || !billing.email || !billing.phone || !billing.address || !billing.city) {
      showToast({ type: "error", title: "Missing details", message: "Please fill in all billing fields." });
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validate()) return;

    setPlacing(true);

    const payload = {
      customerId: user?._id || null,
      customerName: `${billing.firstName} ${billing.lastName}`.trim(),
      customerEmail: billing.email,
      customerPhone: billing.phone,
      items: cartItems.map((item) => ({
        productId: item._id || item.id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: `${billing.firstName} ${billing.lastName}`.trim(),
        phone: billing.phone,
        address: billing.address,
        city: billing.city,
        postalCode: billing.postalCode,
      },
      shippingFee,
      paymentMethod,
    };

    const result = await createOrder(payload);

    setPlacing(false);

    if (!result.success) {
      showToast({
        type: "error",
        title: "Couldn't place order",
        message: result.message || "Something went wrong. Please try again.",
      });
      return;
    }

    setPlacedOrder(result.order);
    setShowSuccess(true);
    clearCart();

    showToast({
      type: "success",
      title: "Order Placed Successfully",
      message: "Thank you for shopping with Happy Hooks by Esha!",
    });
  };

  return (
    <>
      <div className="lg:sticky lg:top-28">

        <div className="bg-white rounded-[30px] shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-8">

            <p className="uppercase tracking-[4px] text-sm">
              Happy Hooks
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Order Summary
            </h2>

          </div>

          <div className="p-8">

            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty.</p>
            ) : (
              <div className="space-y-6 max-h-80 overflow-y-auto">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4 items-center"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-pink-500">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>
            )}

            <hr className="my-8" />

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. {shippingFee.toLocaleString()}</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-pink-500">
                  Rs. {total.toLocaleString()}
                </span>

              </div>

            </div>

            <button
              onClick={placeOrder}
              disabled={placing || cartItems.length === 0}
              className="w-full mt-8 bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" />
                Handmade with Love
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" />
                Nationwide Delivery
              </div>

              <div className="flex items-center gap-3">
                <FaLock className="text-pink-500" />
                Secure Checkout
              </div>

            </div>

          </div>

        </div>

      </div>

      <OrderSuccessModal
        isOpen={showSuccess}
        order={placedOrder}
        onClose={() => setShowSuccess(false)}
      />

    </>
  );
}

export default OrderSummary;
