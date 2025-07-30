const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// @route   POST /api/brands
// @desc    Add a new brand
// @access  Private (Admin only)
router.post('/', brandController.addBrand);

// @route   PUT /api/brands/:id
// @desc    Update an existing brand
// @access  Private (Admin only)
router.put('/:id', brandController.updateBrand);

// @route   DELETE /api/brands/:id
// @desc    Delete a brand
// @access  Private (Admin only)
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
