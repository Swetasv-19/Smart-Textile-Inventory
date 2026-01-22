const express = require("express");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const router = express.Router();

/**
 * Add Purchase
 */
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, totalCost } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const purchase = new Purchase({
      product: productId,
      quantity,
      totalCost,
    });

    await purchase.save();

    // increase inventory
    product.quantity += quantity;
    await product.save();

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get all purchases
 */
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("product");
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
