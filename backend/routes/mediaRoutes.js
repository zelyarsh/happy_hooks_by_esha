const express = require("express");

const { getMedia, deleteMedia } = require("../controllers/mediaController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, admin);

router.get("/", getMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
