const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    _id: { type: String, alias: 'addressId' }, // Use 'addressId' from your mock data as _id
    customerId: { type: String, required: true }, // Reference to User collection
    type: { type: String, required: true, enum: ['home', 'work', 'other'] },
    street: { type: String, required: true },
    apt: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
}, { collection: 'addresses' });

AddressSchema.pre('save', function(next) {
    if (!this._id && this.addressId) {
        this._id = this.addressId;
    }
    next();
});

module.exports = mongoose.model('Address', AddressSchema);