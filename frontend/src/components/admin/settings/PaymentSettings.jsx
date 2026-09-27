import { useEffect, useState } from "react";
import { FaMoneyCheckAlt, FaSave } from "react-icons/fa";
import { useSettings } from "../../../context/SettingsContext";
import { useToast } from "../../../context/ToastContext";

function PaymentSettings() {
  const { payment, updatePayment } = useSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState(payment);

  useEffect(() => {
    setForm(payment);
  }, [payment]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const save = () => {
    updatePayment(form);
    showToast({ type: "success", title: "Payment settings saved", message: "Payment methods updated." });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-8">
        <FaMoneyCheckAlt className="text-4xl text-pink-500"/>
        <div>
          <h2 className="text-3xl font-bold">Payment Settings</h2>
          <p className="text-gray-500">Configure payment methods.</p>
        </div>
      </div>

      <div className="space-y-5">
        <input name="jazzCash" value={form.jazzCash} onChange={handleChange} placeholder="JazzCash Number" className="border rounded-xl px-5 py-3 w-full" />
        <input name="easyPaisa" value={form.easyPaisa} onChange={handleChange} placeholder="EasyPaisa Number" className="border rounded-xl px-5 py-3 w-full" />
        <input name="bankTitle" value={form.bankTitle} onChange={handleChange} placeholder="Bank Account Title" className="border rounded-xl px-5 py-3 w-full" />
        <input name="bankAccount" value={form.bankAccount} onChange={handleChange} placeholder="Bank Account Number" className="border rounded-xl px-5 py-3 w-full" />
        <label className="flex items-center gap-3">
          <input type="checkbox" name="codAvailable" checked={form.codAvailable} onChange={handleChange} className="w-5 h-5 accent-pink-500" />
          Cash On Delivery Available
        </label>
      </div>

      <button onClick={save} className="mt-8 bg-pink-500 text-white px-8 py-3 rounded-xl flex items-center gap-3">
        <FaSave />
        Save Payment
      </button>
    </div>
  );
}

export default PaymentSettings;
