const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
       throw new Error(error.message)
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404);
            throw new Error('product not found');
        }
        res.status(404).json(product);
    } catch (error) {
        throw new Error(error.message)
    }
});

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        throw new Error(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404);
            throw new Error('product not found');
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        throw new Error(error.message)
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404);
            throw new Error('product not found');
        }
        res.status(200).json(product);
    } catch (error) {
        throw new Error(error.message)
    }
});
module.exports = {
    getProducts,
    getProductById,
    createProduct, 
    updateProduct,
    deleteProduct
}