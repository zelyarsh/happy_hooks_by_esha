import { useState } from "react";
import { FaCloudUploadAlt, FaSave, FaSpinner } from "react-icons/fa";
import { useCategories } from "../../../context/CategoryContext";
import { useSubCategories } from "../../../context/SubCategoryContext";
import { useProducts } from "../../../context/ProductContext";
import { useToast } from "../../../context/ToastContext";
import { uploadFile, uploadFiles } from "../../../services/uploadService";

const blank = {
  name: "",
  categoryId: "",
  category: "",
  subCategoryId: "",
  subCategory: "",
  price: "",
  stock: 10,
  status: "Active",
  description: "",
  image: "",
  images: [],
  featured: false,
};

const fromProduct = (product) => ({
  ...blank,
  ...product,
  categoryId: product.categoryId?._id || product.categoryId || "",
  category: product.categoryId?.name || "",
  subCategoryId: product.subCategoryId?._id || product.subCategoryId || "",
  subCategory: product.subCategoryId?.name || "",
  image: product.images?.[0] || "",
  images: product.images?.slice(1) || [],
});

function ArrivalForm({ product, onDone }) {
  const { categories } = useCategories();
  const { subCategories } = useSubCategories();
  const { addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();

  const [form, setForm] = useState(product ? fromProduct(product) : blank);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeCategories = categories.filter((c) => c.status === "Active");
  const availableSubCategories = subCategories.filter(
    (sc) =>
      String(sc.category?._id || sc.categoryId) === String(form.categoryId) &&
      sc.status === "Active"
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selected = categories.find((c) => String(c._id) === String(categoryId));
    setForm((prev) => ({
      ...prev,
      categoryId: categoryId || "",
      category: selected ? selected.name : "",
      subCategoryId: "",
      subCategory: "",
    }));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    const selected = subCategories.find((sc) => String(sc._id) === String(subCategoryId));
    setForm((prev) => ({
      ...prev,
      subCategoryId: subCategoryId || "",
      subCategory: selected ? selected.name : "",
    }));
  };

  const handleImages = async (e) => {
    const files = [...e.target.files];
    if (!files.length) return;

    try {
      setUploadingImage(true);
      const urls = await uploadFiles(files);
      setForm((prev) => ({ ...prev, image: urls[0], images: urls.slice(1) }));
    } catch (error) {
      const urls = files.map((f) => URL.createObjectURL(f));
      setForm((prev) => ({ ...prev, image: urls[0], images: urls.slice(1) }));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingVideo(true);
      const url = await uploadFile(file);
      setForm((prev) => ({ ...prev, video: url }));
    } catch (error) {
      setForm((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
    } finally {
      setUploadingVideo(false);
    }
  };

  const submit = async () => {
    if (!form.name.trim() || !form.categoryId || !form.price) {
      showToast({ type: "error", title: "Missing fields", message: "Name, category and price are required." });
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      isNew: true,
      image: form.image || "https://placehold.co/600x600/fce7f3/ec4899?text=No+Image",
    };

    const result = product
      ? await updateProduct({ ...payload, _id: product._id })
      : await addProduct(payload);

    setSaving(false);

    if (!result.success) {
      showToast({ type: "error", title: "Something went wrong", message: result.message || "Failed to save." });
      return;
    }

    showToast({
      type: "success",
      title: product ? "Arrival updated" : "Arrival added",
      message: product ? `${payload.name} has been updated.` : `${payload.name} added to New Arrivals.`,
    });

    onDone?.();
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8">{product ? "Edit Arrival" : "Add New Arrival"}</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border rounded-xl px-5 py-3" />

        <select value={form.categoryId} onChange={handleCategoryChange} className="border rounded-xl px-5 py-3">
          <option value="">Select Category</option>
          {activeCategories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
        </select>

        <select value={form.subCategoryId} onChange={handleSubCategoryChange} disabled={!form.categoryId} className="border rounded-xl px-5 py-3 disabled:bg-gray-50">
          <option value="">{form.categoryId ? "Select Sub Category" : "Select a category first"}</option>
          {availableSubCategories.map((sc) => (<option key={sc._id} value={sc._id}>{sc.name}</option>))}
        </select>

        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded-xl px-5 py-3" />

        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border rounded-xl px-5 py-3" />

        <select name="status" value={form.status} onChange={handleChange} className="border rounded-xl px-5 py-3">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <textarea rows="5" name="description" value={form.description} onChange={handleChange} placeholder="Product Description" className="border rounded-xl px-5 py-3 w-full mt-6" />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <label className="border-2 border-dashed border-pink-300 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition overflow-hidden">
          {uploadingImage ? (
            <FaSpinner className="text-5xl text-pink-400 mb-4 animate-spin" />
          ) : form.image ? (
            <img src={form.image} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-5xl text-pink-400 mb-4" />
              Upload Images
            </>
          )}
          <input hidden type="file" multiple accept="image/*" disabled={uploadingImage} onChange={handleImages} />
        </label>

        <label className="border-2 border-dashed border-pink-300 rounded-2xl h-56 flex flex-col justify-center items-center cursor-pointer hover:bg-pink-50 transition overflow-hidden">
          {uploadingVideo ? (
            <FaSpinner className="text-5xl text-pink-400 mb-4 animate-spin" />
          ) : form.video ? (
            <video src={form.video} className="w-full h-full object-cover" controls />
          ) : (
            <>
              <FaCloudUploadAlt className="text-5xl text-pink-400 mb-4" />
              Upload Video
            </>
          )}
          <input hidden type="file" accept="video/*" disabled={uploadingVideo} onChange={handleVideo} />
        </label>
      </div>

      <div className="flex gap-8 mt-8">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-5 h-5 accent-pink-500" />
          Featured Product
        </label>
      </div>

      <button onClick={submit} disabled={saving} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 disabled:opacity-70">
        <FaSave />
        {saving ? "Saving..." : product ? "Update Product" : "Save Product"}
      </button>
    </div>
  );
}

export default ArrivalForm;
