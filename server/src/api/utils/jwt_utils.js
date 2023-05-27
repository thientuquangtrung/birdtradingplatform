const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };

        const secret = process.env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: '1h',
        };

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized());
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.send({
                        status: 401,
                        message: error.message,
                    });
                } else {
                    return next(createError.Unauthorized(error.message));
                }
            }

            req.payload = payload;
            next();
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const signRefreshToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };

        const secret = process.env.REFRESH_TOKEN_SECRET;

        const options = {
            expiresIn: '30d',
        };

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);
            resolve(token);
        });
    });
};

const verifyRefreshToken = (req, res, next) => {
    try {
        if (!req.headers['x-token']) {
            return next(createError.Unauthorized());
        }

        const token = req.headers['x-token'];

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if (error) {
                return next(createError.Unauthorized(error.message));
            }

            req.payload = payload;
            next();
        });
    } catch (error) {
        next(createError(error.message));
    }
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};
