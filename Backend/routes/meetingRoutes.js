const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/create', meetingController.createMeeting);

// Route to join a meeting by ID
router.get('/:meetingId', meetingController.joinMeeting);

module.exports = router;