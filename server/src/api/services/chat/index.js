const { redisClient } = require('../../config');

const createChat = async ({ firstId, secondId }) => {
    try {
        const roomId = sortId(firstId, secondId);
        await redisClient.sAdd(`user:${firstId}:rooms`, roomId);
        await redisClient.sAdd(`user:${secondId}:rooms`, roomId);

        return {
            id: roomId,
            member: roomId.split(':'),
        };
    } catch (error) {
        throw error;
    }
};

const getUserChats = async (userId) => {
    try {
        const userChats = await redisClient.sMembers(`user:${userId}:rooms`);
        const list = userChats.map((chat) => {
            return {
                id: chat,
                member: chat.split(':'),
            };
        });
        return list;
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
    const value = firstId.localeCompare(secondId);

    if (value === 1) return `${secondId}:${firstId}`;
    else if (value === -1) return `${firstId}:${secondId}`;
};

module.exports = {
    createChat,
    getUserChats,
    getOneChat,
};
