const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
        req.user = decoded; // Attach the decoded token payload to the request object
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
