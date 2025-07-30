const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    _id: { type: String, alias: 'brandId' }, // Use 'brandId' from your mock data as _id
    name: { type: String, required: true, unique: true },
    logoUrl: { type: String },
    description: { type: String }
}, { collection: 'brands' });

BrandSchema.pre('save', function(next) {
    if (!this._id && this.brandId) {
        this._id = this.brandId;
    }
    next();
});

module.exports = mongoose.model('Brand', BrandSchema);