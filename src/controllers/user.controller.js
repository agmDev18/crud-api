const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const { createTokens } = require('../middleware/authenticateMiddleware');
const User = require('../models/user.model')

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
            const user = User.create({
                name: name,
                email: email,
                password: hash
            })
        })
            .then(() => {
                res.status(200).json('user registered')
            });

        return
    }

    res.status(400);
    throw new Error(`user already exists`);
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(400);
        throw new Error(`user doesn't exist`)
    }

    const dbPassword = user.password;

    const match = await bcrypt.compare(password, dbPassword)
    if (!match) {
        res.status(400);
        throw new Error('Email or passowrd is wrong');
    }

    const accessToken = createTokens(user);

    res.cookie('access-token', accessToken, {
        maxAge: 600000
    });

    res.status(200).json('logged in');
});

const logout = asyncHandler((req, res) => {
    try {
        res.cookie('access-token', '');
        res.status(200).json('logged out');
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {
    register,
    login,
    logout
}