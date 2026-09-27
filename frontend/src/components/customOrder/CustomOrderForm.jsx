import ProductTypeCards from "./ProductTypeCards";
import ColorSelector from "./ColorSelector";
import UploadSection from "./UploadSection";
import BudgetSelector from "./BudgetSelector";
import CitySelector from "./CitySelector";
import DeliveryInfo from "./DeliveryInfo";
import { useState } from "react";
import CustomOrderSuccessModal from "./CustomOrderSuccessModal";
import { useToast } from "../../context/ToastContext";

function CustomOrderForm({ formData, setFormData }) {
  const { showToast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.phone ||
    !formData.productType ||
    !formData.color ||
    !formData.budget ||
    !formData.city ||
    !formData.address ||
    !formData.deliveryDate
  ) {
    showToast({
      type: "error",
      title: "Missing Information",
      message: "Please complete all required fields.",
    });
    return;
  }

  showToast({
    type: "success",
    title: "Custom Order Submitted",
    message: "We'll contact you within 24 hours.",
  });

  setShowSuccess(true);

  setFormData({
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
};

  return (
    <form
      id="custom-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-[35px] shadow-xl p-10"
    >
      <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
        Custom Order
      </p>

      <h2 className="text-4xl font-bold mt-3 mb-10">
        Design Your Crochet Gift
      </h2>

      {/* Personal Information */}

<div className="mb-8">
  <h3 className="text-2xl font-bold mb-6 text-pink-500">
    Personal Information
  </h3>

  {/* Full Name */}

  <div className="mb-6">
    <label className="block font-semibold mb-2">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      required
      className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
    />
  </div>
</div>

    <div className="mb-8">

<ColorSelector
selectedColor={formData.color}
setSelectedColor={(value)=>
setFormData(prev=>({
...prev,
color:value,
}))
}
/>

</div>
       
      {/* Phone */}

      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Phone Number
        </label>

        <input
          type="text"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="03XXXXXXXXX"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Email */}

      <div className="mb-8">
        <label className="font-semibold block mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Product Type */}

      <div className="mb-10">
        <ProductTypeCards
          selectedProduct={formData.productType}
          setSelectedProduct={(value) =>
            setFormData((prev) => ({
              ...prev,
              productType: value,
            }))
          }
        />
      </div>

      {/* Color */}

      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Preferred Color
        </label>

        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Pink, White, Yellow..."
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Budget */}

      <div className="mb-8">

<BudgetSelector
selectedBudget={formData.budget}
setSelectedBudget={(value)=>
setFormData(prev=>({
...prev,
budget:value,
}))
}
/>

</div>

<div className="mb-8">

<CitySelector
selectedCity={formData.city}
setSelectedCity={(value)=>
setFormData(prev=>({
...prev,
city:value,
}))
}
/>

</div>

<DeliveryInfo
city={formData.city}
/>
<div className="mb-8">

  <label className="block font-semibold mb-2">
    Delivery Address
  </label>

  <textarea
    name="address"
    rows="3"
    value={formData.address}
    onChange={handleChange}
    placeholder="House No, Street, Area..."
    className="w-full border rounded-2xl p-4 resize-none focus:border-pink-500 outline-none"
  />

</div>
      {/* Delivery Date */}

      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Preferred Delivery Date
        </label>

        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none"
        />
      </div>

      {/* Upload */}

      <div className="mb-8">

<UploadSection
image={formData.image}
setImage={(value)=>
setFormData(prev=>({
...prev,
image:value,
}))
}
/>

</div>
      {/* Notes */}

      <div className="mb-10">
        <label className="font-semibold block mb-2">
          Additional Details
        </label>

        <textarea
          rows="5"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Tell us your requirements..."
          className="w-full border rounded-2xl p-4 focus:border-pink-500 outline-none resize-none"
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-full font-semibold text-lg hover:scale-[1.02] transition duration-300 shadow-lg"
      >
        Submit Custom Order
      </button>
      <CustomOrderSuccessModal
  isOpen={showSuccess}
  onClose={() => setShowSuccess(false)}
/>
    </form>
  );
}

export default CustomOrderForm;
