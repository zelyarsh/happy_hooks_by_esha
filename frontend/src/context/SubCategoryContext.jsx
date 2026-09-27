import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getSubCategories,
  createSubCategory,
  updateSubCategory as updateSubCategoryAPI,
  deleteSubCategory as deleteSubCategoryAPI,
} from "../services/subCategoryService";

const SubCategoryContext = createContext();

export function SubCategoryProvider({ children }) {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH
  // ========================================

  const fetchSubCategories = async () => {
    try {
      setLoading(true);

      const result = await getSubCategories();

      setSubCategories(result.subCategories || []);
    } catch (error) {
      console.error(
        "Failed to fetch subcategories:",
        error
      );

      setSubCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // ========================================
  // ADD
  // ========================================

  const addSubCategory = async (subCategory) => {
    try {
      const data = {
        name: subCategory.name,

        categoryId:
          subCategory.categoryId ||
          subCategory.category?._id,

        description:
          subCategory.description || "",

        image:
          subCategory.image || "",

        status:
          subCategory.status || "Active",

        displayOrder:
          Number(subCategory.displayOrder) || 1,
      };

      console.log(
        "SUBCATEGORY CREATE DATA:",
        data
      );

      if (!data.categoryId) {
        return {
          success: false,
          message: "Category is required.",
        };
      }

      const result =
        await createSubCategory(data);

      if (result.success) {
        await fetchSubCategories();
      }

      return result;
    } catch (error) {
      console.error(
        "Add subcategory error:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Failed to add subcategory.",
      };
    }
  };

  // ========================================
  // UPDATE
  // Supports:
  // updateSubCategory(id, data)
  // ========================================

  const updateSubCategory = async (
    id,
    updated
  ) => {
    try {
      // Backward compatibility:
      // updateSubCategory(updatedObject)
      if (
        typeof id === "object" &&
        updated === undefined
      ) {
        updated = id;
        id = updated._id;
      }

      if (!id) {
        return {
          success: false,
          message:
            "Subcategory ID is required.",
        };
      }

      const data = {
        name: updated.name,

        categoryId:
          updated.categoryId ||
          updated.category?._id,

        description:
          updated.description || "",

        image:
          updated.image || "",

        status:
          updated.status || "Active",

        displayOrder:
          Number(updated.displayOrder) || 1,
      };

      if (!data.categoryId) {
        return {
          success: false,
          message: "Category is required.",
        };
      }

      console.log(
        "SUBCATEGORY UPDATE DATA:",
        data
      );

      const result =
        await updateSubCategoryAPI(
          id,
          data
        );

      if (result.success) {
        await fetchSubCategories();
      }

      return result;
    } catch (error) {
      console.error(
        "Failed to update subcategory:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Failed to update subcategory.",
      };
    }
  };

  // ========================================
  // DELETE
  // ========================================

  const deleteSubCategory = async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          message:
            "Subcategory ID is required.",
        };
      }

      const result =
        await deleteSubCategoryAPI(id);

      if (result.success) {
        setSubCategories((prev) =>
          prev.filter(
            (item) =>
              String(item._id) !==
              String(id)
          )
        );
      }

      return result;
    } catch (error) {
      console.error(
        "Failed to delete subcategory:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Failed to delete subcategory.",
      };
    }
  };

  // ========================================
  // TOGGLE STATUS
  // ========================================

  const toggleStatus = async (id) => {
    const subCategory =
      subCategories.find(
        (item) =>
          String(item._id) ===
          String(id)
      );

    if (!subCategory) {
      return {
        success: false,
        message:
          "Subcategory not found.",
      };
    }

    return updateSubCategory(
      subCategory._id,
      {
        ...subCategory,

        categoryId:
          subCategory.category?._id ||
          subCategory.categoryId,

        status:
          subCategory.status === "Active"
            ? "Inactive"
            : "Active",
      }
    );
  };

  // ========================================
  // TOGGLE FEATURED
  //
  // NOTE:
  // Backend currently does not have
  // "featured" in SubCategory model.
  //
  // This will be enabled after we update
  // the backend model/controller.
  // ========================================

  const toggleFeatured = async (id) => {
    const subCategory =
      subCategories.find(
        (item) =>
          String(item._id) ===
          String(id)
      );

    if (!subCategory) {
      return {
        success: false,
        message:
          "Subcategory not found.",
      };
    }

    return {
      success: false,
      message:
        "Featured support will be connected to MongoDB in the next backend update.",
    };
  };

  // ========================================
  // DUPLICATE
  // ========================================

  const duplicateSubCategory = async (
    subCategory
  ) => {
    if (!subCategory) {
      return {
        success: false,
        message:
          "Subcategory data is missing.",
      };
    }

    return addSubCategory({
      name: `${subCategory.name} Copy`,

      categoryId:
        subCategory.category?._id ||
        subCategory.categoryId,

      description:
        subCategory.description || "",

      image:
        subCategory.image || "",

      status:
        subCategory.status || "Active",

      displayOrder:
        subCategory.displayOrder || 1,
    });
  };

  // ========================================
  // BULK DELETE
  // ========================================

  const bulkDelete = async (ids) => {
    try {
      if (!ids || ids.length === 0) {
        return {
          success: false,
          message:
            "No subcategories selected.",
        };
      }

      const results = await Promise.all(
        ids.map((id) =>
          deleteSubCategoryAPI(id)
        )
      );

      setSubCategories((prev) =>
        prev.filter(
          (item) =>
            !ids.some(
              (id) =>
                String(id) ===
                String(item._id)
            )
        )
      );

      return {
        success: true,
        results,
      };
    } catch (error) {
      console.error(
        "Bulk delete error:",
        error
      );

      await fetchSubCategories();

      return {
        success: false,
        message:
          error.message ||
          "Failed to delete selected subcategories.",
      };
    }
  };

  // ========================================
  // BULK ACTIVATE
  // ========================================

  const bulkActivate = async (ids) => {
    try {
      if (!ids || ids.length === 0) {
        return {
          success: false,
          message:
            "No subcategories selected.",
        };
      }

      const selectedItems =
        subCategories.filter((item) =>
          ids.some(
            (id) =>
              String(id) ===
              String(item._id)
          )
        );

      for (const item of selectedItems) {
        await updateSubCategoryAPI(
          item._id,
          {
            name: item.name,

            categoryId:
              item.category?._id ||
              item.categoryId,

            description:
              item.description || "",

            image:
              item.image || "",

            status: "Active",

            displayOrder:
              item.displayOrder || 1,
          }
        );
      }

      await fetchSubCategories();

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Bulk activate error:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Failed to activate selected subcategories.",
      };
    }
  };

  // ========================================
  // BULK DEACTIVATE
  // ========================================

  const bulkDeactivate = async (ids) => {
    try {
      if (!ids || ids.length === 0) {
        return {
          success: false,
          message:
            "No subcategories selected.",
        };
      }

      const selectedItems =
        subCategories.filter((item) =>
          ids.some(
            (id) =>
              String(id) ===
              String(item._id)
          )
        );

      for (const item of selectedItems) {
        await updateSubCategoryAPI(
          item._id,
          {
            name: item.name,

            categoryId:
              item.category?._id ||
              item.categoryId,

            description:
              item.description || "",

            image:
              item.image || "",

            status: "Inactive",

            displayOrder:
              item.displayOrder || 1,
          }
        );
      }

      await fetchSubCategories();

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Bulk deactivate error:",
        error
      );

      return {
        success: false,
        message:
          error.message ||
          "Failed to deactivate selected subcategories.",
      };
    }
  };

  // ========================================
  // BULK FEATURE
  //
  // Backend support will be added later.
  // ========================================

  const bulkFeature = async (ids) => {
    if (!ids || ids.length === 0) {
      return {
        success: false,
        message:
          "No subcategories selected.",
      };
    }

    return {
      success: false,
      message:
        "Featured support will be connected to MongoDB in the next backend update.",
    };
  };

  // ========================================
  // STATS
  // ========================================

  const totalSubCategories =
    subCategories.length;

  const activeSubCategories =
    subCategories.filter(
      (item) =>
        item.status === "Active"
    ).length;

  const inactiveSubCategories =
    subCategories.filter(
      (item) =>
        item.status === "Inactive"
    ).length;

  // ========================================
  // CONTEXT VALUE
  // ========================================

  const value = useMemo(
    () => ({
      subCategories,
      loading,

      fetchSubCategories,

      addSubCategory,
      updateSubCategory,
      deleteSubCategory,

      toggleStatus,
      toggleFeatured,

      duplicateSubCategory,

      bulkDelete,
      bulkActivate,
      bulkDeactivate,
      bulkFeature,

      totalSubCategories,
      activeSubCategories,
      inactiveSubCategories,
    }),
    [
      subCategories,
      loading,
      totalSubCategories,
      activeSubCategories,
      inactiveSubCategories,
    ]
  );

  return (
    <SubCategoryContext.Provider
      value={value}
    >
      {children}
    </SubCategoryContext.Provider>
  );
}

export const useSubCategories = () =>
  useContext(SubCategoryContext);