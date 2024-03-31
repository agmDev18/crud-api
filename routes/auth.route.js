const express = require('express');

const { validateToken } = require('../JWT');
const {
    register,
    login,
    logout
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', validateToken, logout);

module.exports = router;