const express = require("express");

const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// PUBLIC ROUTES

// Get all products
router.get("/", getProducts);

// Get products by category
router.get(
  "/category/:categoryId",
  getProductsByCategory
);

// Get products by subcategory
router.get(
  "/subcategory/:subCategoryId",
  getProductsBySubCategory
);

// Get single product
router.get("/:id", getProductById);

// ADMIN ROUTES

// Create product
router.post(
  "/",
  protect,
  admin,
  createProduct
);

// Update product
router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;