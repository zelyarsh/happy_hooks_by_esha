const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

// GET ALL SUBCATEGORIES
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find()
      .populate("categoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories",
      error: error.message,
    });
  }
};

// GET SUBCATEGORIES BY CATEGORY
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subCategories = await SubCategory.find({
      categoryId,
    }).sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: subCategories.length,
      category: {
        id: category._id,
        name: category.name,
        slug: category.slug,
      },
      subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories",
      error: error.message,
    });
  }
};

// GET SINGLE SUBCATEGORY
const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(
      req.params.id
    ).populate("categoryId", "name slug");

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategory",
      error: error.message,
    });
  }
};

// CREATE SUBCATEGORY
const createSubCategory = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      slug,
      description,
      image,
      featured,
      status,
      displayOrder,
    } = req.body;

    // Validate category
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Check parent category
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Selected category does not exist",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name is required",
      });
    }

    // Generate slug automatically
    const subCategorySlug =
      slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    // Prevent duplicate subcategory
    // inside the same category
    const existingSubCategory =
      await SubCategory.findOne({
        categoryId,
        $or: [
          { name: name.trim() },
          { slug: subCategorySlug },
        ],
      });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message:
          "This subcategory already exists in the selected category",
      });
    }

    const subCategory = await SubCategory.create({
      categoryId,
      name: name.trim(),
      slug: subCategorySlug,
      description: description || "",
      image: image || "",
      featured: featured || false,
      status: status || "Active",
      displayOrder: displayOrder || 1,
    });

    const populatedSubCategory =
      await SubCategory.findById(
        subCategory._id
      ).populate("categoryId", "name slug");

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      subCategory: populatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create subcategory",
      error: error.message,
    });
  }
};

// UPDATE SUBCATEGORY
const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(
      req.params.id
    );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const {
      categoryId,
      name,
      slug,
      description,
      image,
      featured,
      status,
      displayOrder,
    } = req.body;

    // If category is changed,
    // make sure the new category exists
    if (categoryId !== undefined) {
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Selected category does not exist",
        });
      }

      subCategory.categoryId = categoryId;
    }

    if (name !== undefined) {
      subCategory.name = name.trim();
    }

    if (slug !== undefined) {
      subCategory.slug = slug
        .toLowerCase()
        .trim();
    }

    if (description !== undefined) {
      subCategory.description = description;
    }

    if (image !== undefined) {
      subCategory.image = image;
    }

    if (featured !== undefined) {
      subCategory.featured = featured;
    }

    if (status !== undefined) {
      subCategory.status = status;
    }

    if (displayOrder !== undefined) {
      subCategory.displayOrder = displayOrder;
    }

    const updatedSubCategory =
      await subCategory.save();

    const populatedSubCategory =
      await SubCategory.findById(
        updatedSubCategory._id
      ).populate("categoryId", "name slug");

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      subCategory: populatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update subcategory",
      error: error.message,
    });
  }
};

// DELETE SUBCATEGORY
const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(
      req.params.id
    );

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    await SubCategory.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subcategory",
      error: error.message,
    });
  }
};

module.exports = {
  getSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};