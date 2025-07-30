const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware


// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only - will add middleware later)
router.get('/stats', dashboardController.getDashboardStats);
// router.get('/stats', authMiddleware, dashboardController.getDashboardStats);

// @route   GET /api/admin/dashboard/all-data
// @desc    Get all data for dashboard (users, products, orders, etc.)
// @access  Private (Admin only)
router.get('/all-data', dashboardController.getAllDashboardData);
// router.get('/all-data', authMiddleware, dashboardController.getAllDashboardData);

module.exports = router;
