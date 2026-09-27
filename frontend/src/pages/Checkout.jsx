import { useState } from "react";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import ShippingMethod from "../components/checkout/ShippingMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import { useAuth } from "../context/AuthContext";

const SHIPPING_COSTS = { standard: 250, express: 500 };
const PAYMENT_METHOD_MAP = {
  cod: "Cash on Delivery",
  easypaisa: "EasyPaisa",
  bank: "Cash on Delivery", // backend only models COD / EasyPaisa - bank transfer is treated as an offline COD-style order until reconciled
};

function Checkout() {
  const { user } = useAuth();

  const [billing, setBilling] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    province: "Punjab",
    postalCode: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const shippingFee = SHIPPING_COSTS[shippingMethod];

  return (
    <section className="bg-gradient-to-b from-pink-50/40 to-white min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="mb-12">

          <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
            Happy Hooks
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Checkout
          </h1>

          <p className="text-gray-500 mt-4">
            Complete your handmade crochet order.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            <BillingForm billing={billing} setBilling={setBilling} />

            <ShippingMethod shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} />

            <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

          </div>

          {/* Right */}

          <OrderSummary
            billing={billing}
            shippingFee={shippingFee}
            paymentMethod={PAYMENT_METHOD_MAP[paymentMethod]}
          />

        </div>

      </div>

    </section>
  );
}

export default Checkout;
