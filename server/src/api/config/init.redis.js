const dotenv = require('dotenv');
dotenv.config();

const { createClient } = require('redis');
const client = createClient({
    url: process.env.REDIS_URI,
});

client
    .connect()
    .then(() => {
        console.log('Redis client connected');
    })
    .catch((error) => {
        console.error(error);
    });

client
    .ping()
    .then((message) => console.log(message))
    .catch((error) => console.log(error));

module.exports = {
    redisClient: client,
};
