const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return `Bearer ${token}`;
};

const verifyJwt = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {
    generateToken,
    verifyJwt
}
