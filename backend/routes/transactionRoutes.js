const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Private (requires authentication)
router.post('/', authMiddleware, transactionController.createTransaction);

// You might have other routes here like GET /api/transactions for admin view
// router.get('/', authMiddleware, transactionController.getAllTransactions);

module.exports = router;
