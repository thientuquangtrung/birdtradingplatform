const createError = require('http-errors');
const fs = require('fs-extra');

const authData = require('../services/auth');
const { hashing, compareHashing } = require('../utils/hash_utils');
const { modifyUserInfo } = require('../utils/response_modifiers');
const { signAccessToken } = require('../utils/jwt_utils');

const getCurrentUser = async (req, res, next) => {
    try {
        const id = req.payload.id;
        const currentUser = await authData.getCurrentUser(id);

        delete currentUser.password;

        return res.send({
            ...currentUser,
            image: currentUser.image && `${process.env.HOST_URL}/profile/${currentUser.image}`,
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const getNewAccessToken = async (req, res, next) => {
    try {
        const id = req.payload.id;
        const accessToken = await signAccessToken(id);

        return res.send({
            accessToken,
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const createSellerAccount = async (req, res, next) => {
    try {
        const data = req.body;

        data.password = await hashing(data.password);

        const created = await authData.createSellerAccount(data);

        const response = await modifyUserInfo(created);

        return res.send(response);
    } catch (error) {
        next(createError(error.message));
    }
};

const updateSeller = async (req, res, next) => {
    try {
        const id = req.payload.id;
        if (!id) {
            return next(createError.InternalServerError('Cannot get id'));
        }

        const seller = await authData.readAccountById(id, 'seller');
        const updatedSeller = Object.assign(seller, req.body);

        if (req.file) {
            if (seller.image) {
                await fs.remove(`${process.cwd()}/public/images/profile/${seller.image}`);
            }

            updatedSeller.image = req.file.filename;
        }

        const response = await authData.updateSeller(updatedSeller);

        return res.send({
            data: {
                ...response,
                image: `${process.env.HOST_URL}/profile/${response.image}`,
            },
        });
    } catch (error) {
        next(createError(error.message));
    }
};

const sellerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const seller = await authData.readOneAccount(email, 'seller');

        if (!seller) {
            return next(createError.NotFound('Email address is not exist'));
        }

        const isPasswordValid = await compareHashing(password, seller.password);

        if (!isPasswordValid) {
            return next(createError.Unauthorized('Incorrect password'));
        }

        if (seller.image) {
            seller.image = `${process.env.HOST_URL}/profile/${seller.image}`;
        }

        const response = await modifyUserInfo(seller);

        return res.send(response);
    } catch (error) {
        next(createError(error.message));
    }
};

const customerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const customer = await authData.readOneAccount(email, 'customer');

        if (!customer) {
            return next(createError.NotFound('Email address is not exist'));
        }

        const isPasswordValid = await compareHashing(password, customer.password);

        if (!isPasswordValid) {
            return next(createError.Unauthorized('Incorrect password'));
        }

        if (customer.image) {
            customer.image = `${process.env.HOST_URL}/profile/${customer.image}`;
        }

        const response = await modifyUserInfo(customer);

        return res.send(response);
    } catch (error) {
        next(createError(error.message));
    }
};

const createCustomerAccount = async (req, res, next) => {
    try {
        const data = req.body;

        data.password = await hashing(data.password);

        const created = await authData.createCustomerAccount(data);

        const response = await modifyUserInfo(created);

        return res.send(response);
    } catch (error) {
        next(createError(error.message));
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const id = req.payload.id;
        if (!id) {
            return next(createError.InternalServerError('Cannot get id'));
        }

        const customer = await authData.readAccountById(id, 'customer');
        const updatedCustomer = Object.assign(customer, req.body);

        if (req.file) {
            if (customer.image) {
                await fs.remove(`${process.cwd()}/public/images/profile/${customer.image}`);
            }

            updatedCustomer.image = req.file.filename;
        }
        const response = await authData.updateCustomer(updatedCustomer);

        return res.send({
            data: {
                ...response,
                image: `${process.env.HOST_URL}/profile/${response.image}`,
            },
        });
    } catch (error) {
        next(createError(error.message));
    }
};

module.exports = {
    createSellerAccount,
    customerLogin,
    updateSeller,
    getCurrentUser,
    getNewAccessToken,
    customerLogin,
    sellerLogin,
    createCustomerAccount,
    updateCustomer,
};
