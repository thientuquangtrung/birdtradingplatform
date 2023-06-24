const { redisClient } = require('../../config');

const createChat = async ({ firstId, secondId }) => {
    try {
        const roomId = sortId(firstId, secondId);
        await redisClient.sAdd(`user:${firstId}:rooms`, roomId);
        await redisClient.sAdd(`user:${secondId}:rooms`, roomId);
    } catch (error) {
        throw error;
    }
};

const getUserChats = async (userId) => {
    try {
        const userChats = await redisClient.sMembers(`user:${userId}:rooms`);

        return userChats;
    } catch (error) {
        throw error;
    }
};

const getOneChat = async ({ firstId, secondId }) => {
    try {
        const roomId = sortId(firstId, secondId);

        return roomId;
    } catch (error) {
        throw error;
    }
};

const sortId = (firstId, secondId) => {
    const value = firstId.localCompare(secondId);

    if (value === 1) return `${secondId}:${firstId}`;
    else if (value === -1) return `${firstId}:${secondId}`;
};

module.exports = {
    createChat,
    getUserChats,
    getOneChat,
};
