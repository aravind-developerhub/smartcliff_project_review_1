const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// @route   PUT /api/content/:id
// @desc    Update the main content document (including banners, flash cards, social links)
// @access  Private (Admin only)
router.put('/:id', contentController.updateContent);

// @route   GET /api/content/:id (Optional, but good for specific content fetching if needed)
// @desc    Get a specific content document
// @access  Public (or Private if restricted)
router.get('/:id', contentController.getContentById);

module.exports = router;
