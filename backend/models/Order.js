const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    orderItemId: { type: String, required: true, unique: true },
    productId: { type: String, required: true }, // Reference to Product collection
    purchasedQuantity: { type: Number, required: true },
    selectedSize: { type: String },
    price: { type: Number, required: true },
    name: { type: String, required: true }
}, { _id: false });

const ShippingDetailsSchema = new mongoose.Schema({
    shippingDetailsId: { type: String, required: true, unique: true },
    addressId: { type: String, required: true }, // Reference to Address collection
    carrier: { type: String },
    trackingNumber: { type: String },
    estimatedDelivery: { type: Date } // Convert from String to Date
}, { _id: false });

const PaymentDetailsSchema = new mongoose.Schema({
    paymentDetailsId: { type: String, required: true, unique: true },
    method: { type: String, required: true },
    cardLastFour: { type: String },
    transactionId: { type: String }, // Reference to Transaction collection
    upiId: { type: String },
    bankReference: { type: String },
    refundId: { type: String },
    collected: { type: Boolean } // For COD
}, { _id: false });

const OrderSchema = new mongoose.Schema({
    _id: { type: String, alias: 'orderId' }, // Use 'orderId' from your mock data as _id
    customerId: { type: String, required: true }, // Reference to User collection
    status: { type: String, required: true },
    orderDate: { type: Date, required: true }, // Convert from String to Date
    deliveryDate: { type: Date }, // Convert from String to Date
    items: [OrderItemSchema],
    shipping: ShippingDetailsSchema,
    payment: PaymentDetailsSchema,
    couponCode: { type: String }, // Reference to Coupon collection
    totalAmount: { type: Number, required: true },
    cancellationReason: { type: String },
    returnDate: { type: Date }, // Convert from String to Date
    returnReason: { type: String }
}, { collection: 'orders' });

OrderSchema.pre('save', function(next) {
    if (!this._id && this.orderId) {
        this._id = this.orderId;
    }
    next();
});

module.exports = mongoose.model('Order', OrderSchema);