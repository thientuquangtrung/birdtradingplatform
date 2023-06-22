const createError = require('http-errors');
const authData = require('../services/auth');

module.exports = {
    async checkExistingMail(req, res, next) {
        try {
            const data = req.body;
            const isValid = await authData.checkExistingMail(data);
            if (isValid) {
                next();
            } else {
                next(createError(409, 'User has registered with this email address.'));
            }
        } catch (error) {
            next(createError(error.message));
        }
    },
};
