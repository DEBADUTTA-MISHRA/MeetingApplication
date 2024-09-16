const meetingService = require('../services/meetingService');

// Create a new meeting and generate a unique link
const createMeeting = async (req, res) => {
    try {
        const { organizer } = req.body;
        
        // Call the service to create a meeting
        const meetingUrl = await meetingService.createMeeting(organizer);

        // Send back the generated Jitsi Meet URL
        res.status(201).json({ message: 'Meeting created successfully', meetingUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error creating meeting', error });
    }
};

// Join a meeting by meeting ID
const joinMeeting = (req, res) => {
    const { meetingId } = req.params;
    
    // Here you could implement logic to join the meeting room
    res.send(`Joining meeting with ID: ${meetingId}`);
};

module.exports = { createMeeting, joinMeeting };