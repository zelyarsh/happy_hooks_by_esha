const express = require("express");

const {
  getHomepage,
  getHomepageAdmin,
  updateHomepage,
  addFeaturedCategory,
  removeFeaturedCategory,
  addFeaturedProduct,
  removeFeaturedProduct,
  addBanner,
  updateBanner,
  deleteBanner,
  addFaq,
  updateFaq,
  deleteFaq,
  addTestimonial,
  deleteTestimonial,
  addInstagramMedia,
  deleteInstagramMedia,
} = require("../controllers/homepageController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Public
router.get("/", getHomepage);

// Admin
router.get(
  "/admin",
  protect,
  admin,
  getHomepageAdmin
);

router.put(
  "/",
  protect,
  admin,
  updateHomepage
);

router.post(
  "/featured-category",
  protect,
  admin,
  addFeaturedCategory
);

router.delete(
  "/featured-category/:categoryId",
  protect,
  admin,
  removeFeaturedCategory
);

router.post(
  "/featured-product",
  protect,
  admin,
  addFeaturedProduct
);

router.delete(
  "/featured-product/:productId",
  protect,
  admin,
  removeFeaturedProduct
);

// Banners
router.post("/banners", protect, admin, addBanner);
router.put("/banners/:bannerId", protect, admin, updateBanner);
router.delete("/banners/:bannerId", protect, admin, deleteBanner);

// FAQs
router.post("/faqs", protect, admin, addFaq);
router.put("/faqs/:faqId", protect, admin, updateFaq);
router.delete("/faqs/:faqId", protect, admin, deleteFaq);

// Testimonials
router.post("/testimonials", protect, admin, addTestimonial);
router.delete(
  "/testimonials/:testimonialId",
  protect,
  admin,
  deleteTestimonial
);

// Instagram media
router.post("/instagram", protect, admin, addInstagramMedia);
router.delete(
  "/instagram/:mediaId",
  protect,
  admin,
  deleteInstagramMedia
);

module.exports = router;