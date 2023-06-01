const createHttpError = require('http-errors');
const { redisClient } = require('../../config');
const { getProductById } = require('../product');

const setProduct = async (product = {}) => {
    const foundProduct = await getProductById(product.id);
    if (!foundProduct) {
        throw createHttpError.NotFound('Product not found!');
    }

    if (foundProduct.shopId !== product.shopId) {
        throw createHttpError.NotFound('Product not found!');
    }

    return await redisClient.json.set(`product:${product.id}`, '.', JSON.stringify(product));
};

const getProduct = async (productId) => {
    return await redisClient.json.get(`product:${productId}`);
};

module.exports = {
    setProduct,
    getProduct,
};
