import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

import { useProducts } from "../../../context/ProductContext";
import { useToast } from "../../../context/ToastContext";

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

function ProductPageForm({ product }) {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();

  const [form, setForm] = useState(product ? fromProduct(product) : initialState);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
      showToast({
        type: "error",
        title: "Something went wrong",
        message: result.message || "Failed to save product.",
      });
      return;
    }

    showToast({
      type: "success",
      title: product ? "Product updated" : "Product added",
      message: product
        ? `${payload.name} has been updated.`
        : `${payload.name} has been added to your catalog.`,
    });

    setTimeout(() => navigate("/admin/products"), 300);
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition mb-3"
          >
            <FaArrowLeft />
            Back to Products
          </button>

          <h1 className="text-4xl font-black text-gray-800">
            {product ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-gray-500 mt-2">
            {product
              ? `Update details for "${product.name}".`
              : "Fill in the details to create a new product."}
          </p>
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-pink-500 text-white flex items-center gap-3 transition-all duration-200 hover:bg-pink-600 hover:shadow-lg active:scale-95 disabled:opacity-70"
        >
          <FaSave />
          {saving ? "Saving..." : product ? "Update Product" : "Save Product"}
        </button>

      </div>

      <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg p-8">

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

    </div>
  );
}

export default ProductPageForm;
