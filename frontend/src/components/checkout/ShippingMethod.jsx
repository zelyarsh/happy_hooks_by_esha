import { FaTruck, FaBolt } from "react-icons/fa";

function ShippingMethod({ shippingMethod, setShippingMethod }) {
  const shipping = shippingMethod;
  const setShipping = setShippingMethod;

  return (
    <div className="bg-white rounded-[30px] shadow-xl p-8">

      {/* Heading */}

      <div className="mb-8">

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Delivery
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Shipping Method
        </h2>

        <p className="text-gray-500 mt-2">
          Choose your preferred delivery option.
        </p>

      </div>

      <div className="space-y-5">

        {/* Standard Delivery */}

        <label
          className={`flex justify-between items-center p-6 rounded-3xl border-2 cursor-pointer transition duration-300 ${
            shipping === "standard"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
          }`}
        >

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">

              <FaTruck className="text-pink-500 text-xl" />

            </div>

            <div>

              <h3 className="font-bold text-xl">
                Standard Delivery
              </h3>

              <p className="text-gray-500 mt-1">
                15 - 20 Working Days
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="font-bold text-xl">
              Rs. 250
            </p>

            <input
              type="radio"
              checked={shipping === "standard"}
              onChange={() => setShipping("standard")}
            />

          </div>

        </label>

        {/* Express Delivery */}

        <label
          className={`flex justify-between items-center p-6 rounded-3xl border-2 cursor-pointer transition duration-300 ${
            shipping === "express"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
          }`}
        >

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center">

              <FaBolt className="text-pink-500 text-xl" />

            </div>

            <div>

              <h3 className="font-bold text-xl">
                Express Delivery
              </h3>

              <p className="text-gray-500 mt-1">
                10 - 15 Working Days
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="font-bold text-xl">
              Rs. 500
            </p>

            <input
              type="radio"
              checked={shipping === "express"}
              onChange={() => setShipping("express")}
            />

          </div>

        </label>

      </div>

    </div>
  );
}

export default ShippingMethod;