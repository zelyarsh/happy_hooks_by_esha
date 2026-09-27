const express = require("express");

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createAdmin,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// All user-management routes require admin authentication
router.use(protect);
router.use(admin);

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

// POST /api/users/admin
router.post("/admin", createAdmin);

module.exports = router;