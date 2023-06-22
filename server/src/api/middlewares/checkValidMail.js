const createError = require('http-errors');
const validator = require('deep-email-validator');

module.exports = {
    async checkValidMail(req, res, next) {
        try {
            const mailCheck = await validator.validate(req.body.email);
            if (!mailCheck.valid) next(createError.BadRequest('Email is invalid!'));
            else next();
        } catch (error) {
            next(error);
        }
    },
};
