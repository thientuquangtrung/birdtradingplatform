const { mailer } = require('../../config');
const { transport, options } = mailer;

const sendMail = async ({ to, subject, html, text = '' }) => {
    try {
        const mailOptions = {
            ...options,
            to,
            subject,
            html,
            text,
        };

        const result = await transport.sendMail(mailOptions);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    sendMail,
};
