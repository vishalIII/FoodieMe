// routes/itemsRoute.js

const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // Adjust to your item model

// Route to fetch items
router.get('/item', async (req, res) => {
    try {
        const items = await Item.find(); // Fetch all items from the database
        res.json(items);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
