const connection = (socket) => {
    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    });

    // other events (use _io to emit events, socket to listen for events)
};

module.exports = {
    connection,
};
