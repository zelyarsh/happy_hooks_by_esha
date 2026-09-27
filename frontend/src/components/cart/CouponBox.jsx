import { useState } from "react";

function CouponBox() {
  const [coupon, setCoupon] = useState("");

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

      <h3 className="text-2xl font-bold mb-5">
        Coupon Code
      </h3>

      <div className="flex gap-3">

        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon"
          className="flex-1 border rounded-full px-5 py-3 outline-none focus:border-pink-500"
        />

        <button className="bg-pink-500 text-white px-8 rounded-full hover:bg-pink-600 transition">
          Apply
        </button>

      </div>

    </div>
  );
}

export default CouponBox;