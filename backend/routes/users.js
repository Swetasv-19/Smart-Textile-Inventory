const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * Get all workers
 */
router.get("/workers", async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password");
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
