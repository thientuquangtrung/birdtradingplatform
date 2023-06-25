const createError = require('http-errors');
const productData = require('../services/product');
const authData = require('../services/auth');
const { modifyPagination } = require('../utils/response_modifiers');
const fs = require('fs-extra');
const { deleteImage, uploadImage } = require('../services/firebase');

const getProducts = async (req, res, next) => {
    try {
        const page = req.query.page;

        const list = await productData.getProducts(page);

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await productData.getProductById(req.params.id);
        const shop = await authData.readAccountById(product.shopId, 'SELLER');
        return res.send({
            status: 200,
            message: 'OK',
            data: {
                ...product,
                shop,
            },
        });
    } catch (error) {
        next(error);
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const result = await productData.searchProducts(req.query);

        return res.send({
            data: result.documents,
            meta: {
                total: result.total,
                currentPage: Number(req.query.page),
                totalPages: Math.ceil(Number(result.total) / Number(process.env.ROW_OF_PAGE)),
            },
        });
    } catch (error) {
        next(error);
    }
};

const searchProductsByShop = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const result = await productData.searchProducts({ ...req.query, shopId });

        return res.send({
            data: result.documents,
            meta: {
                total: result.total,
                currentPage: Number(req.query.page),
                totalPages: Math.ceil(Number(result.total) / Number(process.env.ROW_OF_PAGE)),
            },
        });
    } catch (error) {
        next(error);
    }
};

const suggestProducts = async (req, res, next) => {
    try {
        const result = await productData.suggestProducts(req.query.q);

        return res.send({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const filterProducts = async (req, res, next) => {
    try {
        const { sortBy, order, categoryId, q, page } = req.query;
        const list = await productData.filterProducts(sortBy, order, categoryId, q, page);

        return res.send(modifyPagination(list, page));
    } catch (error) {
        next(error);
    }
};

const getProductsOfSeller = async (req, res, next) => {
    try {
        const list = await productData.getProductsOfSeller(req.payload.id);

        return res.send(list);
    } catch (error) {
        next(error);
    }
};

const searchSellerProducts = async (req, res, next) => {
    try {
        const shopId = req.payload.id;
        const { q, categoryId } = req.query;

        const list = await productData.searchSellerProducts(shopId, q, categoryId ? categoryId : 'all');

        return res.send(list);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            shopId: req.payload.id,
        };
        data.image = await uploadImage({ file: req.file, folder: 'product', prefix: 'product' });
        const created = await productData.createProduct(data);

        return res.send(created);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const foundProduct = await productData.getProductById(req.body.id);
        if (!foundProduct) return next(createError.NotFound('Product not found'));

        if (req.file) {
            if (foundProduct.image) {
                await deleteImage(foundProduct.image);
            }

            req.body.image = await uploadImage({ file: req.file, folder: 'product', prefix: 'product' });
        }

        const updatedProduct = Object.assign(foundProduct, req.body);
        const updated = await productData.updateProduct(updatedProduct);

        return res.send({
            status: 200,
            message: 'OK',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const shopId = req.payload.id;
        const id = req.params.id;

        const deleted = await productData.deleteProduct(id, shopId);

        return res.send(deleted);
    } catch (error) {
        next(error);
    }
};

const setAllProductToRedis = async (req, res, next) => {
    try {
        await productData.setAllProductToRedis();

        return res.send({
            status: 200,
            message: 'OK',
        });
    } catch (error) {
        next(error);
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
    filterProducts,
    setAllProductToRedis,
    suggestProducts,
    searchProductsByShop,
};
