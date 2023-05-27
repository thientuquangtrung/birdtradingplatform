const createError = require('http-errors');

const { signAccessToken, signRefreshToken } = require('./jwt_utils');

const modifyUserInfo = async (user) => {
    try {
        delete user.password;

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        const response = {
            data: user,
            meta: {
                accessToken,
                refreshToken,
            },
        };

        return response;
    } catch (error) {
        throw createError(error);
    }
};

module.exports = {
    modifyUserInfo,
};
