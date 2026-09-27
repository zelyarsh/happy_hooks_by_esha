import { useState } from "react";
import { FaImages, FaPlus, FaTrash, FaSpinner } from "react-icons/fa";
import { useHomepage } from "../../../context/HomepageContext";
import { uploadFile } from "../../../services/uploadService";

function BannerManager() {
  const { banners, addBanner, deleteBanner, toggleBannerStatus } = useHomepage();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadFile(file);
      setImage(url);
    } catch (error) {
      setImage(URL.createObjectURL(file));
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    if (!title.trim()) return;
    addBanner({ title, status: "Active", image });
    setTitle("");
    setImage("");
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Homepage Banners</h2>
          <p className="text-gray-500 mt-2">Add and manage promotional banners.</p>
        </div>
        <button onClick={() => setShowForm((prev) => !prev)} className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-xl flex items-center gap-3">
          <FaPlus />
          {showForm ? "Cancel" : "Add Banner"}
        </button>
      </div>

      {showForm && (
        <div className="border rounded-2xl p-6 mt-6 space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Banner title" className="w-full border rounded-xl px-5 py-3" />

          <label className="border-2 border-dashed border-pink-300 rounded-xl h-36 flex items-center justify-center cursor-pointer hover:bg-pink-50 transition overflow-hidden">
            {uploading ? (
              <FaSpinner className="text-3xl text-pink-400 animate-spin" />
            ) : image ? (
              <img src={image} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-semibold text-pink-500">Click to upload banner image</span>
            )}
            <input hidden type="file" accept="image/*" disabled={uploading} onChange={handleImage} />
          </label>

          <div className="flex justify-end">
            <button onClick={submit} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl">Save Banner</button>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-5">
        {banners.length === 0 && (<p className="text-gray-400 text-center py-6">No banners yet.</p>)}
        {banners.map((banner) => (
          <div key={banner._id} className="border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-xl bg-pink-100 flex items-center justify-center overflow-hidden">
                {banner.image ? (
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                ) : (
                  <FaImages className="text-pink-500 text-3xl" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{banner.title}</h3>
                <button onClick={() => toggleBannerStatus(banner._id)} className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold transition ${banner.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>{banner.status}</button>
              </div>
            </div>
            <button onClick={() => deleteBanner(banner._id)} className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl flex items-center gap-2"><FaTrash />Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerManager;
