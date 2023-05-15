const productData = require('../services/product')

const getProducts = async(req, res, next) => {
    try {
        const products = await productData.getProducts();
        res.send(products)
    }
    catch(err) {   
        res.status(400).send(err.message)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await productData.getProductById(req.params.id)
        res.send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const data = req.body
        const created = await productData.createProduct(data)
        res.send(created)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct
}