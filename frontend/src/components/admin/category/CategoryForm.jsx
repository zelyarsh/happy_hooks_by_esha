import { useEffect, useState } from "react";
import { uploadFile } from "../../../services/uploadService";

function CategoryForm({ category, onSave, onClose }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    slug: "",
    description: "",
    image: "",
    featured: false,
    status: "Active",
    displayOrder: 1,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (category) {
      setForm(category);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    const newForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "name") {
      newForm.slug = value
        .toLowerCase()
        .replace(/\s+/g, "-");
    }

    setForm(newForm);
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
    onSave(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
    >
      <div>

        <label>Name</label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        />

      </div>

      <div>

        <label>Slug</label>

        <input
          value={form.slug}
          readOnly
          className="w-full border rounded-xl p-3 bg-gray-100"
        />

      </div>

      <div>

        <label>Description</label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

      </div>

      <div>

        <label>Display Order</label>

        <input
          type="number"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
        />

      </div>

      <div>

        <label>Image</label>

        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleImage}
        />

        {uploading && (
          <p className="text-pink-500 text-sm mt-2">Uploading...</p>
        )}

        {form.image && (
          <img
            src={form.image}
            alt=""
            className="w-40 h-40 rounded-2xl object-cover mt-4"
          />
        )}

      </div>

      <div className="flex gap-10">

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={form.featured}
            name="featured"
            onChange={handleChange}
          />

          Featured

        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded-xl px-5"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onClose}
          className="border px-6 py-3 rounded-xl"
        >
          Cancel
        </button>

        <button
          className="bg-pink-500 text-white px-8 py-3 rounded-xl"
        >
          Save Category
        </button>

      </div>

    </form>
  );
}

export default CategoryForm;