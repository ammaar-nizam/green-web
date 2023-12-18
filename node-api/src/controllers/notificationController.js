require('dotenv').config();
const nodemailer = require('nodemailer');
const models = require('../models');

// Initialize nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASSWORD 
    }
});
// Function to send notification
function sendComplaintStatusNotification(publicUserId, newStatus,id) {
    
    // Fetch public user's contact information from the database   
    models.PublicUser.findByPk(publicUserId).then((publicUser) => {
        if (publicUser) {
            const contactInfo = {
                email: publicUser.email,
                name:publicUser.name,
            };

            // Send notification using nodemailer 
            const mailOptions = {
                from: 'greenwebsdp@gmail.com',
                to: contactInfo.email,
                subject: 'Complaint Status Update',
                text: `Dear ${contactInfo.name},\n\n Complaint status for Complaint ID : ${id} is now updated.\n New Status :  ${newStatus}\n Kindly check your account for more information. \n\n Best Regards,\n Team GreenWeb `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
                
            });
        }
    }).catch((err) => {
        console.error('Error fetching public user information:', err);
    });
}

module.exports = {
    sendComplaintStatusNotification
};
