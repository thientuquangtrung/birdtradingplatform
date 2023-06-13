const cartData = require('../services/cart');

const addToCart = async (req, res, next) => {
    try {
        const response = await cartData.addToCart(req.body);
        const cartList = await cartData.getUserCart(req.body);
        const cartLength = await cartData.getCartLength(req.body);

        return res.send({
            status: 200,
            message: 'Cart added successfully',
            data: {
                items: cartList.reverse(),
                length: cartLength,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const response = await cartData.updateCart(req.body);
        const cartList = await cartData.getUserCart(req.body);
        return res.send({
            status: 200,
            message: 'Update cart item successfully',
            data: {
                items: cartList.reverse(),
            },
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
        const response = await cartData.deleteCartItem(req.body);
        const cartList = await cartData.getUserCart(req.body);
        const cartLength = await cartData.getCartLength(req.body);

        return res.send({
            status: 200,
            message: 'Delete cart item successfully',
            data: {
                items: cartList.reverse(),
                length: cartLength,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUserCart = async (req, res, next) => {
    try {
        const response = await cartData.getUserCart(req.query);
        const cartLength = await cartData.getCartLength(req.query);

        response.map((item) => {
            item.product.image = `${process.env.HOST_URL}/product/${item.product.image}`;
        });

        return res.send({
            status: 200,
            message: 'OK',
            data: {
                items: response.reverse(),
                length: cartLength,
            },
        });
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
