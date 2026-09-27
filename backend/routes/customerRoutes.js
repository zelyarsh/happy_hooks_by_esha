const express = require("express");

const {
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerStats,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect);
router.use(admin);

router.get("/", getCustomers);

router.get("/stats", getCustomerStats);

router.get("/:id", getCustomerById);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;