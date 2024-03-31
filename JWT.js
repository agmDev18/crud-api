require('dotenv').config()
const { sign, verify } = require('jsonwebtoken');

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

module.exports = {
    createTokens,
    validateToken
};