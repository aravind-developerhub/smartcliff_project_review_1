const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// @route   POST /api/coupons
// @desc    Add a new coupon
// @access  Private (Admin only)
router.post('/', couponController.addCoupon);

// @route   PUT /api/coupons/:id
// @desc    Update an existing coupon
// @access  Private (Admin only)
router.put('/:id', couponController.updateCoupon);

// @route   DELETE /api/coupons/:id
// @desc    Delete a coupon
// @access  Private (Admin only)
router.delete('/:id', couponController.deleteCoupon);

module.exports = router;
