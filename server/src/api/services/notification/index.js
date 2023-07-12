const { redisClient } = require('../../config');
const createNotification = async ({ userId, content, title, isRead = false }) => {
    try {
        const timestamp = Date.now();
        const notification = {
            userId,
            content,
            title,
            date: timestamp,
            isRead,
        };
        const result = await redisClient.zAdd(`notification:${userId}`, {
            score: timestamp,
            value: JSON.stringify(notification),
        });

        return notification;
    } catch (error) {
        throw error;
    }
};

const getAllNotification = async (userId) => {
    try {
        const list = await redisClient.zRange(`notification:${userId}`, 0, -1, {
            REV: true,
        });

        const notification = list.map((item) => JSON.parse(item));

        return notification;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createNotification,
    getAllNotification,
};
