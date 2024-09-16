const OTP = require('../models/otpModel');

const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const validateOtpRequest = async (email) => {
    const otpData = await OTP.findOne({ email });
    if (!otpData) {
        return { canRequest: true };
    }

    const now = Date.now();
    const timeDiff = now - otpData.requestedAt;

    if (timeDiff > process.env.OTP_REQUEST_LIMIT_MINUTES * 60 * 1000) {
        await resetOtpCount(email);
        return { canRequest: true };
    }

    if (otpData.count >= process.env.MAX_OTP_REQUESTS) {
        return { canRequest: false, message: 'OTP request limit exceeded. Try again later.' };
    }

    return { canRequest: true };
};

const resetOtpCount = async (email) => {
    await OTP.updateOne({ email }, { $set: { count: 0, requestedAt: new Date() } });
};

// New function to invalidate OTP
const invalidateOtp = async (email) => {
    await OTP.updateOne({ email }, { $set: { otp: null } });
};


module.exports = {
    generateRandomOtp,
    validateOtpRequest,
    resetOtpCount,
    invalidateOtp
}
