const express = require('express');

const { validateToken } = require('../middleware/authenticateMiddleware');

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/products', validateToken, getProducts);
router.get('/products/:id', validateToken, getProductById);
router.post('/products', validateToken, createProduct);
router.put('/products/:id', validateToken, updateProduct);
router.delete('/products/:id', validateToken, deleteProduct);

module.exports = router;
