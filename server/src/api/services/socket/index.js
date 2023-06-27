const { redisClient } = require('../../config');

const connection = (socket) => {
    socket.on('disconnect', async () => {
        const onlineUsers = await getOnlineUsers();
        const user = onlineUsers.find((user) => user.socketId === socket.id);
        await redisClient.sRem('online_users', `${user?.userId}:${socket.id}`);

        _io.emit('getOnlineUsers', await getOnlineUsers());
    });

    // other events (use _io to emit events, socket to listen for events)

    // receive message
    socket.on('sendMessage', async (message) => {
        await redisClient.sAdd('online_users', `${message.from}:${socket.id}`);
        const onlineUsers = await getOnlineUsers();
        const user = onlineUsers.find((user) => user.userId === message.to);
        console.log(user);
        if (user) {
            _io.to(user.socketId).emit('getMessage', message);
        }
    });

    // listen to a connection
    socket.on('addNewUser', async (userId) => {
        if (!userId) return;
        redisClient.sAdd('online_users', `${userId}:${socket.id}`);

        _io.emit('getOnlineUsers', await getOnlineUsers());
    });
};

const getOnlineUsers = async () => {
    const list = await redisClient.sMembers('online_users');

    const onlineUsers = list.map((item) => {
        return {
            userId: item.split(':')[0],
            socketId: item.split(':')[1],
        };
    });

    return onlineUsers;
};

module.exports = {
    connection,
};
