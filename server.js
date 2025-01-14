const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service (e.g., Yahoo, Outlook)
    auth: {
        user: '', // Replace with your email
        pass: '' // Replace with your email password or app password
    }
});

// Route to send an email on GET request
app.get('/send-email', async (req, res) => {
    const mailOptions = {
        from: '', // Sender's email address
        to: '', // Recipient's email address
        subject: 'Test Email', // Email subject
        text: 'This is a test email sent from the Node.js application.' // Email content
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});