const createError = require('http-errors');
const productData = require('../services/product');
const { modifyPagination } = require('../utils/response_modifiers');

const getProducts = async (req, res, next) => {
    try {
        const page = req.query.page;

        const list = await productData.getProducts(page);

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(createError(error.message));
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await productData.getProductById(req.params.id);

        product.image = `${process.env.HOST_URL}/product/${product.image}`;

        return res.send(product);
    } catch (error) {
        next(createError(error.message));
    }
};

const getProductByCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { page } = req.query;
        const list = await productData.getProductByCategory(id, page);

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(createError(error.message));
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const { q, page } = req.query;
        const list = await productData.searchProducts(q, page);

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(createError(error.message));
    }
};

const filterProducts = async (req, res, next) => {
    try {
        const { sortBy, order, categoryId, q, page } = req.query;
        const list = await productData.filterProducts(sortBy, order, categoryId, q, page);

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(createError(error.message));
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
        next(createError(error.message));
    }
};

const searchSellerProducts = async (req, res, next) => {
    try {
        const shopId = req.payload.id;
        const { q, categoryId } = req.query;

        const list = await productData.searchSellerProducts(shopId, q, categoryId ? categoryId : 'all');

        list.map((product) => {
            product.image = `${process.env.HOST_URL}/product/${product.image}`;
        });

        return res.send(list);
    } catch (error) {
        next(createError(error.message));
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

const updateProduct = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            shopId: req.payload.id,
            image: req.file.filename,
        };

        const updated = await productData.updateProduct(data);

        return res.send({
            ...updated,
            image: `${process.env.HOST_URL}/product/${req.file.filename}`,
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const shopId = req.payload.id;
        const id = req.params.id;

        const deleted = await productData.deleteProduct(id, shopId);

        return res.send(deleted);
    } catch (error) {
        next(createError(error.message));
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsOfSeller,
    createProduct,
    searchSellerProducts,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductByCategory,
    filterProducts,
};
