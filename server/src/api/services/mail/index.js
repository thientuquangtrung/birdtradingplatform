const { transport, options } = require('../../config/init.mail');

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
