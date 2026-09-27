import { useState } from "react";
import HeroSection from "../components/customOrder/HeroSection";
import CustomOrderForm from "../components/customOrder/CustomOrderForm";
import LivePreview from "../components/customOrder/LivePreview";
import Timeline from "../components/customOrder/Timeline";
function CustomOrder() {
    const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  productType: "",
  color: "",
  budget: "",
  city: "",
  address: "",
  deliveryDate: "",
  notes: "",
  image: null,
});
  return (
    <section className="bg-gradient-to-b from-pink-50 via-white to-white min-h-screen">

      {/* Hero */}

      <HeroSection />
      

      {/* Form */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2">

<CustomOrderForm
  formData={formData}
  setFormData={setFormData}
/>
          </div>

          {/* Right */}

          <div>
<LivePreview
  formData={formData}
/>

          </div>

        </div>

      </div>

      {/* Process */}
{/* Timeline */}

<div className="max-w-7xl mx-auto px-6">
  <Timeline />
</div>

      {/* Trust */}

      <section className="bg-pink-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <div>

              <div className="text-5xl">❤️</div>

              <h3 className="font-bold mt-5">
                Handmade
              </h3>

              <p className="text-gray-500 mt-3">
                Crafted with love.
              </p>

            </div>

            <div>

              <div className="text-5xl">🚚</div>

              <h3 className="font-bold mt-5">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-3">
                Nationwide shipping.
              </p>

            </div>

            <div>

              <div className="text-5xl">🎁</div>

              <h3 className="font-bold mt-5">
                Gift Ready
              </h3>

              <p className="text-gray-500 mt-3">
                Beautiful packaging.
              </p>

            </div>

            <div>

              <div className="text-5xl">💬</div>

              <h3 className="font-bold mt-5">
                Friendly Support
              </h3>

              <p className="text-gray-500 mt-3">
                We'll help you anytime.
              </p>

            </div>

          </div>

        </div>

      </section>

    </section>
  );
}

export default CustomOrder;