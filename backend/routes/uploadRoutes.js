const express = require("express");

const { uploadSingle, uploadMultiple } = require("../controllers/uploadController");
const upload = require("../middleware/upload");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// All upload routes require an authenticated admin
router.use(protect, admin);

// Single file
router.post("/", upload.single("file"), uploadSingle);

// Multiple files (up to 10)
router.post("/multiple", upload.array("files", 10), uploadMultiple);

module.exports = router;
