const Product = require("../models/Product");

// Get all new arrival products
const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({
      newArrival: true,
      status: "Active",
    })
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch new arrivals",
      error: error.message,
    });
  }
};

// Get all new arrivals for admin
const getAllNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({
      newArrival: true,
    })
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch new arrivals",
      error: error.message,
    });
  }
};

// Add product to New Arrivals
const addNewArrival = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.newArrival = true;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added to new arrivals",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product to new arrivals",
      error: error.message,
    });
  }
};

// Remove product from New Arrivals
const removeNewArrival = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.newArrival = false;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product removed from new arrivals",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product from new arrivals",
      error: error.message,
    });
  }
};

// Get New Arrivals count
const getNewArrivalStats = async (req, res) => {
  try {
    const totalNewArrivals = await Product.countDocuments({
      newArrival: true,
    });

    const activeNewArrivals = await Product.countDocuments({
      newArrival: true,
      status: "Active",
    });

    const inactiveNewArrivals = await Product.countDocuments({
      newArrival: true,
      status: "Inactive",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalNewArrivals,
        activeNewArrivals,
        inactiveNewArrivals,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch new arrival statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getNewArrivals,
  getAllNewArrivals,
  addNewArrival,
  removeNewArrival,
  getNewArrivalStats,
};