const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const config = require('./src/api/config');
const productRoutes = require('./src/api/routes/productRoutes');
const authRoutes = require('./src/api/routes/authRoutes');
const categoryRoutes = require('./src/api/routes/categoryRoutes');
const cartRoutes = require('./src/api/routes/cartRoutes');
const checkoutRoutes = require('./src/api/routes/checkoutRoutes');
const orderRoutes = require('./src/api/routes/orderRoutes');
const feedbackRoutes = require('./src/api/routes/feedbackRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/profile', express.static('public/images/profile'));
app.use('/product', express.static('public/images/product'));
app.use('/feedback', express.static('public/images/feedback'));

app.use('/api', productRoutes.routes);
app.use('/api', authRoutes.routes);
app.use('/api', categoryRoutes.routes);
app.use('/api', cartRoutes.routes);
app.use('/api', checkoutRoutes.routes);
app.use('/api', orderRoutes.routes);
app.use('/api', feedbackRoutes.routes);

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
