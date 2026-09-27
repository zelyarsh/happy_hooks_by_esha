const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");

// Create Review
const createReview = async (req, res) => {
  try {
    const {
      productId,
      rating,
      title = "",
      comment,
    } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Product, rating and comment are required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReview = await Review.findOne({
      productId,
      customerId: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      productId,
      customerId: req.user._id,
      customerName: req.user.name,
      rating,
      title,
      comment,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

// Get approved reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      status: "Approved",
    })
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / totalReviews
        : 0;

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product reviews",
      error: error.message,
    });
  }
};

// Get all reviews - Admin
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("productId", "name price images")
      .populate("customerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Get single review
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("productId", "name price images")
      .populate("customerId", "name email");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

// Update review status - Admin
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review status",
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review status updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review status",
      error: error.message,
    });
  }
};

// Delete review - Admin
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

// Get review statistics - Admin
const getReviewStats = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();

    const pendingReviews = await Review.countDocuments({
      status: "Pending",
    });

    const approvedReviews = await Review.countDocuments({
      status: "Approved",
    });

    const rejectedReviews = await Review.countDocuments({
      status: "Rejected",
    });

    const ratingStats = await Review.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    const averageRating =
      ratingStats.length > 0
        ? Number(ratingStats[0].averageRating.toFixed(1))
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalReviews,
        pendingReviews,
        approvedReviews,
        rejectedReviews,
        averageRating,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review statistics",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getReviews,
  getReviewById,
  updateReviewStatus,
  deleteReview,
  getReviewStats,
};