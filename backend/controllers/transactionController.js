const Transaction = require('../models/Transaction');
const Order = require('../models/Order'); // To update order status if needed

/**
 * @desc Create a new transaction
 * @route POST /api/transactions
 * @access Private
 */
exports.createTransaction = async (req, res) => {
    try {
        const { orderId, customerId, amount, paymentMethod, status, paymentDetails } = req.body;

        // Basic validation
        if (!orderId || !customerId || amount === undefined || !paymentMethod || !status) {
            return res.status(400).json({ message: 'Missing required transaction fields.' });
        }

        // Generate a unique _id for the transaction
        const newTransactionId = `trans-${Date.now()}`;

        const newTransaction = new Transaction({
            _id: newTransactionId,
            orderId,
            customerId,
            amount: Number(amount),
            paymentMethod,
            status,
            timestamp: new Date().toISOString(),
            paymentDetails: paymentDetails || {},
        });

        const savedTransaction = await newTransaction.save();

        // Optional: Update the associated order's status based on transaction outcome
        const order = await Order.findById(orderId);
        if (order) {
            // Example: If transaction is successful, set order status to 'paid' or 'processing'
            if (status === 'success') {
                order.status = 'processing'; // Or 'paid', 'confirmed'
            } else if (status === 'refunded') {
                order.status = 'refunded';
            } else if (status === 'pending' && order.status !== 'cancelled' && order.status !== 'returned') {
                order.status = 'pending_payment'; // Or similar
            }
            await order.save();
        }

        res.status(201).json({ message: 'Transaction created successfully', transaction: savedTransaction });

    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
