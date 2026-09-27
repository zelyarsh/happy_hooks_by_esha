import { useEffect, useState } from "react";
import { FaStore, FaSave, FaUpload } from "react-icons/fa";
import { useSettings } from "../../../context/SettingsContext";
import { useToast } from "../../../context/ToastContext";

function GeneralSettings() {
  const { general, updateGeneral } = useSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState(general);

  useEffect(() => {
    setForm(general);
  }, [general]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, [field]: URL.createObjectURL(file) }));
  };

  const save = () => {
    updateGeneral(form);
    showToast({ type: "success", title: "Settings saved", message: "General store information updated." });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-8">
        <FaStore className="text-4xl text-pink-500" />
        <div>
          <h2 className="text-3xl font-bold">General Information</h2>
          <p className="text-gray-500">Basic information about your store.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <input name="storeName" value={form.storeName} onChange={handleChange} placeholder="Store Name" className="border rounded-xl px-5 py-3" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="border rounded-xl px-5 py-3" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border rounded-xl px-5 py-3" />
        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="border rounded-xl px-5 py-3" />
        <input name="currency" value={form.currency} onChange={handleChange} placeholder="Currency" className="border rounded-xl px-5 py-3" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border rounded-xl px-5 py-3" />
      </div>

      <textarea name="address" rows="4" value={form.address} onChange={handleChange} placeholder="Store Address" className="border rounded-xl px-5 py-3 w-full mt-6" />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:bg-pink-50 transition">
          {form.logo ? (
            <img src={form.logo} alt="Logo" className="h-16 object-contain mb-3" />
          ) : (
            <FaUpload className="text-4xl text-pink-500 mb-3" />
          )}
          {form.logo ? "Change Logo" : "Upload Logo"}
          <input hidden type="file" accept="image/*" onChange={handleFile("logo")} />
        </label>

        <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:bg-pink-50 transition">
          {form.favicon ? (
            <img src={form.favicon} alt="Favicon" className="h-16 object-contain mb-3" />
          ) : (
            <FaUpload className="text-4xl text-pink-500 mb-3" />
          )}
          {form.favicon ? "Change Favicon" : "Upload Favicon"}
          <input hidden type="file" accept="image/*" onChange={handleFile("favicon")} />
        </label>
      </div>

      <button onClick={save} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl flex items-center gap-3">
        <FaSave />
        Save Changes
      </button>
    </div>
  );
}

export default GeneralSettings;
