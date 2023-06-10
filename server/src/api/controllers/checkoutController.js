const checkoutData = require('../services/checkout');

const checkoutReview = async (req, res, next) => {
    try {
        res.send({
            status: 200,
            message: 'Checkout has been updated',
            data: await checkoutData.checkoutReview(req.body),
        });
    } catch (error) {
        next(error);
    }
};

const placeOrder = async (req, res, next) => {
    try {
        const result = await checkoutData.placeOrder(req.body);

        res.send({
            status: 200,
            message: 'Placed An Order',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkoutReview,
    placeOrder,
};
