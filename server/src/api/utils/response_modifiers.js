const createError = require("http-errors")

const { signAccessToken } = require("./jwt_utils");

const modifyUserInfo = async (user) => {
    try {
        delete user.password;

        const accessToken = await signAccessToken(user.id);

        const response = {
            data: user,
            meta: {
                accessToken,
            },
        };

        return response
    } catch (error) {
        throw createError(error)
    }
}

module.exports = {
    modifyUserInfo
}