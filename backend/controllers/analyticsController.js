const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Review = require("../models/Review");

// Dashboard overview
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      activeProducts,
      totalCustomers,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalReviews,
      pendingReviews,
    ] = await Promise.all([
      Product.countDocuments(),

      Product.countDocuments({
        status: "Active",
      }),

      User.countDocuments({
        role: "customer",
      }),

      Order.countDocuments(),

      Order.countDocuments({
        orderStatus: "Pending",
      }),

      Order.countDocuments({
        orderStatus: "Delivered",
      }),

      Review.countDocuments(),

      Review.countDocuments({
        status: "Pending",
      }),
    ]);

    const revenueResult = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalCustomers,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalReviews,
        pendingReviews,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

// Revenue and orders by month
const getSalesAnalytics = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },

          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          orders: {
            $sum: 1,
          },

          revenue: {
            $sum: "$totalAmount",
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const sales = months.map((month, index) => {
      const monthNumber = index + 1;

      const existingMonth = monthlySales.find(
        (item) => item._id.month === monthNumber
      );

      return {
        month,
        orders: existingMonth
          ? existingMonth.orders
          : 0,
        revenue: existingMonth
          ? existingMonth.revenue
          : 0,
      };
    });

    res.status(200).json({
      success: true,
      year: currentYear,
      sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales analytics",
      error: error.message,
    });
  }
};

// Order status statistics
const getOrderAnalytics = async (req, res) => {
  try {
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const analytics = {
      Pending: 0,
      Confirmed: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    orderStats.forEach((item) => {
      analytics[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      orders: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order analytics",
      error: error.message,
    });
  }
};

// Payment analytics
const getPaymentAnalytics = async (req, res) => {
  try {
    const paymentStats = await Order.aggregate([
      {
        $group: {
          _id: "$paymentMethod",
          count: {
            $sum: 1,
          },
          amount: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      payments: paymentStats.map((item) => ({
        paymentMethod: item._id,
        orders: item.count,
        amount: item.amount,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment analytics",
      error: error.message,
    });
  }
};

// Top selling products
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },

      {
        $unwind: "$items",
      },

      {
        $group: {
          _id: "$items.productId",

          productName: {
            $first: "$items.name",
          },

          totalQuantity: {
            $sum: "$items.quantity",
          },

          totalRevenue: {
            $sum: {
              $multiply: [
                "$items.price",
                "$items.quantity",
              ],
            },
          },
        },
      },

      {
        $sort: {
          totalQuantity: -1,
        },
      },

      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      success: true,
      products: topProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch top products",
      error: error.message,
    });
  }
};

// Customer analytics
const getCustomerAnalytics = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const activeCustomers = await User.countDocuments({
      role: "customer",
      status: "Active",
    });

    const inactiveCustomers = await User.countDocuments({
      role: "customer",
      status: "Inactive",
    });

    const customersWithOrders =
      await Order.distinct("customerId");

    res.status(200).json({
      success: true,
      customers: {
        total: totalCustomers,
        active: activeCustomers,
        inactive: inactiveCustomers,
        withOrders: customersWithOrders.filter(Boolean)
          .length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer analytics",
      error: error.message,
    });
  }
};

// Review analytics
const getReviewAnalytics = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },

      {
        $group: {
          _id: "$rating",
          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    const ratings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    stats.forEach((item) => {
      ratings[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  getOrderAnalytics,
  getPaymentAnalytics,
  getTopProducts,
  getCustomerAnalytics,
  getReviewAnalytics,
};