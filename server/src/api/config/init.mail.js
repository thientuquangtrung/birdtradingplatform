const dotenv = require('dotenv');
dotenv.config();

const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

const options = {
    from: process.env.FROM_ADDRESS,
};

module.exports = {
    mailer: {
        transport,
        options,
    },
};
