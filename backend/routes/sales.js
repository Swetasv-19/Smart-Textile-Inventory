const express = require("express");
const Sale = require("../models/Sale");
const Product = require("../models/Product");

const router = express.Router();

/**
 * Add Sale
 */
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalAmount = quantity * product.pricePerUnit;

    const sale = new Sale({
      product: productId,
      quantity,
      totalAmount,
    });

    await sale.save();

    // reduce inventory
    product.quantity -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Get all sales
 */
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().populate("product");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
