import { useMemo, useState } from "react";

import { useSubCategories } from "../../../context/SubCategoryContext";
import { useCategories } from "../../../context/CategoryContext";
import { useProducts } from "../../../context/ProductContext";

import SubCategoryActions from "./SubCategoryActions";
import SubCategoryStatusBadge from "./SubCategoryStatusBadge";
import BulkSubCategoryActions from "./BulkSubCategoryActions";

import SubCategoryModal from "./SubCategoryModal";
import ViewSubCategoryModal from "./ViewSubCategoryModal";
import DeleteSubCategoryModal from "./DeleteSubCategoryModal";

import SubCategoryPagination from "./SubCategoryPagination";

function SubCategoryTable({ search }) {
  const { products = [] } = useProducts();

  const {
    subCategories = [],
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    duplicateSubCategory,
    toggleFeatured,
    toggleStatus,
    bulkDelete,
    bulkActivate,
    bulkDeactivate,
    bulkFeature,
  } = useSubCategories();

  const { categories = [] } = useCategories();

  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  // --------------------------------------------------
  // Product count for each subcategory
  // --------------------------------------------------
  const liveProductCount = (subCategoryId) => {
    return products.filter((product) => {
      const productSubCategoryId =
        product.subCategoryId?._id ||
        product.subCategoryId ||
        product.subcategoryId ||
        product.subCategory?._id ||
        product.subcategory?._id;

      return (
        String(productSubCategoryId || "") ===
        String(subCategoryId)
      );
    }).length;
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const filtered = useMemo(() => {
    const searchText = search?.toLowerCase().trim() || "";

    return subCategories.filter((item) => {
      const name = item.name?.toLowerCase() || "";

      const categoryName =
        item.category?.name?.toLowerCase() ||
        categories
          .find((cat) => String(cat._id) === String(item.category))
          ?.name?.toLowerCase() ||
        "";

      return (
        name.includes(searchText) ||
        categoryName.includes(searchText)
      );
    });
  }, [subCategories, categories, search]);

  // --------------------------------------------------
  // Select one
  // --------------------------------------------------
  const selectItem = (id) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((item) => item !== id)
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  // --------------------------------------------------
  // Select all
  // --------------------------------------------------
  const selectAll = () => {
    const filteredIds = filtered.map((item) => item._id);

    if (
      filteredIds.length > 0 &&
      selected.length === filteredIds.length
    ) {
      setSelected([]);
    } else {
      setSelected(filteredIds);
    }
  };

  // --------------------------------------------------
  // Get parent category name
  // --------------------------------------------------
  const getCategoryName = (item) => {
    // MongoDB populated category
    if (item.category?.name) {
      return item.category.name;
    }

    // If category is just an ObjectId
    if (item.category) {
      const category = categories.find(
        (cat) =>
          String(cat._id) === String(item.category)
      );

      if (category) {
        return category.name;
      }
    }

    // Backward compatibility
    if (item.categoryId) {
      const category = categories.find(
        (cat) =>
          String(cat._id) === String(item.categoryId)
      );

      if (category) {
        return category.name;
      }
    }

    return "—";
  };

  // --------------------------------------------------
  // Edit
  // --------------------------------------------------
  const handleEdit = (item) => {
    setCurrent(item);
    setModalOpen(true);
  };

  // --------------------------------------------------
  // Save
  // --------------------------------------------------
  const handleSave = async (data) => {
    let result;

    if (current?._id) {
      result = await updateSubCategory(
        current._id,
        data
      );
    } else {
      result = await addSubCategory(data);
    }

    if (result?.success) {
      setModalOpen(false);
      setCurrent(null);
    } else {
      alert(
        result?.message ||
          "Failed to save subcategory."
      );
    }
  };

  return (
    <>
      {/* ==========================================
          BULK ACTIONS
      ========================================== */}
      <BulkSubCategoryActions
        selected={selected}
        onDelete={async () => {
          await bulkDelete(selected);
          setSelected([]);
        }}
        onActivate={async () => {
          await bulkActivate(selected);
          setSelected([]);
        }}
        onDeactivate={async () => {
          await bulkDeactivate(selected);
          setSelected([]);
        }}
        onFeature={async () => {
          await bulkFeature(selected);
          setSelected([]);
        }}
      />

      {/* ==========================================
          TABLE
      ========================================== */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">

            {/* HEADER */}
            <thead className="bg-pink-50">

              <tr>

                <th className="p-5 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 &&
                      selected.length === filtered.length
                    }
                    onChange={selectAll}
                  />
                </th>

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Sub Category
                </th>

                <th className="p-4 text-left">
                  Parent Category
                </th>

                <th className="p-4 text-left">
                  Products
                </th>

                <th className="p-4 text-left">
                  Featured
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {filtered.length === 0 ? (

                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-16 text-gray-500"
                  >
                    No subcategories found.
                  </td>
                </tr>

              ) : (

                filtered.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t hover:bg-pink-50 transition"
                  >

                    {/* SELECT */}
                    <td className="p-4 text-center">

                      <input
                        type="checkbox"
                        checked={selected.includes(
                          item._id
                        )}
                        onChange={() =>
                          selectItem(item._id)
                        }
                      />

                    </td>

                    {/* IMAGE */}
                    <td className="p-4">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border"
                        />

                      ) : (

                        <div
                          className="
                            w-16 h-16
                            rounded-xl
                            bg-pink-50
                            flex
                            items-center
                            justify-center
                            text-pink-400
                            text-xs
                            font-semibold
                          "
                        >
                          No Image
                        </div>

                      )}

                    </td>

                    {/* SUBCATEGORY */}
                    <td className="p-4">

                      <div className="font-semibold text-gray-800">
                        {item.name}
                      </div>

                      {item.slug && (
                        <div className="text-xs text-gray-400 mt-1">
                          /{item.slug}
                        </div>
                      )}

                    </td>

                    {/* PARENT CATEGORY */}
                    <td className="p-4">

                      <span className="font-medium text-gray-700">
                        {getCategoryName(item)}
                      </span>

                    </td>

                    {/* PRODUCTS */}
                    <td className="p-4">

                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold">
                        {liveProductCount(item._id)}
                      </span>

                    </td>

                    {/* FEATURED */}
                    <td className="p-4">

                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(item._id)
                        }
                        className={`
                          px-3 py-2
                          rounded-full
                          text-sm
                          font-semibold
                          transition
                          ${
                            item.featured
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        {item.featured
                          ? "⭐ Featured"
                          : "Not Featured"}
                      </button>

                    </td>

                    {/* STATUS */}
                    <td className="p-4">

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(item._id)
                        }
                      >
                        <SubCategoryStatusBadge
                          status={item.status}
                        />
                      </button>

                    </td>

                    {/* CREATED */}
                    <td className="p-4 text-sm text-gray-500">

                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleDateString()
                        : "—"}

                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">

                      <SubCategoryActions

                        onView={() => {
                          setCurrent(item);
                          setViewOpen(true);
                        }}

                        onEdit={() => {
                          handleEdit(item);
                        }}

                        onDelete={() => {
                          setCurrent(item);
                          setDeleteOpen(true);
                        }}

                        onDuplicate={() =>
                          duplicateSubCategory(item)
                        }

                      />

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>
        </div>

      </div>

      {/* ==========================================
          PAGINATION
      ========================================== */}
      <SubCategoryPagination />

      {/* ==========================================
          ADD / EDIT MODAL
      ========================================== */}
      <SubCategoryModal
        open={modalOpen}
        subCategory={current}
        onClose={() => {
          setModalOpen(false);
          setCurrent(null);
        }}
        onSave={handleSave}
      />

      {/* ==========================================
          VIEW MODAL
      ========================================== */}
      <ViewSubCategoryModal
        open={viewOpen}
        subCategory={current}
        onClose={() => {
          setViewOpen(false);
          setCurrent(null);
        }}
      />

      {/* ==========================================
          DELETE MODAL
      ========================================== */}
      <DeleteSubCategoryModal
        open={deleteOpen}
        subCategory={current}
        onClose={() => {
          setDeleteOpen(false);
          setCurrent(null);
        }}
        onDelete={async (id) => {
          const result = await deleteSubCategory(id);

          if (result?.success) {
            setDeleteOpen(false);
            setCurrent(null);
          } else {
            alert(
              result?.message ||
                "Failed to delete subcategory."
            );
          }
        }}
      />

    </>
  );
}

export default SubCategoryTable;