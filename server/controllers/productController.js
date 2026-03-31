const Product = require('../models/Product');

// @desc  Get all products
// @route GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ inStock: true });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single product
// @route GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc  Create product (admin)
// @route POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct };
