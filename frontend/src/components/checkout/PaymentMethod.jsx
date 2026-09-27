import {
  FaMoneyBillWave,
  FaUniversity,
  FaLock,
} from "react-icons/fa";
import easypaisaLogo from "../../assets/images/payment/easypaisa.png";
function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const payment = paymentMethod;
  const setPayment = setPaymentMethod;

  return (
    <div className="bg-white rounded-[30px] shadow-xl p-8">

      {/* Heading */}

      <div className="mb-8">

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Payment
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Payment Method
        </h2>

        <p className="text-gray-500 mt-2">
          Choose your preferred payment option.
        </p>

      </div>

      <div className="space-y-5">

        {/* Cash On Delivery */}

        <label
          className={`flex justify-between items-center p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            payment === "cod"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
          }`}
        >

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">

              <FaMoneyBillWave className="text-pink-500 text-2xl" />

            </div>

            <div>

              <h3 className="text-xl font-bold">
                Cash on Delivery
              </h3>

              <p className="text-gray-500 mt-1">
                Pay when your order is delivered.
              </p>

            </div>

          </div>

          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
            className="accent-pink-500"
          />

        </label>

        {/* Easypaisa */}

        <label
          className={`flex justify-between items-center p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            payment === "easypaisa"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
          }`}
        >

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

              <img
                src={easypaisaLogo}
                alt="Easypaisa"
                className="w-8 h-8 object-contain"
              />

            </div>

            <div>

              <div className="flex items-center gap-3">

                <h3 className="text-xl font-bold">
                  Easypaisa
                </h3>

                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>

              </div>

              <p className="text-gray-500 mt-1">
                Send payment securely through Easypaisa.
              </p>

            </div>

          </div>

          <input
            type="radio"
            checked={payment === "easypaisa"}
            onChange={() => setPayment("easypaisa")}
            className="accent-pink-500"
          />

        </label>

        {/* Bank Transfer */}

        <label
          className={`flex justify-between items-center p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
            payment === "bank"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
          }`}
        >

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">

              <FaUniversity className="text-pink-500 text-2xl" />

            </div>

            <div>

              <h3 className="text-xl font-bold">
                Bank Transfer
              </h3>

              <p className="text-gray-500 mt-1">
                Transfer payment directly to our bank account.
              </p>

            </div>

          </div>

          <input
            type="radio"
            checked={payment === "bank"}
            onChange={() => setPayment("bank")}
            className="accent-pink-500"
          />

        </label>

      </div>

      {/* Payment Instructions */}

      {payment === "cod" && (
        <div className="mt-8 bg-pink-50 rounded-2xl p-5">

          <h4 className="font-bold text-lg">
            Cash on Delivery
          </h4>

          <p className="text-gray-600 mt-2">
            Pay in cash when your order arrives at your doorstep.
            Please keep the exact amount ready for a smooth delivery.
          </p>

        </div>
      )}

      {payment === "easypaisa" && (
        <div className="mt-8 bg-green-50 rounded-2xl p-5">

          <h4 className="font-bold text-lg">
            Easypaisa Payment
          </h4>

          <p className="text-gray-700 mt-2">
            Send your payment to:
          </p>

          <div className="mt-3 space-y-1">

            <p>
              <strong>Account Name:</strong> Happy Hooks by Esha
            </p>

            <p>
              <strong>Phone:</strong> 03XX-XXXXXXX
            </p>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            After sending payment, please share your transaction ID
            with us on WhatsApp or Instagram.
          </p>

        </div>
      )}

      {payment === "bank" && (
        <div className="mt-8 bg-blue-50 rounded-2xl p-5">

          <h4 className="font-bold text-lg">
            Bank Transfer
          </h4>

          <div className="mt-3 space-y-2">

            <p>
              <strong>Bank:</strong> Meezan Bank
            </p>

            <p>
              <strong>Account Title:</strong> Happy Hooks by Esha
            </p>

            <p>
              <strong>Account No:</strong> XXXX-XXXXXXX
            </p>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Please send your payment receipt after completing the transfer.
          </p>

        </div>
      )}

      {/* Security */}

      <div className="mt-8 bg-pink-50 rounded-2xl p-5 flex gap-4">

        <FaLock className="text-pink-500 text-2xl mt-1" />

        <div>

          <h4 className="font-semibold">
            Secure Checkout
          </h4>

          <p className="text-gray-600 text-sm mt-2">
            Your personal information is safe and will only be used to
            process your order.
          </p>

        </div>

      </div>

    </div>
  );
}

export default PaymentMethod;