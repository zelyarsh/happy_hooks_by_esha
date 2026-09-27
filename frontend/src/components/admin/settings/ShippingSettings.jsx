import { useEffect, useState } from "react";
import { FaTruck, FaSave } from "react-icons/fa";
import { useSettings } from "../../../context/SettingsContext";
import { useToast } from "../../../context/ToastContext";

function ShippingSettings() {
  const { shipping, updateShipping } = useSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState(shipping);

  useEffect(() => {
    setForm(shipping);
  }, [shipping]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = () => {
    updateShipping(form);
    showToast({ type: "success", title: "Shipping settings saved", message: "Delivery options updated." });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-8">
        <FaTruck className="text-4xl text-pink-500"/>
        <div>
          <h2 className="text-3xl font-bold">Shipping Settings</h2>
          <p className="text-gray-500">Configure delivery options.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input name="standardCost" value={form.standardCost} onChange={handleChange} placeholder="Standard Shipping Cost" className="border rounded-xl px-5 py-3" />
        <input name="freeShippingAbove" value={form.freeShippingAbove} onChange={handleChange} placeholder="Free Shipping Above" className="border rounded-xl px-5 py-3" />
        <input name="deliveryTime" value={form.deliveryTime} onChange={handleChange} placeholder="Delivery Time" className="border rounded-xl px-5 py-3" />
        <select name="region" value={form.region} onChange={handleChange} className="border rounded-xl px-5 py-3">
          <option>Pakistan</option>
          <option>International</option>
        </select>
      </div>

      <button onClick={save} className="mt-8 bg-pink-500 text-white px-8 py-3 rounded-xl flex items-center gap-3">
        <FaSave />
        Save Shipping
      </button>
    </div>
  );
}

export default ShippingSettings;
