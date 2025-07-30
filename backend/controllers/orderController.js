const Order = require('../models/Order');
const User = require('../models/User'); // To update user's orders array
const Product = require('../models/Product'); // To validate product prices (optional but recommended)

/**
 * @desc Create a new order
 * @route POST /api/orders
 * @access Private
 */
exports.createOrder = async (req, res) => {
    try {
        const { customerId, items, shipping, payment, couponCode, totalAmount } = req.body;

        // Basic validation
        if (!customerId || !items || items.length === 0 || !shipping || !payment || totalAmount === undefined) {
            return res.status(400).json({ message: 'Missing required order fields.' });
        }

        // Validate items and ensure prices/quantities are correct
        const validatedItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ message: `Product with ID ${item.productId} not found.` });
            }
            const selectedPackage = product.packageSizes.find(p => p.size === item.selectedSize);
            if (!selectedPackage || parseFloat(selectedPackage.price) !== Number(item.price)) {
                return res.status(400).json({ message: `Price mismatch for product ${product.productName} size ${item.selectedSize}.` });
            }
            if (item.purchasedQuantity <= 0 || item.purchasedQuantity > selectedPackage.availableQuantity) {
                return res.status(400).json({ message: `Invalid quantity for product ${product.productName}.` });
            }

            validatedItems.push({
                orderItemId: item.orderItemId || `orderItem-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                productId: item.productId,
                purchasedQuantity: Number(item.purchasedQuantity),
                selectedSize: item.selectedSize,
                price: Number(item.price),
                name: product.productName, // Use product name from DB for consistency
                image: product.productImage, // Use image from DB
            });
        }

        const newOrderId = `order-${Date.now()}`;

        const newOrder = new Order({
            _id: newOrderId,
            customerId,
            status: 'confirmed', // Initial status, can be updated by transaction
            orderDate: new Date().toISOString(),
            items: validatedItems,
            shipping: {
                addressId: shipping.addressId,
                carrier: shipping.carrier || 'Standard Shipping',
                trackingNumber: shipping.trackingNumber || `TRACK${Date.now()}`,
                estimatedDelivery: shipping.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            payment: {
                method: payment.method,
                // Add other payment details if your Order schema stores them
            },
            couponCode,
            totalAmount: Number(totalAmount),
        });

        const savedOrder = await newOrder.save();

        // Update the user's orders array
        const user = await User.findById(customerId);
        if (user) {
            if (!user.orders) {
                user.orders = [];
            }
            user.orders.push(savedOrder._id);
            await user.save();
        } else {
            console.warn(`User with ID ${customerId} not found for order update.`);
        }

        res.status(201).json({ message: 'Order created successfully', order: savedOrder });

    } catch (error) {
        console.error('Error creating order:', error.message);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
