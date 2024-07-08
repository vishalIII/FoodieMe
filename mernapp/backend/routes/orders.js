const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all recent orders
router.get('/recent', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10); // Get the most recent 10 orders
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  const { items, totalAmount, user } = req.body;

  const order = new Order({
    items,
    totalAmount,
    user
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
