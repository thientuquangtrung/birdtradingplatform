const messageData = require('../services/message');

const createMessage = async (req, res, next) => {
    try {
        // get data from req.body (chatId, senderId, text, image...)
        // create message
        const result = await messageData.createMessage(req.body);

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllMessages = async (req, res, next) => {
    try {
        // get chatId from params
        // get all messages
        const list = await messageData.getAllMessages(req.params.chatId);

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
    createMessage,
    getAllMessages,
};
