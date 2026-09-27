const Order = require("../models/Order");
const Product = require("../models/Product");

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `HH-${timestamp}-${random}`;
};

// Create Order
const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      items,
      shippingAddress,
      shippingFee = 250,
      discount = 0,
      paymentMethod = "Cash on Delivery",
      notes = "",
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !items ||
      items.length === 0 ||
      !shippingAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "Required order information is missing",
      });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.status !== "Active") {
        return res.status(400).json({
          success: false,
          message: `${product.name} is not available`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const itemTotal = product.price * item.quantity;

      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || "",
      });
    }

    const totalAmount =
      subtotal + Number(shippingFee) - Number(discount);

    const order = await Order.create({
      orderNumber: generateOrderNumber(),

      customerId: customerId || null,

      customerName,
      customerEmail,
      customerPhone,

      items: orderItems,

      shippingAddress,

      subtotal,

      shippingFee: Number(shippingFee),

      discount: Number(discount),

      totalAmount,

      paymentMethod,

      paymentStatus:
        paymentMethod === "EasyPaisa" ? "Pending" : "Pending",

      orderStatus: "Pending",

      notes,
    });

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name email")
      .populate("items.productId", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get Single Order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customerId", "name email")
      .populate("items.productId", "name price images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Get Customer Orders
const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customerId: req.params.customerId,
    })
      .populate("items.productId", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer orders",
      error: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Paid",
      "Failed",
      "Refunded",
    ];

    if (!allowedStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      ["Delivered", "Cancelled"].includes(order.orderStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled because it is ${order.orderStatus}`,
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: {
          stock: item.quantity,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled and stock restored",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

// Delete Order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Restore stock unless the order was already cancelled
    if (order.orderStatus !== "Cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getCustomerOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
};