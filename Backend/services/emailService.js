const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.Email,
        pass: process.env.PASS
    }
});

const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.Email,
        to: to,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw new Error("Unable to send email");
    }
};

module.exports = {
    sendOtpEmail
};
