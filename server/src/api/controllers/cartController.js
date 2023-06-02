const cartData = require('../services/cart');

const addToCart = async (req, res, next) => {
    try {
        const response = await cartData.addToCart(req.body);

        return res.send({
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const response = await cartData.updateCart(req.body);

        return res.send({
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const response = await cartData.deleteCart(req.body);

        return res.send(response);
    } catch (error) {
        next(error);
    }
};

const deleteCartItem = async (req, res, next) => {
    try {
        console.log(req.body);
        const response = await cartData.deleteCartItem(req.body);

        return res.send({
            status: 200,
        });
    } catch (error) {
        next(error);
    }
};

const getUserCart = async (req, res, next) => {
    try {
        const response = await cartData.getUserCart(req.query);

        return res.send(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToCart,
    deleteCart,
    deleteCartItem,
    getUserCart,
    updateCart,
};
