const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    customerId: { type: String, required: true },
    startTime: { type: Number, required: true }
}, { _id: false });

const CustomerDataSchema = new mongoose.Schema({
    customerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    gender: { type: String },
    defaultAddressId: { type: String } // Reference to Address collection
}, { _id: false });

const CartItemSchema = new mongoose.Schema({
    cartItemId: { type: String, required: true, unique: true },
    productId: { type: String, required: true }, // Reference to Product collection
    selectedQuantity: { type: Number, required: true },
    selectedSize: { type: String }
}, { _id: false });

const WishlistItemSchema = new mongoose.Schema({
    wishlistItemId: { type: String, required: true, unique: true },
    productId: { type: String, required: true }, // Reference to Product collection
    selectedSize: { type: String }
}, { _id: false });

const UserSchema = new mongoose.Schema({
    _id: { type: String, alias: 'id' }, // Use 'id' from your mock data as _id
    role: { type: String, required: true, enum: ['customer', 'admin'] },
    session: SessionSchema,
    customerData: CustomerDataSchema,
    cartItems: [CartItemSchema],
    wishlistItems: [WishlistItemSchema],
    orders: [String] // Array of Order IDs
}, { collection: 'users' }); // Specify collection name

UserSchema.pre('save', function(next) {
    if (!this._id && this.id) {
        this._id = this.id;
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);