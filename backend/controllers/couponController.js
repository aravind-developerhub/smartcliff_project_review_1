const Coupon = require('../models/Coupon');

/**
 * @desc Add a new coupon
 * @route POST /api/coupons
 * @access Private (Admin only)
 */
exports.addCoupon = async (req, res) => {
    try {
        const newCouponData = {
            _id: req.body._id, // Use _id from frontend if provided, or let MongoDB generate
            ...req.body
        };

        // Ensure date strings are converted to Date objects if your schema expects Date
        if (newCouponData.validFrom) {
            newCouponData.validFrom = new Date(newCouponData.validFrom);
        }
        if (newCouponData.validTo) {
            newCouponData.validTo = new Date(newCouponData.validTo);
        }

        const coupon = new Coupon(newCouponData);
        await coupon.save();
        res.status(201).json(coupon); // 201 Created

    } catch (error) {
        console.error('Error adding coupon:', error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Coupon with this ID or code already exists.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Update an existing coupon
 * @route PUT /api/coupons/:id
 * @access Private (Admin only)
 */
exports.updateCoupon = async (req, res) => {
    const { id } = req.params;
    const updatedCouponData = req.body;

    try {
        // Ensure date strings are converted to Date objects if your schema expects Date
        if (updatedCouponData.validFrom) {
            updatedCouponData.validFrom = new Date(updatedCouponData.validFrom);
        }
        if (updatedCouponData.validTo) {
            updatedCouponData.validTo = new Date(updatedCouponData.validTo);
        }

        const coupon = await Coupon.findByIdAndUpdate(id, updatedCouponData, { new: true, runValidators: true });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.json({ message: 'Coupon updated successfully', coupon });

    } catch (error) {
        console.error('Error updating coupon:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Delete a coupon
 * @route DELETE /api/coupons/:id
 * @access Private (Admin only)
 */
exports.deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        const coupon = await Coupon.findByIdAndDelete(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.json({ message: 'Coupon deleted successfully' });

    } catch (error) {
        console.error('Error deleting coupon:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
