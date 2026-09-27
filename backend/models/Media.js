const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      default: 0,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Media", mediaSchema);
