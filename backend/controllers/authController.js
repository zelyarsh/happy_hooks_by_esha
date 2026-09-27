const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// ===============================
// REGISTER
// ===============================

const register = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
    } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }


    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });


    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "customer",
    });


    const token = generateToken(user._id);


    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ===============================
// LOGIN
// ===============================

const login = async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }


    const user = await User.findOne({
      email: email.toLowerCase(),
    });


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }


    if (user.status !== "Active") {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }


    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }


    const token = generateToken(user._id);


    res.json({
      success: true,
      message: "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ===============================
// GET CURRENT USER
// ===============================

const getMe = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }


    res.json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


module.exports = {
  register,
  login,
  getMe,
};