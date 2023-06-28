const dotenv = require('dotenv');
dotenv.config();

const { sql } = require('./init.mssql');
const { redisClient } = require('./init.redis');
const { mailer } = require('./init.mail');
const { firebaseAdmin, firebaseApp } = require('./init.firebase');

const assert = require('assert');

const { PORT, HOST, HOST_URL, CLIENT_HOST } = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    clientHost: CLIENT_HOST,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql,
    redisClient,
    mailer,
    firebaseAdmin,
    firebaseApp,
};
