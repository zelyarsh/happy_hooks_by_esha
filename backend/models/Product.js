const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Out of Stock"],
      default: "Active",
    },

    displayOrder: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);