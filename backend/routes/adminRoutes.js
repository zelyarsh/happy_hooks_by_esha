const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Protected admin test route
router.get("/test", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Admin authentication successful.",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;