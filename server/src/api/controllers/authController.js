const createError = require('http-errors');
const fs = require('fs-extra');

const authData = require('../services/auth');
const { hashing, compareHashing } = require('../utils/hash_utils');
const { modifyUserInfo } = require('../utils/response_modifiers');
const { signAccessToken } = require('../utils/jwt_utils');
const { deleteImage, uploadImage } = require('../services/firebase');

const getAccounts = async (req, res, next) => {
    try {
        const result = await authData.getAccounts(req.query);
        if (result.length > 0) {
            result.forEach((account) => {
                account.image = `${process.env.HOST_URL}/profile/${account.image}`;
            });
        }
        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAccountById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const account = await authData.getAccountById({ id, ...req.query });

        const data = {
            ...account,
            image: account.image && `${process.env.HOST_URL}/profile/${account.image}`,
        };
        return res.send({
            status: 200,
            message: 'OK',
            data,
        });
    } catch (error) {
        next(error);
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        await authData.deleteAccount(req.params.id, req.query.bannedId);

        res.send({
            status: 200,
            message: 'OK',
        });
    } catch (error) {
        next(error);
    }
};

const getBanReason = async (req, res, next) => {
    try {
        const list = await authData.getBanReason(req.params.role);

        return res.send({
            status: 200,
            message: 'OK',
            data: list,
        });
    } catch (error) {
        next(error);
    }
};

const createNewAccount = async (req, res, next) => {
    try {
        req.body.password = await hashing(req.body.password);
        await authData.createNewAccount({ ...req.body, image: req.file });
        res.send({
            status: 200,
            message: 'OK',
        });
    } catch (error) {
        next(error);
    }
};

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
        next(error);
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
        next(error);
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
        next(error);
    }
};

const updateSeller = async (req, res, next) => {
    try {
        const id = req.payload.id;
        if (!id) {
            return next(createError.InternalServerError('Cannot get id'));
        }

        if (req.body.profile || req.body.image) {
            delete req.body?.profile;
            delete req.body?.image;
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
        next(error);
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
        next(error);
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
        next(error);
    }
};

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await authData.readOneAccount(email, 'admin');
        console.log(admin);
        if (!admin) {
            return next(createError.NotFound('Email address is not exist'));
        }

        const isPasswordValid = password === admin.password.trim();

        if (!isPasswordValid) {
            return next(createError.Unauthorized('Incorrect password'));
        }

        if (admin.image) {
            admin.image = `${process.env.HOST_URL}/profile/${admin.image}`;
        }

        const response = await modifyUserInfo(admin);

        return res.send(response);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const id = req.payload.id;
        if (!id) {
            return next(createError.BadRequest('Id not found'));
        }

        const customer = await authData.readAccountById(id, 'customer');
        if (req.file) {
            if (customer.image) {
                await deleteImage(customer.image);
            }
            req.body.image = await uploadImage({ file: req.file, folder: 'profile', prefix: 'profile' });
        } else {
            delete req.body.image;
            delete req.body.profile;
        }

        const updatedCustomer = Object.assign(customer, req.body);
        const response = await authData.updateCustomer(updatedCustomer);

        return res.send({
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const updateAccountByAdmin = async (req, res, next) => {
    try {
        const foundAccount = await authData.readAccountById(req.body.id, req.body.role);
        if (!foundAccount) createError.BadRequest('Cannot find account');

        const response = await authData.updateAccountByAdmin(req.body);

        return res.send({
            status: 200,
            message: 'OK',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const result = await authData.changePassword(req.body);

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const verifyPassword = async (req, res, next) => {
    try {
        const result = await authData.verifyPassword(req.body);

        return res.send({
            status: 200,
            message: 'OK',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const sendResetLinkMail = async (req, res, next) => {
    try {
        if (!req.body.email) {
            next(createError.BadRequest('Lack of email address'));
        }
        const result = await authData.sendResetLinkMail(req.body.email);

        res.send({
            status: 200,
            message: 'Reset link has been sent',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, token, password } = req.body;
        if (!email || !token || !password) {
            next(createError.BadRequest('Lack of information'));
        }
        const result = await authData.resetPassword(req.body);

        res.send({
            status: 200,
            message: 'Reset link has been sent',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const generateOtp = async (req, res, next) => {
    try {
        const email = req.body.email;
        const result = await authData.generateOtp(email);

        res.send({
            status: 200,
            message: 'OTP has been sent via email',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const result = await authData.verifyOtp(req.body);

        res.send({
            status: 200,
            message: 'Verified OTP successfully',
            data: result,
        });
    } catch (error) {
        next(error);
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
    adminLogin,
    getAccounts,
    updateAccountByAdmin,
    deleteAccount,
    createNewAccount,
    getAccountById,
    changePassword,
    sendResetLinkMail,
    resetPassword,
    getBanReason,
    verifyPassword,
    generateOtp,
    verifyOtp,
};
