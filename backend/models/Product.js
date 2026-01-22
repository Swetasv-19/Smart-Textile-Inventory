const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      enum: ["meter", "roll", "piece", "kg"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
      default: 10,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String, // for now we store image URL / base64
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
