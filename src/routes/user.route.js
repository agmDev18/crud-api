const express = require('express');

const { validateToken, checkCurrentUser } = require('../middleware/authenticateMiddleware');
const {
    register,
    login,
    logout,
    edit,
    deleteUser
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', validateToken, logout);
router.put('/edit', validateToken, checkCurrentUser, edit);
router.delete('/deleteUser', validateToken, checkCurrentUser, deleteUser);

module.exports = router;