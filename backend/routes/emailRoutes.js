const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Route to send email (protected by auth)
router.post('/send', AuthMiddleware, async (req, res) => {
    try {
        const { to, subject, message, html } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Email, subject, and message are required'
            });
        }

        const result = await sendEmail({
            to,
            subject,
            text: message,
            html: html || message.replace(/\n/g, '<br>')
        });

        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: result.messageId
        });
    } catch (error) {
        console.error('Error in send email route:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});

module.exports = router; 