import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrderSuccessModal({ isOpen, onClose, order }) {
  if (!isOpen) return null;

  const orderNumber = order?.orderNumber || "—";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-5">

      <div className="bg-white rounded-[35px] shadow-2xl max-w-lg w-full p-10 text-center animate-[fadeIn_.3s_ease]">

        {/* Success Icon */}

        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">

          <FaCheckCircle className="text-green-500 text-6xl" />

        </div>

        <h2 className="text-4xl font-bold mt-8">
          Order Placed!
        </h2>

        <p className="text-gray-600 mt-4 leading-8">
          Thank you for shopping with
          <span className="font-semibold text-pink-500">
            {" "}Happy Hooks by Esha
          </span>.
          <br />
          We've received your order and will contact you soon.
        </p>

        <div className="mt-8 bg-pink-50 rounded-2xl p-5">

          <p className="text-gray-500">
            Order Number
          </p>

          <h3 className="text-3xl font-bold text-pink-500 mt-2">
            #{orderNumber}
          </h3>

        </div>
<div className="flex gap-4 mt-10">

  <button
    onClick={onClose}
    className="flex-1 border border-pink-500 text-pink-500 py-4 rounded-full hover:bg-pink-50 transition"
  >
    Close
  </button>

  <Link
    to="/shop"
    onClick={onClose}
    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold text-center"
  >
    Continue Shopping
  </Link>

</div>

      </div>
    </div>
  );
}

export default OrderSuccessModal;