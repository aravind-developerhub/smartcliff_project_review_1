const mongoose = require('mongoose');

// Define a flexible PaymentDetailsSchema as it varies by method
const PaymentDetailsSchema = new mongoose.Schema({
    authorizationCode: { type: String },
    upiReference: { type: String },
    bankReference: { type: String },
    refundId: { type: String },
    collected: { type: Boolean }
}, { _id: false, strict: false }); // `strict: false` allows fields not defined in the schema

const TransactionSchema = new mongoose.Schema({
    _id: { type: String, alias: 'transactionId' }, // Use 'transactionId' from your mock data as _id
    orderId: { type: String, required: true }, // Reference to Order collection
    customerId: { type: String, required: true }, // Reference to User collection
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    timestamp: { type: Date, required: true }, // Convert from Number (milliseconds) to Date
    paymentDetails: PaymentDetailsSchema
}, { collection: 'transactions' });

TransactionSchema.pre('save', function(next) {
    if (!this._id && this.transactionId) {
        this._id = this.transactionId;
    }
    next();
});

module.exports = mongoose.model('Transaction', TransactionSchema);