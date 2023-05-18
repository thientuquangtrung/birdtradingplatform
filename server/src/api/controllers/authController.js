const authData = require('../services/auth')

const checkMail = async (req, res, next) => {
    try {
        const data = req.body
        const isValid = await authData.checkMail(data)
        if (isValid) {
            res.send({
                isValid,
                ...data
            })
        }
        else {
            res.status(409).send({
                message: "The request could not be completed due to a conflict with the current state of the resource.",
                status: 409
            });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createSellerAccount = async (req, res, next) => {
    try {
        const data = req.body
        const created = await authData.createSellerAccount(data)
        res.send(created)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    checkMail,
    createSellerAccount
}