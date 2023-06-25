const createHttpError = require('http-errors');
const feedbackData = require('../services/feedback');
const { uploadImage } = require('../services/firebase');

const createFeedback = async (req, res, next) => {
    try {
        if (!req.file) createHttpError.BadRequest('Feedback must have image file');

        const imgUrl = await uploadImage({ file: req.file, folder: 'feedback', prefix: 'feedback' });
        req.body.image = imgUrl;
        await feedbackData.createFeedback(req.body);

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
