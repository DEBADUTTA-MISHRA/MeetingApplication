const { v4: uuidv4 } = require('uuid');  // For generating unique IDs

// Service to create a new meeting and generate a unique Jitsi Meet URL
const createMeeting = async (organizer) => {
    // Generate a unique meeting room ID
    const meetingId = uuidv4();
    
    // Construct the Jitsi Meet room URL
    const meetingUrl = `https://meet.jit.si/${meetingId}`;

    // Here, you can store the meeting details in your database if needed
    // E.g., Meeting.create({ meetingId, organizer, url: meetingUrl });

    return meetingUrl;
}

module.exports = { createMeeting };