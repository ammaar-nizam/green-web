const twilio = require('twilio');

// A function to send SMS updates to public users
function sendSMS(req, res){
    const updateMessage = {
        bodyMessage: req.body.bodyMessage, 
        toPhoneNumber: req.body.toPhoneNumber
    }
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    return client.messages
        .create({body: updateMessage.bodyMessage, from: '+12058505171', to: updateMessage.toPhoneNumber})
        .then((message) => {
            res.status(201).json({
                message: message
            })
        })
        .catch((err) =>  {
            res.status(500).json({
                error: err
            })
        });
}

module.exports = {sendSMS}