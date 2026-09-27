import { useCategories } from "../../../context/CategoryContext";
import { useSubCategories } from "../../../context/SubCategoryContext";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>
      {children}
      {error && (
        <p className="text-red-500 text-sm mt-1.5 animate-fadeIn">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full border rounded-xl p-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-pink-200";

function inputClass(hasError) {
  return `${inputBase} ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-200 focus:border-pink-500"
  }`;
}

function ProductForm({ form, handleChange, setForm, errors = {} }) {
  const { categories } = useCategories();
  const { subCategories } = useSubCategories();

  const activeCategories = categories.filter((c) => c.status === "Active");

  const availableSubCategories = subCategories.filter(
    (sc) =>
      String(sc.category?._id || sc.categoryId) === String(form.categoryId) &&
      sc.status === "Active"
  );

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const selected = categories.find(
      (c) => String(c._id) === String(categoryId)
    );

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
    const selected = subCategories.find(
      (sc) => String(sc._id) === String(subCategoryId)
    );

    setForm((prev) => ({
      ...prev,
      subCategoryId: subCategoryId || "",
      subCategory: selected ? selected.name : "",
    }));
  };

  return (
    <div className="space-y-6">

      <Field label="Product Name" error={errors.name}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Crochet Tulip Bouquet"
          className={inputClass(errors.name)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-5">

        <Field label="Category" error={errors.category}>
          <select
            name="categoryId"
            value={form.categoryId ?? ""}
            onChange={handleCategoryChange}
            className={inputClass(errors.category)}
          >
            <option value="">Select Category</option>
            {activeCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {activeCategories.length === 0 && (
            <p className="text-gray-400 text-sm mt-1.5">
              No active categories yet — add one from the Categories page.
            </p>
          )}
        </Field>

        <Field label="Sub Category (optional)" error={errors.subCategory}>
          <select
            name="subCategoryId"
            value={form.subCategoryId ?? ""}
            onChange={handleSubCategoryChange}
            disabled={!form.categoryId}
            className={`${inputClass(errors.subCategory)} disabled:bg-gray-50 disabled:text-gray-400`}
          >
            <option value="">
              {form.categoryId ? "Select Sub Category" : "Select a category first"}
            </option>
            {availableSubCategories.map((sc) => (
              <option key={sc._id} value={sc._id}>
                {sc.name}
              </option>
            ))}
          </select>

          {form.categoryId && availableSubCategories.length === 0 && (
            <p className="text-gray-400 text-sm mt-1.5">
              This category has no sub-categories yet.
            </p>
          )}
        </Field>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <Field label="Price (Rs.)" error={errors.price}>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="2500"
            className={inputClass(errors.price)}
          />
        </Field>

        <Field label="Stock" error={errors.stock}>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="15"
            className={inputClass(errors.stock)}
          />
        </Field>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <Field label="Compare-at Price (Rs.)">
          <input
            type="number"
            name="compareAtPrice"
            value={form.compareAtPrice ?? ""}
            onChange={handleChange}
            placeholder="Optional"
            className={inputClass(false)}
          />
        </Field>

        <Field label="SKU">
          <input
            type="text"
            name="sku"
            value={form.sku ?? ""}
            onChange={handleChange}
            placeholder="Optional"
            className={inputClass(false)}
          />
        </Field>

      </div>

      <Field label="Badge">
        <select
          name="badge"
          value={form.badge}
          onChange={handleChange}
          className={inputClass(false)}
        >
          <option value="">Select Badge</option>
          <option value="Best Seller">Best Seller</option>
          <option value="Sale">Sale</option>
          <option value="Trending">Trending</option>
          <option value="Featured">Featured</option>
          <option value="Limited">Limited</option>
          <option value="Custom">Custom</option>
          <option value="New Arrival">New Arrival</option>
        </select>
      </Field>

      <Field label="Description">
        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description..."
          className={`${inputClass(false)} resize-none`}
        />
      </Field>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="status"
            checked={form.status === "Active"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status: e.target.checked ? "Active" : "Inactive",
              }))
            }
            className="w-5 h-5 accent-pink-500 cursor-pointer transition-transform duration-150 active:scale-90"
          />
          Active (visible on the storefront)
        </label>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-5 h-5 accent-pink-500 cursor-pointer transition-transform duration-150 active:scale-90"
          />
          Featured Product
        </label>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="isNew"
            checked={form.isNew}
            onChange={handleChange}
            className="w-5 h-5 accent-pink-500 cursor-pointer transition-transform duration-150 active:scale-90"
          />
          New Arrival
        </label>

      </div>

    </div>
  );
}

export default ProductForm;
