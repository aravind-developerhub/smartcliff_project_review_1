const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (requires authentication)
router.post('/', authMiddleware, orderController.createOrder);

// @route   GET /api/orders/:id (Optional, if you need to fetch a single order)
// @desc    Get order by ID
// @access  Private (Admin or owner)
// router.get('/:id', authMiddleware, orderController.getOrderById);

// @route   GET /api/orders (Optional, if you need to fetch all orders for admin)
// @desc    Get all orders
// @access  Private (Admin only)
// router.get('/', authMiddleware, orderController.getAllOrders);

module.exports = router;
