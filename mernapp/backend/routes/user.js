const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user'); // Ensure this path points to your User model

require('dotenv').config(); // Load environment variables

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Route to create a new user without requiring authentication
router.post(
    '/createuser',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age
            });

            const token = generateToken(newUser); // Generate JWT token
            res.json({ success: true, user: newUser, token });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
);

module.exports = router;
