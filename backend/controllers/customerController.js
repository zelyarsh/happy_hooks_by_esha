const User = require("../models/User");
const Order = require("../models/Order");

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .sort({ createdAt: -1 });

    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({
          customerId: customer._id,
        });

        const totalOrders = orders.length;

        const totalSpent = orders
          .filter((order) => order.orderStatus !== "Cancelled")
          .reduce(
            (total, order) => total + order.totalAmount,
            0
          );

        return {
          ...customer.toObject(),
          totalOrders,
          totalSpent,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: customersWithStats.length,
      customers: customersWithStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findOne({
      _id: req.params.id,
      role: "customer",
    }).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const orders = await Order.find({
      customerId: customer._id,
    })
      .populate("items.productId", "name price images")
      .sort({ createdAt: -1 });

    const totalSpent = orders
      .filter((order) => order.orderStatus !== "Cancelled")
      .reduce(
        (total, order) => total + order.totalAmount,
        0
      );

    res.status(200).json({
      success: true,
      customer: {
        ...customer.toObject(),
        totalOrders: orders.length,
        totalSpent,
        orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const customer = await User.findOne({
      _id: req.params.id,
      role: "customer",
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    if (email && email.toLowerCase() !== customer.email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: customer._id },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered",
        });
      }

      customer.email = email.toLowerCase();
    }

    if (name) {
      customer.name = name;
    }

    if (status) {
      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer status",
        });
      }

      customer.status = status;
    }

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        role: customer.role,
        status: customer.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findOne({
      _id: req.params.id,
      role: "customer",
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

// Get customer statistics
const getCustomerStats = async (req, res) => {
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

    const customersWithOrders = await Order.distinct(
      "customerId"
    );

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        activeCustomers,
        inactiveCustomers,
        customersWithOrders: customersWithOrders.filter(
          Boolean
        ).length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerStats,
};