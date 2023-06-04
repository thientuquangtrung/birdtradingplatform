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

module.exports = {
    checkoutReview
}