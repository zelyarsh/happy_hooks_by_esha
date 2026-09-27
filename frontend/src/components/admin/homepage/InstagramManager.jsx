import { useState } from "react";
import { FaInstagram, FaPlus, FaTrash, FaPlay, FaImage, FaSpinner } from "react-icons/fa";
import { useHomepage } from "../../../context/HomepageContext";
import { uploadFile } from "../../../services/uploadService";

function InstagramManager() {
  const { instagramMedia, addInstagramMedia, deleteInstagramMedia } = useHomepage();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "image" });
  const [uploading, setUploading] = useState(false);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file || !form.title.trim()) return;

    try {
      setUploading(true);
      const url = await uploadFile(file);
      await addInstagramMedia({ title: form.title, type: form.type, url });
    } catch (error) {
      await addInstagramMedia({ title: form.title, type: form.type, url: URL.createObjectURL(file) });
    } finally {
      setUploading(false);
      setForm({ title: "", type: "image" });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Instagram Gallery</h2>
          <p className="text-gray-500 mt-2">Manage images and reels displayed on homepage.</p>
        </div>
        <button onClick={() => setShowForm((p) => !p)} className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-xl flex items-center gap-3">
          <FaPlus />
          {showForm ? "Cancel" : "Upload Media"}
        </button>
      </div>

      {showForm && (
        <div className="border rounded-2xl p-6 mt-6 space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Media title" className="w-full border rounded-xl px-5 py-3" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border rounded-xl px-5 py-3">
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
          <label className="border-2 border-dashed border-pink-300 rounded-xl h-28 flex items-center justify-center cursor-pointer hover:bg-pink-50 transition text-sm font-semibold text-pink-500">
            {uploading ? <FaSpinner className="animate-spin text-xl" /> : form.title.trim() ? "Click to choose file" : "Enter a title first"}
            <input hidden type="file" accept="image/*,video/*" disabled={!form.title.trim() || uploading} onChange={upload} />
          </label>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {instagramMedia.map((item) => (
          <div key={item._id} className="rounded-2xl border overflow-hidden hover:shadow-lg transition">
            <div className="h-44 bg-pink-50 flex items-center justify-center overflow-hidden">
              {item.url ? (
                item.type === "image" ? (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" />
                )
              ) : item.type === "image" ? (
                <FaImage className="text-6xl text-pink-400" />
              ) : (
                <FaPlay className="text-6xl text-pink-400" />
              )}
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 capitalize">{item.type}</p>
                </div>
                <button onClick={() => deleteInstagramMedia(item._id)} className="bg-red-500 text-white w-10 h-10 rounded-lg hover:bg-red-600 transition"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 text-pink-500">
        <FaInstagram />
        Connected to Instagram Gallery
      </div>
    </div>
  );
}

export default InstagramManager;
