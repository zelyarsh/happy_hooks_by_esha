import { useEffect, useState } from "react";
import { useCategories } from "../../../context/CategoryContext";
import { uploadFile } from "../../../services/uploadService";

function SubCategoryForm({ subCategory, onSave, onClose }) {
  const { categories } = useCategories();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    slug: "",
    description: "",
    image: "",
    status: "Active",
    displayOrder: 1,
  });

  useEffect(() => {
    if (subCategory) {
      setForm({
        categoryId:
          subCategory.category?._id ||
          subCategory.categoryId ||
          "",
        name: subCategory.name || "",
        slug: subCategory.slug || "",
        description: subCategory.description || "",
        image: subCategory.image || "",
        status: subCategory.status || "Active",
        displayOrder: subCategory.displayOrder || 1,
      });
    } else {
      setForm({
        categoryId: "",
        name: "",
        slug: "",
        description: "",
        image: "",
        status: "Active",
        displayOrder: 1,
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...form,
      [name]: value,
    };

    if (name === "name") {
      updated.slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    setForm(updated);
  };

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

  const submit = (e) => {
  e.preventDefault();

  console.log("SUBCATEGORY FORM DATA:", form);
  console.log("SELECTED CATEGORY ID:", form.categoryId);

  if (!form.categoryId) {
    alert("Please select a category.");
    return;
  }

  if (!form.name.trim()) {
    alert("Please enter a subcategory name.");
    return;
  }

  const data = {
    name: form.name.trim(),
    categoryId: form.categoryId,
    description: form.description.trim(),
    image: form.image,
    status: form.status,
    displayOrder: Number(form.displayOrder),
  };

  console.log("DATA BEING SENT:", data);

  onSave(data);
};

  return (
    <form onSubmit={submit} className="space-y-6">

      {/* Parent Category */}
      <div>
        <label className="font-semibold text-gray-700">
          Parent Category
        </label>

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2 focus:outline-pink-500"
          required
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Name */}
      <div>
        <label className="font-semibold text-gray-700">
          Sub Category Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Crochet Roses"
          className="w-full border rounded-xl p-3 mt-2 focus:outline-pink-500"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="font-semibold text-gray-700">
          Slug
        </label>

        <input
          type="text"
          value={form.slug}
          readOnly
          className="w-full border rounded-xl p-3 mt-2 bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold text-gray-700">
          Description
        </label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe this subcategory..."
          className="w-full border rounded-xl p-3 mt-2 focus:outline-pink-500"
        />
      </div>

      {/* Display Order */}
      <div>
        <label className="font-semibold text-gray-700">
          Display Order
        </label>

        <input
          type="number"
          name="displayOrder"
          min="1"
          value={form.displayOrder}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2 focus:outline-pink-500"
        />
      </div>

      {/* Image */}
      <div>
        <label className="font-semibold text-gray-700">
          Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="mt-2 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4 file:rounded-xl
          file:border-0 file:text-sm file:font-semibold
          file:bg-pink-50 file:text-pink-700
          hover:file:bg-pink-100"
        />

        {form.image && (
          <img
            src={form.image}
            alt="Subcategory preview"
            className="w-44 h-44 rounded-2xl object-cover mt-4 border shadow-sm"
          />
        )}
      </div>

      {/* Status */}
      <div>
        <label className="font-semibold text-gray-700">
          Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded-xl px-5 py-3 mt-2 focus:outline-pink-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t mt-8">

        <button
          type="button"
          onClick={onClose}
          className="border border-gray-300 px-6 py-3 rounded-xl
          hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600
          text-white px-8 py-3 rounded-xl
          transition-colors font-medium"
        >
          {subCategory ? "Update Sub Category" : "Save Sub Category"}
        </button>

      </div>

    </form>
  );
}

export default SubCategoryForm;