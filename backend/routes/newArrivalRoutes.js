const express = require("express");

const {
  getNewArrivals,
  getAllNewArrivals,
  addNewArrival,
  removeNewArrival,
  getNewArrivalStats,
} = require("../controllers/newArrivalController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public
router.get("/", getNewArrivals);

// Admin
router.get(
  "/admin",
  protect,
  admin,
  getAllNewArrivals
);

router.get(
  "/stats",
  protect,
  admin,
  getNewArrivalStats
);

router.put(
  "/:id/add",
  protect,
  admin,
  addNewArrival
);

router.put(
  "/:id/remove",
  protect,
  admin,
  removeNewArrival
);

module.exports = router;