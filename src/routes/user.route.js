const express = require('express');

const { validateToken, checkCurrentUser } = require('../middleware/authenticateMiddleware');
const {
    register,
    login,
    logout,
    edit
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', validateToken, logout);
router.put('/edit', validateToken, checkCurrentUser, edit);

module.exports = router;