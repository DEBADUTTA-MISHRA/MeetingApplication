const express = require('express');
const { requestOtp, verifyOtp } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

// Protect routes below with JWT verification
router.get('/protected-route', authMiddleware.verifyJwt, (req, res) => {
    res.status(200).json({ success: true, message: 'Access granted', user: req.user });
});

module.exports = router;
