const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"AI Solution" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || text
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail }; 