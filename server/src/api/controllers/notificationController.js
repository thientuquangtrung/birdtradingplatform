const notificationData = require('../services/notification');

const createNotification = async (req, res, next) => {
    try {
        const result = await notificationData.createNotification(req.body);

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllNotification = async (req, res, next) => {
    try {
        // get chatId from params
        // get all messages
        const list = await notificationData.getAllNotification(req.params.userId);

        return res.send({
            status: 200,
            message: 'OK',
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNotification,
    getAllNotification,
};
