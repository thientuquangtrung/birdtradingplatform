const createError = require('http-errors');
const fs = require('fs-extra');

const authData = require('../services/auth');
const { hashing, compareHashing } = require('../utils/hash_utils');
const { modifyUserInfo } = require('../utils/response_modifiers');

const getCurrentUser = async (req, res, next) => {
    try {
        const id = req.payload.id;
        const currentUser = await authData.getCurrentUser(id);

        delete currentUser.password;

        return res.send(currentUser);
    } catch (error) {
        next(createError(error.status, error.message));
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
        next(createError(error.status, error.message));
    }
};

const updateSeller = async (req, res, next) => {
    try {
        const id = req.payload.id;
        if (!id) {
            return next(createError.InternalServerError('Cannot get id'));
        }

        const seller = await authData.readSellerById(id);
        if (seller.image) {
            await fs.remove(`${process.cwd()}/public/images/profile/${seller.image}`);
        }
        const updatedSeller = Object.assign(seller, {
            ...req.body,
            image: req.file.filename,
        });

        const response = await authData.updateSeller(updatedSeller);

        return res.send({
            data: {
                ...response,
                image: `${process.env.HOST_URL}/profile/${req.file.filename}`,
            },
        });
    } catch (error) {
        next(createError(error.status, error.message));
    }
};

const sellerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const seller = await authData.readOneSeller(email);

        if (!seller) {
            return next(createError.NotFound('Email address is not exist'));
        }

        const isPasswordValid = await compareHashing(password, seller.password);

        if (!isPasswordValid) {
            return next(createError.Unauthorized('Incorrect password'));
        }

        const response = await modifyUserInfo(seller);

        return res.send(response);
    } catch (error) {
        next(createError(error.status, error.message));
    }
};

module.exports = {
    createSellerAccount,
    sellerLogin,
    updateSeller,
    getCurrentUser,
};
