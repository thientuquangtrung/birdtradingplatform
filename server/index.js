const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors')

const config = require('./src/config');
const productRoutes = require('./src/api/routes/productRoutes')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.use('/api', productRoutes.routes)

app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(
        {
            status: err.status || 500,
            message: err.message
        }
    )
})

app.listen(config.port, () => console.log(`Server started on port ${config.port}`))