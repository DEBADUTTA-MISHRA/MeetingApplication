const express = require('express');
const employeeRoutes = require('./employeeRoutes');
const authRoutes = require('./authRoutes');
const meetingRoutes = require('./meetingRoutes');
const router = express.Router();

router.use('/employees', employeeRoutes);
router.use('/auth', authRoutes);
router.use('/createMeeting',meetingRoutes);

module.exports = router;
