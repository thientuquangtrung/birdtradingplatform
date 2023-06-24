const { redisClient } = require('../../config');

const connection = (socket) => {
    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    });

    // other events (use _io to emit events, socket to listen for events)

    // listen to a connection
    socket.on('addNewUser', (userId) => {
        redisClient.sAdd('online_users', `${userId}:${socket.id}`);
    });
};

module.exports = {
    connection,
};
