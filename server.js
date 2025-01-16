const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Simulated database query function
const getUserDataFromDatabase = async () => {
    // Simulate fetching data from a temporary database
    return [
        {
            id: 1,
            name: 'ayush jain',
            email: '28.jainayush@gmail.com',
        },
        {
            id: 2,
            name: 'alish jain',
            email: 'jainalish23@gmail.com',
        },
        {
            id: 3,
            name: 'anu jain',
            email: 'alish.jain1996@gmail.com',
        }
    ];
};

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service (e.g., Yahoo, Outlook)
    auth: {
        user: '', // Replace with your email
        pass: '' // Replace with your email password or app password
    }
});

// Route to send emails to all users in the database
app.get('/send-email', async (req, res) => {
    try {
        // Fetch all user data from the database
        const users = await getUserDataFromDatabase();

        // Send emails to all users
        for (const user of users) {
            const mailOptions = {
                from: '', // Sender's email address
                to: user.email, // Recipient's email address
                subject: `Welcome, ${user.name}!`, // Personalized subject
                html: `
                    <h1>Welcome to Our Service, ${user.name}!</h1>
                    <p>We hope you enjoy all the premium features available with your plan.</p>
                    <p>Best Regards,</p>
                    <p><strong>Your Company Team</strong></p>
                    <footer style="margin-top: 20px; font-size: 0.8em; color: gray;">
                        <p>If you have any questions, feel free to contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
                    </footer>
                ` // HTML content with database data
            };

            // Send the email
            await transporter.sendMail(mailOptions);
        }

        res.status(200).json({ success: true, message: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ success: false, error: 'Failed to send emails.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
