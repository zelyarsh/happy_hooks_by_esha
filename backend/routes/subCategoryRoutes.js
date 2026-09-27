const express = require("express");

const {
  getSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// PUBLIC ROUTES

// Get all subcategories
router.get("/", getSubCategories);

// Get subcategories belonging to a category
router.get(
  "/category/:categoryId",
  getSubCategoriesByCategory
);

// Get one subcategory
router.get("/:id", getSubCategoryById);

// ADMIN ROUTES

// Create
router.post(
  "/",
  protect,
  admin,
  createSubCategory
);

// Update
router.put(
  "/:id",
  protect,
  admin,
  updateSubCategory
);

// Delete
router.delete(
  "/:id",
  protect,
  admin,
  deleteSubCategory
);

module.exports = router;