import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function CustomOrderSuccessModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  const requestId =
    "HH-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-5">

      <div className="bg-white rounded-[35px] shadow-2xl max-w-xl w-full p-10 text-center">

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">

          <FaCheckCircle
            className="text-green-500"
            size={60}
          />

        </div>

        <h2 className="text-4xl font-bold mt-8">
          Request Submitted!
        </h2>

        <p className="text-gray-600 mt-5 leading-8">

          Thank you for choosing

          <span className="font-semibold text-pink-500">
            {" "}Happy Hooks by Esha
          </span>

          <br />

          We've received your custom order request.

        </p>

        <div className="bg-pink-50 rounded-3xl p-6 mt-8">

          <p className="text-gray-500">

            Request ID

          </p>

          <h3 className="text-3xl font-bold text-pink-500 mt-2">

            {requestId}

          </h3>

        </div>

        <div className="bg-green-50 rounded-2xl p-5 mt-8">

          <p className="text-green-700 leading-7">

            We will contact you within
            <strong> 24 hours </strong>
            to confirm your design,
            pricing and delivery details.

          </p>

        </div>

        <div className="flex gap-4 mt-10">

          <button
            onClick={onClose}
            className="flex-1 border border-pink-500 text-pink-500 rounded-full py-4 hover:bg-pink-50 transition"
          >
            Close
          </button>

          <Link
            to="/shop"
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full py-4 font-semibold"
          >
            Shop Now
          </Link>

        </div>

      </div>

    </div>
  );
}

export default CustomOrderSuccessModal;