const createError = require("http-errors");
const authData = require("../services/auth");

module.exports = {
    async checkMail (req, res, next){
        try {
            const data = req.body;
            const isValid = await authData.checkMail(data);
            if (isValid) {
                next();
            } else {
                next(
                    createError(
                        409,
                        "The request could not be completed due to a conflict with the current state of the resource."
                    )
                );
            }
        } catch (error) {
            next(createError(error.status, error.message));
        }
    }
}