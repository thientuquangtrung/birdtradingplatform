const createError = require('http-errors');
const productData = require('../services/product');

const getProducts = async (req, res, next) => {
    try {
        const list = await productData.getProducts();

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(list);
    } catch (error) {
        next(createError(error.status, error.message));
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await productData.getProductById(req.params.id);

        product.image = `${process.env.HOST_URL}/product/${product.image}`;

        return res.send(product);
    } catch (error) {
        next(createError(error.status, error.message));
    }
};

const getProductsOfSeller = async (req, res, next) => {
    try {
        const list = await productData.getProductsOfSeller(req.payload.id);

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(list);
    } catch (error) {
        next(createError(error.status, error.message));
    }
};

const createProduct = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            shopId: req.payload.id,
            image: req.file.filename,
        };
        const created = await productData.createProduct(data);

        return res.send({
            ...created,
            image: `${process.env.HOST_URL}/product/${req.file.filename}`,
        });
    } catch (error) {
        next(createError(error.message));
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsOfSeller,
    createProduct,
};
