const express = require("express");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// All category management routes require admin
router.use(protect, admin);

// GET all categories
router.get("/", getCategories);

// GET single category
router.get("/:id", getCategoryById);

// CREATE category
router.post("/", createCategory);

// UPDATE category
router.put("/:id", updateCategory);

// DELETE category
router.delete("/:id", deleteCategory);

module.exports = router;