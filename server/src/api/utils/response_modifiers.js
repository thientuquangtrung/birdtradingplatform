const createError = require('http-errors');

const { signAccessToken, signRefreshToken } = require('./jwt_utils');

const { readAccountById } = require('../services/auth');
const { getProduct } = require('../services/product/product.repo');

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
        let total = 0;
        let totalPages = 0;

        if (list.length > 0) {
            total = list[0].total;
            totalPages = Math.ceil(Number(total) / Number(process.env.ROW_OF_PAGE));

            list.forEach((item) => {
                delete item.total;
            });
        }

        const responseList = {
            data: list,
            meta: {
                pagination: {
                    total,
                    currentPage: Number(page),
                    totalPages,
                },
            },
        };

        return responseList;
    } catch (error) {
        throw error;
    }
};

const modifyOrder = async (list) => {
    const grouping = list.reduce(function (r, a) {
        r[a.id] = r[a.id] || [];
        r[a.id].push({
            ...a,
        });
        return r;
    }, {});

    const response = [];
    for (const [key, value] of Object.entries(grouping)) {
        const orderInfo = {
            orderId: key,
            date: value[0].date,
            status: value[0].status,
            customer: await readAccountById(value[0].customerId, 'CUSTOMER'),
            shop: await readAccountById(value[0].shopId, 'SELLER'),
        };

        const products = [];
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            const product = await getProduct(element.productId);
            products.push({
                ...product,

                image: `${process.env.HOST_URL}/product/${product.image}`,
                price: element.price,
                quantity: element.quantity,
            });
        }

        response.push({
            ...orderInfo,
            products,
        });
    }

    return response;
};

module.exports = {
    modifyUserInfo,
    modifyPagination,
    modifyOrder,
};
