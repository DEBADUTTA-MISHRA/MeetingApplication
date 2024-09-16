const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    count: { type: Number, default: 0 },
    requestedAt: { type: Date, default: Date.now }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('OTP', otpSchema);
