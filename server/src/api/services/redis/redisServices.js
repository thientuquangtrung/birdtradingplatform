const { redisClient } = require('../../config');
const { promisify } = require('util');

const REDIS_GET = promisify(redisClient.get).bind(redisClient);
const REDIS_SET = promisify(redisClient.set).bind(redisClient);
const REDIS_LRANGE = promisify(redisClient.lRange).bind(redisClient);

module.exports = {
    REDIS_GET,
    REDIS_SET,
    REDIS_LRANGE,
};
