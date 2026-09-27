const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  getCustomerOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Customer
router.post("/", protect, createOrder);

// Admin
router.get("/", protect, admin, getOrders);

router.get(
  "/customer/:customerId",
  protect,
  getCustomerOrders
);

router.get("/:id", protect, getOrderById);

router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

router.put(
  "/:id/payment",
  protect,
  admin,
  updatePaymentStatus
);

router.put(
  "/:id/cancel",
  protect,
  cancelOrder
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteOrder
);

module.exports = router;