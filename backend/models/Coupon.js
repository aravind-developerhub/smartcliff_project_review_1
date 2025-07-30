const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    _id: { type: String, alias: 'couponId' }, // Use 'couponId' from your mock data as _id
    code: { type: String, required: true, unique: true },
    minOrderAmount: { type: Number, required: true },
    validFrom: { type: Date, required: true }, // Convert from String to Date
    validTo: { type: Date, required: true }, // Convert from String to Date
    discountValue: { type: Number, required: true }
}, { collection: 'coupons' });

CouponSchema.pre('save', function(next) {
    if (!this._id && this.couponId) {
        this._id = this.couponId;
    }
    next();
});

module.exports = mongoose.model('Coupon', CouponSchema);