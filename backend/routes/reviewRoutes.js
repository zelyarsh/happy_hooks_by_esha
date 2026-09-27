const express = require("express");

const {
  createReview,
  getProductReviews,
  getReviews,
  getReviewById,
  updateReviewStatus,
  deleteReview,
  getReviewStats,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Customer
router.post("/", protect, createReview);

// Public
router.get("/product/:productId", getProductReviews);

// Admin
router.get("/", protect, admin, getReviews);

router.get("/stats", protect, admin, getReviewStats);

router.get("/:id", protect, admin, getReviewById);

router.put(
  "/:id/status",
  protect,
  admin,
  updateReviewStatus
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteReview
);

module.exports = router;