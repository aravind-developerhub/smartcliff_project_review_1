const mongoose = require('mongoose');

const PackageSizeSchema = new mongoose.Schema({
    packageSizeId: { type: String, required: true, unique: true },
    size: { type: String, required: true },
    price: { type: String, required: true }, // Storing as String as per mock data, consider converting to Number
    availableQuantity: { type: Number, required: true },
    minOrderQuantity: { type: Number, required: true },
    maxOrderQuantity: { type: Number, required: true }
}, { _id: false });

const ProductStatusSchema = new mongoose.Schema({
    none: { type: Number },
    wishlist: { type: Number },
    cart: { type: Number }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    _id: { type: String, alias: 'productId' }, // Use 'productId' from your mock data as _id
    brandId: { type: String, required: true }, // Reference to Brand collection
    productName: { type: String, required: true },
    productImage: { type: String },
    categoryName: { type: String, required: true }, // Consider referencing Category collection by ID
    description: { type: String },
    packageSizes: [PackageSizeSchema],
    barcode: { type: String },
    status: ProductStatusSchema,
    rating: { type: Number }
}, { collection: 'products' });

ProductSchema.pre('save', function(next) {
    if (!this._id && this.productId) {
        this._id = this.productId;
    }
    next();
});

module.exports = mongoose.model('Product', ProductSchema);