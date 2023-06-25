const createError = require('http-errors');
const productData = require('../services/product');
const { modifyPagination } = require('../utils/response_modifiers');
const fs = require('fs-extra');
const { deleteImage, uploadImage } = require('../services/firebase');

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
        return res.send(product);
    } catch (error) {
        next(createError(error.message));
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const result = await productData.searchProducts(req.query);
        if (result.documents.length > 0) {
            result.documents.map((document) => {
                document.value.image = `${process.env.HOST_URL}/product/${document.value.image}`;
            });
        }

        return res.send({
            data: result.documents,
            meta: {
                total: result.total,
                currentPage: Number(req.query.page),
                totalPages: Math.ceil(Number(result.total) / Number(process.env.ROW_OF_PAGE)),
            },
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const searchProductsByShop = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        const result = await productData.searchProducts({ ...req.query, shopId });
        if (result.documents.length > 0) {
            result.documents.map((document) => {
                document.value.image = `${process.env.HOST_URL}/product/${document.value.image}`;
            });
        }

        return res.send({
            data: result.documents,
            meta: {
                total: result.total,
                currentPage: Number(req.query.page),
                totalPages: Math.ceil(Number(result.total) / Number(process.env.ROW_OF_PAGE)),
            },
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const suggestProducts = async (req, res, next) => {
    try {
        const result = await productData.suggestProducts(req.query.q);

        return res.send({
            data: result,
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const filterProducts = async (req, res, next) => {
    try {
        const { sortBy, order, categoryId, q, page } = req.query;
        const list = await productData.filterProducts(sortBy, order, categoryId, q, page);

        if (list.length > 0) {
            list.map((product) => {
                product.image = `${process.env.HOST_URL}/product/${product.image}`;
            });
        }

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
        };
        data.image = await uploadImage({ file: req.file, folder: 'product', prefix: 'product' });
        const created = await productData.createProduct(data);

        return res.send(created);
    } catch (error) {
        next(createError(error.message));
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const foundProduct = await productData.getProductById(req.body.id);
        if (!foundProduct) return next(createError.NotFound('Product not found'));

        if (req.body.profile || req.body.image) {
            delete req.body?.profile;
            delete req.body?.image;
        }
        const updatedProduct = Object.assign(foundProduct, req.body);

        if (req.file) {
            if (foundProduct.image) {
                await fs.remove(`${process.cwd()}/public/images/product/${foundProduct.image}`);
            }

            updatedProduct.image = req.file.filename;
        }
        const updated = await productData.updateProduct(updatedProduct);

        return res.send({
            ...updated,
            image: `${process.env.HOST_URL}/product/${updated.image}`,
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
