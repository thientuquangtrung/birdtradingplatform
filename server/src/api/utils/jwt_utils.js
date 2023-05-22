const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        }

        const secret = process.env.ACCESS_TOKEN_SECRET 

        const options = {
            expiresIn: '20m'
        }

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }

    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            return next(createError.Unauthorized(error.message))
        }
        
        req.payload = payload
        next()
    })

}

module.exports = {
    signAccessToken,
    verifyAccessToken
}