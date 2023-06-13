const createHttpError = require('http-errors');
const feedbackData = require('../services/feedback');

const createFeedback = async (req, res, next) => {
    try {
        const payload = {
            ...req.body,
            image: req.file?.filename,
        };

        await feedbackData.createFeedback(payload);

        return res.send({
            status: 200,
            message: 'create feedback successfully',
        });
    } catch (error) {
        next(error);
    }
};

const getFeedbackOfProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const data = await feedbackData.getFeedbackOfProduct({ productId, ...req.query });
        return res.send({
            status: 200,
            message: 'OK',
            ...data,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFeedbackOfProduct,
    createFeedback,
};
