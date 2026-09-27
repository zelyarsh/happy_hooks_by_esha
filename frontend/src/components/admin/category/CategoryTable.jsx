import { useMemo, useState } from "react";

import { useCategories } from "../../../context/CategoryContext";
import { useProducts } from "../../../context/ProductContext";

import CategoryActions from "./CategoryActions";
import CategoryStatusBadge from "./CategoryStatusBadge";
import CategoryModal from "./CategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import ViewCategoryModal from "./ViewCategoryModal";
import BulkCategoryActions from "./BulkCategoryActions";
import CategoryPagination from "./CategoryPagination";

function CategoryTable({ search }) {

  const { products } = useProducts();
  const liveProductCount = (categoryId) =>
    products.filter(
      (p) => String(p.categoryId?._id || p.categoryId) === String(categoryId)
    ).length;

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    duplicateCategory,
    toggleFeatured,
    toggleStatus,
    bulkDelete,
    bulkFeature,
    bulkActivate,
    bulkDeactivate,
  } = useCategories();

  const [selected, setSelected] = useState([]);

  const [viewOpen, setViewOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  const filtered = useMemo(() => {
    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((item) => item.id));
    }
  };

  return (
    <>
      <BulkCategoryActions
        selected={selected}
        onDelete={() => {
          bulkDelete(selected);
          setSelected([]);
        }}
        onActivate={() => bulkActivate(selected)}
        onDeactivate={() => bulkDeactivate(selected)}
        onFeature={() => bulkFeature(selected)}
      />

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mt-6">

        <table className="w-full">

          <thead className="bg-pink-50">

            <tr>

              <th className="p-5">

                <input
                  type="checkbox"
                  checked={
                    filtered.length > 0 &&
                    selected.length === filtered.length
                  }
                  onChange={handleSelectAll}
                />

              </th>

              <th>Image</th>

              <th>Name</th>

              <th>Slug</th>

              <th>Products</th>

              <th>Featured</th>

              <th>Status</th>

              <th>Created</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((category) => (

              <tr
                key={category.id}
                className="border-t hover:bg-pink-50 transition"
              >

                <td className="text-center">

                  <input
                    type="checkbox"
                    checked={selected.includes(category.id)}
                    onChange={() => handleSelect(category.id)}
                  />

                </td>

                <td className="p-3">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                </td>

                <td className="font-semibold">

                  {category.name}

                </td>

                <td>

                  {category.slug}

                </td>

                <td>

                  {liveProductCount(category.id)}

                </td>

                <td>

                  <button
                    onClick={() => toggleFeatured(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      category.featured
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {category.featured ? "⭐ Featured" : "Not Featured"}
                  </button>

                </td>

                <td>

                  <button
                    onClick={() => toggleStatus(category.id)}
                  >
                    <CategoryStatusBadge
                      status={category.status}
                    />
                  </button>

                </td>

                <td>

                  {category.createdAt}

                </td>

                <td>

                  <CategoryActions

                    onView={() => {
                      setCurrentCategory(category);
                      setViewOpen(true);
                    }}

                    onEdit={() => {
                      setCurrentCategory(category);
                      setModalOpen(true);
                    }}

                    onDelete={() => {
                      setCurrentCategory(category);
                      setDeleteOpen(true);
                    }}

                    onDuplicate={() =>
                      duplicateCategory(category)
                    }

                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <CategoryPagination />

      <CategoryModal
        open={modalOpen}
        category={currentCategory}
        onClose={() => {
          setModalOpen(false);
          setCurrentCategory(null);
        }}
        onSave={(data) => {
          if (data.id) {
            updateCategory(data);
          } else {
            addCategory(data);
          }

          setModalOpen(false);
          setCurrentCategory(null);
        }}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        category={currentCategory}
        onClose={() => {
          setDeleteOpen(false);
          setCurrentCategory(null);
        }}
        onDelete={deleteCategory}
      />

      <ViewCategoryModal
        open={viewOpen}
        category={currentCategory}
        onClose={() => {
          setViewOpen(false);
          setCurrentCategory(null);
        }}
      />

    </>
  );
}

export default CategoryTable;