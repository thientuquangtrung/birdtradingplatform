const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const config = require('./src/api/config');
const productRoutes = require('./src/api/routes/productRoutes');
const authRoutes = require('./src/api/routes/authRoutes');
const categoryRoutes = require('./src/api/routes/categoryRoutes');
const { REDIS_GET, REDIS_SET } = require('./src/api/services/redis/redisServices');
const { redisClient } = require('./src/api/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/profile', express.static('public/images/profile'));
app.use('/product', express.static('public/images/product'));

app.use('/api', productRoutes.routes);
app.use('/api', authRoutes.routes);
app.use('/api', categoryRoutes.routes);

app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
