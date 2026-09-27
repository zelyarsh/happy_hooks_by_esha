const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    general: {
      storeName: { type: String, default: "Happy Hooks By Esha", trim: true },
      email: { type: String, default: "", trim: true },
      phone: { type: String, default: "", trim: true },
      whatsapp: { type: String, default: "", trim: true },
      currency: { type: String, default: "PKR", trim: true },
      country: { type: String, default: "Pakistan", trim: true },
      address: { type: String, default: "", trim: true },
      logo: { type: String, default: "" },
      favicon: { type: String, default: "" },
    },

    shipping: {
      standardCost: { type: String, default: "" },
      freeShippingAbove: { type: String, default: "" },
      deliveryTime: { type: String, default: "3-5 Days" },
      region: { type: String, default: "Pakistan" },
    },

    payment: {
      jazzCash: { type: String, default: "" },
      easyPaisa: { type: String, default: "" },
      bankTitle: { type: String, default: "" },
      bankAccount: { type: String, default: "" },
      codAvailable: { type: Boolean, default: true },
    },

    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      youtube: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
