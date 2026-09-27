import { useEffect, useState } from "react";
import { FaImage, FaSave, FaSpinner } from "react-icons/fa";
import { useHomepage } from "../../../context/HomepageContext";
import { useToast } from "../../../context/ToastContext";
import { uploadFile } from "../../../services/uploadService";

function HeroManager() {
  const { hero, updateHero } = useHomepage();
  const { showToast } = useToast();
  const [form, setForm] = useState(hero);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(hero);
  }, [hero]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (error) {
      setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    const result = await updateHero(form);
    setSaving(false);

    showToast(
      result.success
        ? { type: "success", title: "Hero section saved", message: "Homepage hero content has been updated." }
        : { type: "error", title: "Something went wrong", message: result.message || "Failed to save hero section." }
    );
  };

  if (!form) return null;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Hero Section</h2>
          <p className="text-gray-500 mt-2">Update the homepage hero content.</p>
        </div>
        <FaImage className="text-5xl text-pink-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <input name="title" value={form.title || ""} onChange={handleChange} className="w-full border rounded-xl px-5 py-3" placeholder="Hero Title" />
          <textarea name="subtitle" rows="4" value={form.subtitle || ""} onChange={handleChange} className="w-full border rounded-xl px-5 py-3" placeholder="Hero Subtitle" />
          <input name="buttonText" value={form.buttonText || ""} onChange={handleChange} className="w-full border rounded-xl px-5 py-3" placeholder="Button Text" />
          <input name="buttonLink" value={form.buttonLink || ""} onChange={handleChange} className="w-full border rounded-xl px-5 py-3" placeholder="Button Link (e.g. /shop)" />

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!form.active}
              onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
              className="w-5 h-5 accent-pink-500"
            />
            Show hero section on homepage
          </label>
        </div>

        <div>
          {uploading ? (
            <div className="border-2 border-dashed border-pink-300 rounded-3xl h-80 flex flex-col justify-center items-center">
              <FaSpinner className="text-5xl text-pink-400 mb-4 animate-spin" />
              Uploading...
            </div>
          ) : form.image ? (
            <div className="relative">
              <img src={form.image} alt="Hero" className="w-full h-80 object-cover rounded-3xl" />
              <label className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-xl shadow cursor-pointer text-sm font-semibold">
                Change Image
                <input hidden type="file" accept="image/*" onChange={handleImage} />
              </label>
            </div>
          ) : (
            <label className="border-2 border-dashed border-pink-300 rounded-3xl h-80 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition">
              <FaImage className="text-5xl text-pink-400 mb-4" />
              <p className="font-semibold">Upload Hero Image</p>
              <input hidden type="file" accept="image/*" onChange={handleImage} />
            </label>
          )}
        </div>
      </div>

      <button onClick={save} disabled={saving} className="mt-8 bg-pink-500 hover:bg-pink-600 transition text-white px-8 py-3 rounded-xl flex items-center gap-3 disabled:opacity-70">
        <FaSave />
        {saving ? "Saving..." : "Save Hero Section"}
      </button>
    </div>
  );
}

export default HeroManager;
