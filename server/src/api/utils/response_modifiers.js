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

const modifyPagination = (list = [], page) => {
    try {
        if (!page) page = 1;
        const total = list[0].total;
        const totalPages = Math.ceil(parseInt(total) / parseInt(process.env.ROW_OF_PAGE));

        list.forEach((item) => {
            delete item.total;
        });

        const responseList = {
            data: list,
            meta: {
                pagination: {
                    total,
                    currentPage: page,
                    totalPages,
                },
            },
        };

        return responseList;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    modifyUserInfo,
    modifyPagination,
};
