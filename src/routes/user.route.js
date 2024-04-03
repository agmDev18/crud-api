const express = require('express');

const { validateToken } = require('../middleware/authenticateMiddleware');
const {
    register,
    login,
    logout
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', validateToken, logout);

module.exports = router;