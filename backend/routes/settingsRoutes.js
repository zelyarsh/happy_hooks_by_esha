const express = require("express");

const { getSettings, updateSettings } = require("../controllers/settingsController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public - storefront can read store settings (name, contact, payment info)
router.get("/", getSettings);

// Admin only
router.put("/", protect, admin, updateSettings);

module.exports = router;
