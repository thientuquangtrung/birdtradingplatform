const { redisClient } = require('../../config');
const createMessage = async ({ chatId, senderId, text }) => {
    try {
        const timestamp = Date.now();
        const message = {
            from: senderId,
            date: timestamp,
            message: text,
            roomId: chatId,
        };
        const result = await redisClient.zAdd(`room:${chatId}`, JSON.stringify(message), {
            score: timestamp,
        });

        return result;
    } catch (error) {
        throw error;
    }
};

const getAllMessages = async (chatId) => {
    try {
        const list = await redisClient.zRange(`room:${chatId}`, 0, -1);

        list.forEach((item) => JSON.parse(item));

        return list;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getAllMessages,
};
