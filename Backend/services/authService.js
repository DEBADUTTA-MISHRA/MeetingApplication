const OTP = require('../models/otpModel');
const { generateRandomOtp, resetOtpCount, validateOtpRequest, invalidateOtp  } = require('../helpers/otpHelper');
const { sendOtpEmail } = require('../services/emailService');

const generateOtp = async (email) => {
    const { canRequest, message } = await validateOtpRequest(email);
    if (!canRequest) {
        return { success: false, message };
    }

    const otp = generateRandomOtp();
    const expiry = Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000;

    const otpData = await OTP.findOne({ email });
    if (otpData) {
        otpData.otp = otp;
        otpData.expiresAt = expiry;
        otpData.count += 1;
        await otpData.save();
    } else {
        await OTP.create({ email, otp, expiresAt: expiry, count: 1, requestedAt: new Date() });
    }

    try {
        await sendOtpEmail(email, otp); 
        return { success: true, message: 'OTP generated and sent successfully' };
    } catch (err) {
        return { success: false, message: 'Failed to send OTP via email' };
    }
};

const verifyOtpCode = async (email, enteredOtp) => {

    const otpData = await OTP.findOne({ email});
    
    if (!otpData) {
        return { success: false, message: 'No OTP data found for this email' };
    }

    if (otpData.otp !== enteredOtp) {
        console.log("Invalid OTP entered");
        return { success: false, message: 'Invalid OTP' };
    }

    if (Date.now() > otpData.expiresAt) {
        return { success: false, message: 'OTP has expired' };
    }

    try {
        await invalidateOtp(email);
    } catch (err) {
        console.error('Error in validating OTP:', err);
        return { success: false, message: 'Failed to invalidate OTP' };
    }

    return { success: true, message: 'OTP verified successfully' };
};

module.exports = {
    verifyOtpCode,
    generateOtp
};
