const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   PUT /api/products/:productId/package-size/:packageSizeId
// @desc    Update stock for a specific package size of a product
// @access  Private (Admin only)
router.put('/:productId/package-size/:packageSizeId', productController.updateProductStock);

// @route   POST /api/products
// @desc    Add a new product
// @access  Private (Admin only)
router.post('/', productController.addProduct);

// @route   PUT /api/products/:id
// @desc    Update an existing product (full product update)
// @access  Private (Admin only)
router.put('/:id', productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
