const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "An admin already exists",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message: "First admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create admin",
      error: error.message,
    });
  }
});

module.exports = router;