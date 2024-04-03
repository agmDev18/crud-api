require('dotenv').config()
const { sign, verify } = require('jsonwebtoken');

const User = require('../models/user.model');

const SECRET = process.env.SECRET

const createTokens = (user) => {
    const accessToken = sign({ email: user.email, id: user.id }, SECRET);
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token'];

    if (!accessToken) {
        res.status(400);
        throw new Error('user not authenticated');
    }

    try {
        const validToken = verify(accessToken, SECRET);
        if (validToken) {
            req.authenticate = true;
            return next();
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const checkCurrentUser = (req, res, next) => {
    const token = req.cookies['access-token'];

    if (token) {
        verify(token, SECRET, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                throw new Error(err.message);
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
};

module.exports = {
    createTokens,
    validateToken,
    checkCurrentUser
};