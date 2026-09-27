import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaTiktok, FaSave } from "react-icons/fa";
import { useSettings } from "../../../context/SettingsContext";
import { useToast } from "../../../context/ToastContext";

function SocialLinks() {
  const { social, updateSocial } = useSettings();
  const { showToast } = useToast();
  const [form, setForm] = useState(social);

  useEffect(() => {
    setForm(social);
  }, [social]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = () => {
    updateSocial(form);
    showToast({ type: "success", title: "Social links saved", message: "Social media links updated." });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8">Social Media</h2>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <FaInstagram className="text-pink-500 text-2xl"/>
          <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram URL" className="border rounded-xl px-5 py-3 flex-1" />
        </div>
        <div className="flex items-center gap-4">
          <FaFacebook className="text-blue-600 text-2xl"/>
          <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL" className="border rounded-xl px-5 py-3 flex-1" />
        </div>
        <div className="flex items-center gap-4">
          <FaWhatsapp className="text-green-500 text-2xl"/>
          <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp URL" className="border rounded-xl px-5 py-3 flex-1" />
        </div>
        <div className="flex items-center gap-4">
          <FaYoutube className="text-red-500 text-2xl"/>
          <input name="youtube" value={form.youtube} onChange={handleChange} placeholder="YouTube URL" className="border rounded-xl px-5 py-3 flex-1" />
        </div>
        <div className="flex items-center gap-4">
          <FaTiktok className="text-black text-2xl"/>
          <input name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="TikTok URL" className="border rounded-xl px-5 py-3 flex-1" />
        </div>
      </div>

      <button onClick={save} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl flex items-center gap-3">
        <FaSave />
        Save Links
      </button>
    </div>
  );
}

export default SocialLinks;
