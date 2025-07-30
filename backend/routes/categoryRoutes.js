const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// @route   POST /api/categories
// @desc    Add a new category
// @access  Private (Admin only)
router.post('/', categoryController.addCategory);

// @route   PUT /api/categories/:id
// @desc    Update an existing category
// @access  Private (Admin only)
router.put('/:id', categoryController.updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete a category
// @access  Private (Admin only)
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
