const Category = require("../models/Category");

// Generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// ================================
// GET ALL CATEGORIES
// ================================

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
      error: error.message,
    });
  }
};

// ================================
// GET SINGLE CATEGORY
// ================================

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category.",
      error: error.message,
    });
  }
};

// ================================
// CREATE CATEGORY
// ================================

const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      featured,
      status,
      displayOrder,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const slug = generateSlug(name);

    const existingCategory = await Category.findOne({
      $or: [
        { name: name.trim() },
        { slug },
      ],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description || "",
      image: image || "",
      featured: Boolean(featured),
      status: status || "Active",
      displayOrder: Number(displayOrder) || 1,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category.",
      error: error.message,
    });
  }
};

// ================================
// UPDATE CATEGORY
// ================================

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      image,
      featured,
      status,
      displayOrder,
    } = req.body;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const slug = generateSlug(name);

    const duplicate = await Category.findOne({
      _id: { $ne: id },
      $or: [
        { name: name.trim() },
        { slug },
      ],
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Another category with this name already exists.",
      });
    }

    category.name = name.trim();
    category.slug = slug;
    category.description = description || "";
    category.image = image || "";
    category.featured = Boolean(featured);
    category.status = status || "Active";
    category.displayOrder = Number(displayOrder) || 1;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category.",
      error: error.message,
    });
  }
};

// ================================
// DELETE CATEGORY
// ================================

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
      error: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};