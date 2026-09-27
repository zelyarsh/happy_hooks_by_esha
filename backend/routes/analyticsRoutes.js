const express = require("express");

const {
  getDashboardStats,
  getSalesAnalytics,
  getOrderAnalytics,
  getPaymentAnalytics,
  getTopProducts,
  getCustomerAnalytics,
  getReviewAnalytics,
} = require("../controllers/analyticsController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect);
router.use(admin);

router.get("/dashboard", getDashboardStats);

router.get("/sales", getSalesAnalytics);

router.get("/orders", getOrderAnalytics);

router.get("/payments", getPaymentAnalytics);

router.get("/top-products", getTopProducts);

router.get("/customers", getCustomerAnalytics);

router.get("/reviews", getReviewAnalytics);

module.exports = router;