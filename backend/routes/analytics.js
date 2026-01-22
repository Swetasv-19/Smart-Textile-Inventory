const express = require("express");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");
const Product = require("../models/Product");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const sales = await Sale.find();
    const purchases = await Purchase.find();
    const products = await Product.find();

    const totalRevenue = sales.reduce(
      (sum, s) => sum + s.totalAmount,
      0
    );

    const totalExpense = purchases.reduce(
      (sum, p) => sum + p.totalCost,
      0
    );

    const profit = totalRevenue - totalExpense;

    const lowStockCount = products.filter(
      (p) => p.quantity <= p.reorderLevel
    ).length;

    res.json({
      totalRevenue,
      totalExpense,
      profit,
      totalProducts: products.length,
      lowStockCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sales-trend", async (req, res) => {
  try {
    const { period = 'daily', category } = req.query;
    let sales = await Sale.find().populate('product').sort({ saleDate: 1 });
    
    if (category) {
      sales = sales.filter(sale => sale.product.category === category);
    }
    
    let groupedData = {};
    
    sales.forEach(sale => {
      let key;
      const date = new Date(sale.saleDate);
      
      switch (period) {
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'yearly':
          key = date.getFullYear().toString();
          break;
        default: // daily
          key = date.toISOString().split('T')[0];
      }
      
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key] += sale.totalAmount;
    });

    // Convert to array and sort
    const trendData = Object.entries(groupedData)
      .map(([key, amount]) => ({ date: key, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json(trendData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const products = await Product.find().distinct('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
