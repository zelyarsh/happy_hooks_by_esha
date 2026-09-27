import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCategories,
  createCategory,
  updateCategory as updateCategoryAPI,
  deleteCategory as deleteCategoryAPI,
} from "../services/categoryService";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH CATEGORIES
  // ================================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================================
  // ADD CATEGORY
  // ================================

  const addCategory = async (category) => {
    try {
      const data = await createCategory({
        name: category.name,
        description: category.description,
        image: category.image,
        featured: category.featured,
        status: category.status,
        displayOrder: category.displayOrder,
      });

      setCategories((prev) => [
        data.category,
        ...prev,
      ]);

      return {
        success: true,
        category: data.category,
      };
    } catch (error) {
      console.error("Failed to add category:", error);

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // UPDATE CATEGORY
  // ================================

  const updateCategory = async (updatedCategory) => {
    try {
      const data = await updateCategoryAPI(
        updatedCategory._id,
        {
          name: updatedCategory.name,
          description: updatedCategory.description,
          image: updatedCategory.image,
          featured: updatedCategory.featured,
          status: updatedCategory.status,
          displayOrder: updatedCategory.displayOrder,
        }
      );

      setCategories((prev) =>
        prev.map((item) =>
          item._id === updatedCategory._id
            ? data.category
            : item
        )
      );

      return {
        success: true,
        category: data.category,
      };
    } catch (error) {
      console.error("Failed to update category:", error);

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // DELETE CATEGORY
  // ================================

  const deleteCategory = async (id) => {
    try {
      await deleteCategoryAPI(id);

      setCategories((prev) =>
        prev.filter((item) => item._id !== id)
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("Failed to delete category:", error);

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // DUPLICATE CATEGORY
  // ================================

  const duplicateCategory = async (category) => {
    return addCategory({
      ...category,
      name: `${category.name} Copy`,
    });
  };

  // ================================
  // TOGGLE FEATURED
  // ================================

  const toggleFeatured = async (id) => {
    const category = categories.find(
      (item) => item._id === id
    );

    if (!category) return;

    return updateCategory({
      ...category,
      featured: !category.featured,
    });
  };

  // ================================
  // TOGGLE STATUS
  // ================================

  const toggleStatus = async (id) => {
    const category = categories.find(
      (item) => item._id === id
    );

    if (!category) return;

    return updateCategory({
      ...category,
      status:
        category.status === "Active"
          ? "Inactive"
          : "Active",
    });
  };

  // ================================
  // BULK DELETE
  // ================================

  const bulkDelete = async (ids) => {
    try {
      for (const id of ids) {
        await deleteCategoryAPI(id);
      }

      setCategories((prev) =>
        prev.filter(
          (item) => !ids.includes(item._id)
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("Bulk delete failed:", error);

      await fetchCategories();

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // BULK FEATURE
  // ================================

  const bulkFeature = async (ids) => {
    try {
      const selectedCategories = categories.filter(
        (item) => ids.includes(item._id)
      );

      for (const category of selectedCategories) {
        if (!category.featured) {
          await updateCategory({
            ...category,
            featured: true,
          });
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // BULK ACTIVATE
  // ================================

  const bulkActivate = async (ids) => {
    try {
      const selectedCategories = categories.filter(
        (item) => ids.includes(item._id)
      );

      for (const category of selectedCategories) {
        if (category.status !== "Active") {
          await updateCategory({
            ...category,
            status: "Active",
          });
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // BULK DEACTIVATE
  // ================================

  const bulkDeactivate = async (ids) => {
    try {
      const selectedCategories = categories.filter(
        (item) => ids.includes(item._id)
      );

      for (const category of selectedCategories) {
        if (category.status !== "Inactive") {
          await updateCategory({
            ...category,
            status: "Inactive",
          });
        }
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // ================================
  // STATS
  // ================================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const inactiveCategories = categories.filter(
    (category) => category.status === "Inactive"
  ).length;

  const featuredCategories = categories.filter(
    (category) => category.featured
  ).length;

  const value = useMemo(
    () => ({
      categories,
      loading,

      fetchCategories,

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

      totalCategories,
      activeCategories,
      inactiveCategories,
      featuredCategories,
    }),
    [
      categories,
      loading,
      totalCategories,
      activeCategories,
      inactiveCategories,
      featuredCategories,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () =>
  useContext(CategoryContext);