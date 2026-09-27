const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const setupRoutes = require("./routes/setupRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const newArrivalRoutes = require("./routes/newArrivalRoutes");
const homepageRoutes = require("./routes/homepageRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/new-arrivals", newArrivalRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", settingsRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Happy Hooks By Esha API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});