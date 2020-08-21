const nodemailer = require('nodemailer');

const toEmail = async (recipient, subject, body) => {

    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'kevinroirigorbasina@gmail.com',
            pass: process.env.GMAILPW
        }
    });

    const mailOptions = {
        subject: subject,
        to: recipient,
        from: 'Warbler-Team-NOREPLY@gmail.com',
        text: body
    }

    await smtpTransport.sendMail(mailOptions);

}

module.exports = toEmail;