const createMessage = async (req, res, next) => {
    try {
        // get data from req.body (chatId, senderId, text, image...)
        // create message
    } catch (error) {
        next(error);
    }
};

const getAllMessages = async (req, res, next) => {
    try {
        // get chatId from params
        // get all messages
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMessage,
    getAllMessages,
};
