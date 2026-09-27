import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useProducts } from "../../../context/ProductContext";
import ProductForm from "./ProductForm";
import ProductGallery from "./ProductGallery";

const initialState = {
  id: "",
  name: "",
  categoryId: "",
  category: "",
  subCategoryId: "",
  subCategory: "",
  price: "",
  compareAtPrice: "",
  stock: "",
  sku: "",
  badge: "",
  description: "",
  featured: false,
  isNew: false,
  status: "Active",
  image: "",
  images: [],
};

const fromProduct = (product) => ({
  ...initialState,
  ...product,
  id: product._id,
  categoryId: product.categoryId?._id || product.categoryId || "",
  category: product.categoryId?.name || "",
  subCategoryId: product.subCategoryId?._id || product.subCategoryId || "",
  subCategory: product.subCategoryId?.name || "",
  isNew: !!product.newArrival,
  image: product.images?.[0] || "",
  images: product.images?.slice(1) || [],
});

function ProductModal({ open, onClose, product }) {
  const { addProduct, updateProduct } = useProducts();

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(product ? fromProduct(product) : initialState);
      setErrors({});
      setSaved(false);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
  }, [product, open]);

  if (!open) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 150);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const uploadMainImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: url }));
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const uploadGallery = (e) => {
    const files = [...e.target.files];
    const gallery = files.map((file) => URL.createObjectURL(file));

    setForm((prev) => ({ ...prev, images: gallery }));
  };

  const validate = () => {
    const next = {};

    if (!form.name?.trim()) next.name = "Product name is required";
    if (!form.categoryId) next.category = "Please select a category";
    if (!form.price || Number(form.price) <= 0)
      next.price = "Enter a valid price";
    if (form.stock === "" || Number(form.stock) < 0)
      next.stock = "Enter a valid stock quantity";
    if (!form.image) next.image = "Upload a main product image";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: [form.image, ...form.images].filter(Boolean),
    };

    const result = product
      ? await updateProduct({ ...payload, _id: product._id })
      : await addProduct(payload);

    setSaving(false);

    if (!result.success) {
      setErrors({ name: result.message || "Failed to save product" });
      return;
    }

    setSaved(true);
    setTimeout(handleClose, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-6 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        <div className="flex justify-between items-center border-b p-6 sticky top-0 bg-white z-10">

          <h2 className="text-3xl font-bold">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={handleClose}
            className="w-11 h-11 rounded-full hover:bg-pink-100 transition-all duration-200 hover:rotate-90 flex items-center justify-center"
          >
            <FaTimes size={22} />
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 p-8">

          <ProductForm
            form={form}
            handleChange={handleChange}
            setForm={setForm}
            errors={errors}
          />

          <ProductGallery
            form={form}
            setForm={setForm}
            uploadMainImage={uploadMainImage}
            uploadGallery={uploadGallery}
            imageError={errors.image}
          />

        </div>

        <div className="border-t p-6 flex justify-end items-center gap-4 sticky bottom-0 bg-white">

          {saved && (
            <span className="text-green-600 font-semibold mr-auto animate-fadeIn">
              ✓ Saved successfully
            </span>
          )}

          <button
            onClick={handleClose}
            className="px-8 py-3 rounded-xl border transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={saved || saving}
            className="px-8 py-3 rounded-xl bg-pink-500 text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg active:scale-95 disabled:opacity-70"
          >
            {saving ? "Saving..." : product ? "Update Product" : "Add Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;
