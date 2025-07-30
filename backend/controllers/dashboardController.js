const User = require('../models/User');
const Product = require('..//models/Product');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Coupon = require('../models/Coupon');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Address = require('../models/Address');
const Content = require('../models/Content');


/**
 * @desc Get dashboard statistics (summary)
 * @route GET /api/admin/dashboard/stats
 * @access Private (Admin only)
 */
exports.getDashboardStats = async (req, res) => {
    try {
        // Total Users
        const totalUsers = await User.countDocuments();

        // Total Products
        const totalProducts = await Product.countDocuments();

        // Total Orders
        const totalOrders = await Order.countDocuments();

        // Order Status Counts
        const orderStatusCounts = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedOrderStatusCounts = {};
        orderStatusCounts.forEach(status => {
            formattedOrderStatusCounts[status._id] = status.count;
        });

        // Total Revenue (sum of totalAmount for 'delivered' orders)
        const totalRevenueResult = await Order.aggregate([
            {
                $match: { status: 'delivered' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' }
                }
            }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

        // Active Coupons (validTo date is in the future or today)
        const activeCoupons = await Coupon.countDocuments({
            validTo: { $gte: new Date() }
        });

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            orderStatusCounts: formattedOrderStatusCounts,
            totalRevenue,
            activeCoupons
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Get all consolidated data for the dashboard
 * @route GET /api/admin/dashboard/all-data
 * @access Private (Admin only)
 */
exports.getAllDashboardData = async (req, res) => {
    try {
        // Fetch all data from respective collections
        const users = await User.find({});
        const products = await Product.find({});
        const orders = await Order.find({});
        const categories = await Category.find({});
        const brands = await Brand.find({});
        const coupons = await Coupon.find({});
        const transactions = await Transaction.find({});
        const addresses = await Address.find({});
        const content = await Content.findOne({}); // Assuming there's only one content document

        // Transform arrays of documents into objects keyed by their _id for easy lookup
        // This mimics the structure of your mock API data (e.g., apiData.users.user1)
        const usersMap = users.reduce((acc, user) => {
            acc[user._id] = user.toObject(); // .toObject() converts Mongoose document to plain JS object
            return acc;
        }, {});

        const productsMap = products.reduce((acc, product) => {
            acc[product._id] = product.toObject();
            return acc;
        }, {});

        const ordersMap = orders.reduce((acc, order) => {
            acc[order._id] = order.toObject();
            return acc;
        }, {});

        const categoriesMap = categories.reduce((acc, category) => {
            acc[category._id] = category.toObject();
            return acc;
        }, {});

        const brandsMap = brands.reduce((acc, brand) => {
            acc[brand._id] = brand.toObject();
            return acc;
        }, {});

        const couponsMap = coupons.reduce((acc, coupon) => {
            acc[coupon._id] = coupon.toObject();
            return acc;
        }, {});

        const transactionsMap = transactions.reduce((acc, transaction) => {
            acc[transaction._id] = transaction.toObject();
            return acc;
        }, {});

        const addressesMap = addresses.reduce((acc, address) => {
            acc[address._id] = address.toObject();
            return acc;
        }, {});

        // Construct the single object that mimics your mock API's data[0] structure
        const consolidatedData = {
            users: usersMap,
            products: productsMap,
            orders: ordersMap,
            categories: categoriesMap,
            brands: brandsMap,
            coupons: couponsMap,
            transactions: transactionsMap,
            addresses: addressesMap,
            content: content ? content.toObject() : null // Handle case where content might not exist
        };

        // Wrap it in an array to match the `data[0]` access in frontend
        res.json([consolidatedData]);

    } catch (error) {
        console.error('Error fetching all dashboard data:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
