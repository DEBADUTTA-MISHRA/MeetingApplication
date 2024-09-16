const { generateOtp, verifyOtpCode } = require('../services/authService');
const { generateToken } = require('../middlewares/authMiddleware');
const User = require('../models/otpModel');
const { invalidateOtp } = require('../helpers/otpHelper');
const Employee = require('../models/employeeModel');

const requestOtp = async (req, res) => {
    try {
        const result = await generateOtp(req.body.email);
        res.status(result.success ? 200 : 429).json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        }

        const isValidOtp  = await verifyOtpCode(email, otp);
        // console.log(isValidOtp.success);
        // console.log(isValidOtp.message);
        if (!isValidOtp.success) {
            return res.status(400).json({ success: false, message: isValidOtp.message });
        }
   
    const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        const token = generateToken({ id: user._id, email: user.email, name:user.employeeName });
        const employee = await Employee.findOne({email});
        res.status(200).json({ success: true, token,employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error verifying OTP', error });
    }
};

module.exports = {
    requestOtp,
    verifyOtp
}
