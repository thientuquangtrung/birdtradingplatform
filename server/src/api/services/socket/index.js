const { redisClient } = require('../../config');

const connection = (socket) => {
    socket.on('disconnect', async () => {
        const onlineUsers = await getOnlineUsers();
        const user = onlineUsers.find((user) => user.socketId === socket.id);
        if (user?.userId) {
            await redisClient.hDel('online_users', user.userId);
        }
        _io.emit('getOnlineUsers', await getOnlineUsers());
    });

    // other events (use _io to emit events, socket to listen for events)

    // receive message
    socket.on('sendMessage', async (message) => {
        await redisClient.hSet('online_users', message.from, socket.id);
        const onlineUsers = await getOnlineUsers();
        const user = onlineUsers.find((user) => user.userId === message.to);
        if (user) {
            _io.to(user.socketId).emit('getMessage', message);
            _io.to(user.socketId).emit('getNotification', {
                from: message.from,
                isRead: false,
                date: new Date(),
            });
        }
    });

    // listen to a connection
    socket.on('addNewUser', async (userId) => {
        if (!userId) return;
        await redisClient.hSet('online_users', userId, socket.id);

        _io.emit('getOnlineUsers', await getOnlineUsers());
    });
};

const getOnlineUsers = async () => {
    const list = await redisClient.hGetAll('online_users');

    let onlineUsers = [];
    Object.keys(list).forEach((userId) => {
        onlineUsers.push({
            userId,
            socketId: list[userId],
        });
    });

    return onlineUsers;
};

module.exports = {
    connection,
};
