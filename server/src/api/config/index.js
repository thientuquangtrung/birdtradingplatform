const dotenv = require('dotenv');
dotenv.config();

const { sql } = require('./init.mssql');
const { redisClient } = require('./init.redis');

const assert = require('assert');

const { PORT, HOST, HOST_URL } = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql,
    redisClient,
};
