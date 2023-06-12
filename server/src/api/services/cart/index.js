const createError = require('http-errors');
const { redisClient } = require('../../config');
const { setProduct, getProduct } = require('../product/product.repo');

const addToCart = async ({ userId, product = {}, quantity }) => {
    try {
        const foundProduct = await getProduct(product.id);
        if (!foundProduct) {
            throw createError.NotFound('Product not found!');
        }

        if (foundProduct.shopId !== product.shopId) {
            throw createError.NotFound('Product not found!');
        }

        const userCart = await redisClient.hGetAll(`cart:${userId}`);
        if (!userCart) {
            return await redisClient.hSet(`cart:${userId}`, `product:${product.id}`, quantity);
        }

        const item = await redisClient.hGet(`cart:${userId}`, `product:${product.id}`);
        if (!item) {
            return await redisClient.hSet(`cart:${userId}`, `product:${product.id}`, quantity);
        } else {
            return await redisClient.hIncrBy(`cart:${userId}`, `product:${product.id}`, quantity);
        }
    } catch (error) {
        throw error;
    }
};

const updateCart = async ({ userId, product = {}, quantity }) => {
    try {
        const foundProduct = await getProduct(product.id);
        if (!foundProduct) {
            throw createError.NotFound('Product not found!');
        }

        if (foundProduct.shopId !== product.shopId) {
            throw createError.NotFound('Product not found!');
        }

        if (quantity === 0) {
            return await deleteCartItem({ userId, product });
        }

        return await redisClient.hSet(`cart:${userId}`, `product:${product.id}`, quantity);
    } catch (error) {
        throw error;
    }
};

const deleteCart = async ({ userId }) => {
    try {
        return await redisClient.del(`cart:${userId}`);
    } catch (error) {
        throw error;
    }
};

const deleteCartItem = async ({ userId, product = {} }) => {
    try {
        return await redisClient.hDel(`cart:${userId}`, `product:${product.id}`);
    } catch (error) {
        throw error;
    }
};

const getUserCart = async ({ userId }) => {
    try {
        let productList = [];

        const cartList = await redisClient.hGetAll(`cart:${userId}`);
        if (!cartList) {
            return productList;
        }

        for (const itemKey of Object.keys(cartList)) {
            const product = await redisClient.json.get(itemKey);

            productList.push({ product, quantity: cartList[itemKey] });
        }

        return productList;
    } catch (error) {
        throw error;
    }
};

const getCartLength = async ({ userId }) => {
    try {
        return await redisClient.hLen(`cart:${userId}`);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    addToCart,
    updateCart,
    deleteCart,
    getUserCart,
    deleteCartItem,
    getCartLength,
};
