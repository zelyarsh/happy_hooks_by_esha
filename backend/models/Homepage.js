const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "Handmade With Love",
        trim: true,
      },
      subtitle: {
        type: String,
        default: "Beautiful crochet creations made especially for you.",
        trim: true,
      },
      buttonText: {
        type: String,
        default: "Shop Now",
        trim: true,
      },
      buttonLink: {
        type: String,
        default: "/shop",
        trim: true,
      },
      image: {
        type: String,
        default: "",
      },
      active: {
        type: Boolean,
        default: true,
      },
    },

    announcement: {
      text: {
        type: String,
        default: "Handmade with love • Custom orders available",
        trim: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },

    featuredCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    featuredProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    banners: [
      {
        title: { type: String, required: true, trim: true },
        image: { type: String, default: "" },
        link: { type: String, default: "" },
        status: {
          type: String,
          enum: ["Active", "Inactive"],
          default: "Active",
        },
      },
    ],

    faqs: [
      {
        question: { type: String, required: true, trim: true },
        answer: { type: String, required: true, trim: true },
      },
    ],

    testimonials: [
      {
        name: { type: String, required: true, trim: true },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        review: { type: String, required: true, trim: true },
      },
    ],

    instagramMedia: [
      {
        title: { type: String, required: true, trim: true },
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
        url: { type: String, default: "" },
      },
    ],

    sections: {
      categories: {
        type: Boolean,
        default: true,
      },
      featuredProducts: {
        type: Boolean,
        default: true,
      },
      newArrivals: {
        type: Boolean,
        default: true,
      },
      about: {
        type: Boolean,
        default: true,
      },
      reviews: {
        type: Boolean,
        default: true,
      },
    },

    aboutSection: {
      title: {
        type: String,
        default: "Made With Love",
        trim: true,
      },
      description: {
        type: String,
        default:
          "Every Happy Hooks By Esha creation is carefully handmade with love and attention to detail.",
        trim: true,
      },
      image: {
        type: String,
        default: "",
      },
      buttonText: {
        type: String,
        default: "Learn More",
        trim: true,
      },
      buttonLink: {
        type: String,
        default: "/about",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Homepage", homepageSchema);