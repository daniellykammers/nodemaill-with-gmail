const nodemailer = require('nodemailer');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-mail', (request, response) => {
    const { addresseeEmail, email: {subject, text}, senderConfig: {email, pass} } = request.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: email,
            pass: pass
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    transporter.sendMail({
        to: addresseeEmail,
        subject: subject,
        text: text
    });

    return response.json('chegou aqui')
})

app.listen(3333, () => {
    console.log('Back-end started!')
});