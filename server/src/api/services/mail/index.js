const { mailer } = require('../../config');
const { transport, options } = mailer;

const sendMail = async ({ to, subject, html, text = '' }) => {
    const mailOptions = {
        ...options,
        to,
        subject,
        html,
        text,
    };

    return await transport.sendMail(mailOptions);
};

module.exports = {
    sendMail,
};
