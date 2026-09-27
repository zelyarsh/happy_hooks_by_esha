const Homepage = require("../models/Homepage");
const Category = require("../models/Category");
const Product = require("../models/Product");

// Get homepage
const getHomepage = async (req, res) => {
  try {
    let homepage = await Homepage.findOne()
      .populate({
        path: "featuredCategories",
        match: { status: "Active" },
      })
      .populate({
        path: "featuredProducts",
        match: { status: "Active" },
        populate: [
          {
            path: "categoryId",
            select: "name slug",
          },
          {
            path: "subCategoryId",
            select: "name slug",
          },
        ],
      });

    // Create default homepage if none exists
    if (!homepage) {
      homepage = await Homepage.create({});
    }

    res.status(200).json({
      success: true,
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch homepage",
      error: error.message,
    });
  }
};

// Get homepage settings for admin
const getHomepageAdmin = async (req, res) => {
  try {
    let homepage = await Homepage.findOne()
      .populate("featuredCategories")
      .populate("featuredProducts");

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    res.status(200).json({
      success: true,
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch homepage settings",
      error: error.message,
    });
  }
};

// Update homepage
const updateHomepage = async (req, res) => {
  try {
    const {
      hero,
      announcement,
      featuredCategories,
      featuredProducts,
      sections,
      aboutSection,
    } = req.body;

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = new Homepage();
    }

    if (hero !== undefined) {
      homepage.hero = {
        ...homepage.hero.toObject(),
        ...hero,
      };
    }

    if (announcement !== undefined) {
      homepage.announcement = {
        ...homepage.announcement.toObject(),
        ...announcement,
      };
    }

    if (featuredCategories !== undefined) {
      for (const categoryId of featuredCategories) {
        const category = await Category.findById(categoryId);

        if (!category) {
          return res.status(404).json({
            success: false,
            message: `Category not found: ${categoryId}`,
          });
        }
      }

      homepage.featuredCategories = featuredCategories;
    }

    if (featuredProducts !== undefined) {
      for (const productId of featuredProducts) {
        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${productId}`,
          });
        }
      }

      homepage.featuredProducts = featuredProducts;
    }

    if (sections !== undefined) {
      homepage.sections = {
        ...homepage.sections.toObject(),
        ...sections,
      };
    }

    if (aboutSection !== undefined) {
      homepage.aboutSection = {
        ...homepage.aboutSection.toObject(),
        ...aboutSection,
      };
    }

    await homepage.save();

    const updatedHomepage = await Homepage.findById(homepage._id)
      .populate("featuredCategories")
      .populate("featuredProducts");

    res.status(200).json({
      success: true,
      message: "Homepage updated successfully",
      homepage: updatedHomepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update homepage",
      error: error.message,
    });
  }
};

// Add featured category
const addFeaturedCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = new Homepage();
    }

    const alreadyExists = homepage.featuredCategories.some(
      (id) => id.toString() === categoryId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Category is already featured",
      });
    }

    homepage.featuredCategories.push(categoryId);

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Category added to featured categories",
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add featured category",
      error: error.message,
    });
  }
};

// Remove featured category
const removeFeaturedCategory = async (req, res) => {
  try {
    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage settings not found",
      });
    }

    homepage.featuredCategories =
      homepage.featuredCategories.filter(
        (id) => id.toString() !== req.params.categoryId
      );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Category removed from featured categories",
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove featured category",
      error: error.message,
    });
  }
};

// Add featured product
const addFeaturedProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = new Homepage();
    }

    const alreadyExists = homepage.featuredProducts.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product is already featured",
      });
    }

    homepage.featuredProducts.push(productId);

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Product added to featured products",
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add featured product",
      error: error.message,
    });
  }
};

// Remove featured product
const removeFeaturedProduct = async (req, res) => {
  try {
    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage settings not found",
      });
    }

    homepage.featuredProducts =
      homepage.featuredProducts.filter(
        (id) => id.toString() !== req.params.productId
      );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Product removed from featured products",
      homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove featured product",
      error: error.message,
    });
  }
};

// ================================
// Small helper to fetch (or create) the single Homepage doc
// ================================
const getOrCreateHomepage = async () => {
  let homepage = await Homepage.findOne();
  if (!homepage) {
    homepage = await Homepage.create({});
  }
  return homepage;
};

// ================================
// BANNERS
// ================================

const addBanner = async (req, res) => {
  try {
    const { title, image, link, status } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Banner title is required",
      });
    }

    const homepage = await getOrCreateHomepage();

    homepage.banners.push({
      title: title.trim(),
      image: image || "",
      link: link || "",
      status: status || "Active",
    });

    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Banner added successfully",
      banners: homepage.banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add banner",
      error: error.message,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();
    const banner = homepage.banners.id(req.params.bannerId);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const { title, image, link, status } = req.body;

    if (title !== undefined) banner.title = title;
    if (image !== undefined) banner.image = image;
    if (link !== undefined) banner.link = link;
    if (status !== undefined) banner.status = status;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      banners: homepage.banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update banner",
      error: error.message,
    });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();

    homepage.banners = homepage.banners.filter(
      (b) => b._id.toString() !== req.params.bannerId
    );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
      banners: homepage.banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
      error: error.message,
    });
  }
};

// ================================
// FAQS
// ================================

const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const homepage = await getOrCreateHomepage();
    homepage.faqs.push({ question, answer });
    await homepage.save();

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      faqs: homepage.faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add FAQ",
      error: error.message,
    });
  }
};

const updateFaq = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();
    const faq = homepage.faqs.id(req.params.faqId);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    const { question, answer } = req.body;

    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      faqs: homepage.faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
      error: error.message,
    });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();

    homepage.faqs = homepage.faqs.filter(
      (f) => f._id.toString() !== req.params.faqId
    );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
      faqs: homepage.faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete FAQ",
      error: error.message,
    });
  }
};

// ================================
// TESTIMONIALS
// ================================

const addTestimonial = async (req, res) => {
  try {
    const { name, rating, review } = req.body;

    if (!name || !review) {
      return res.status(400).json({
        success: false,
        message: "Name and review are required",
      });
    }

    const homepage = await getOrCreateHomepage();
    homepage.testimonials.push({
      name,
      rating: Number(rating) || 5,
      review,
    });
    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonials: homepage.testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add testimonial",
      error: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();

    homepage.testimonials = homepage.testimonials.filter(
      (t) => t._id.toString() !== req.params.testimonialId
    );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      testimonials: homepage.testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
      error: error.message,
    });
  }
};

// ================================
// INSTAGRAM MEDIA
// ================================

const addInstagramMedia = async (req, res) => {
  try {
    const { title, type, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and media URL are required",
      });
    }

    const homepage = await getOrCreateHomepage();
    homepage.instagramMedia.push({
      title,
      type: type === "video" ? "video" : "image",
      url,
    });
    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Instagram media added successfully",
      instagramMedia: homepage.instagramMedia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add Instagram media",
      error: error.message,
    });
  }
};

const deleteInstagramMedia = async (req, res) => {
  try {
    const homepage = await getOrCreateHomepage();

    homepage.instagramMedia = homepage.instagramMedia.filter(
      (m) => m._id.toString() !== req.params.mediaId
    );

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Instagram media deleted successfully",
      instagramMedia: homepage.instagramMedia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Instagram media",
      error: error.message,
    });
  }
};

module.exports = {
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
};