// Load environment variables from .env file
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import Mongoose Models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');
const Brand = require('./models/Brand');
const Coupon = require('./models/Coupon');
const Transaction = require('./models/Transaction');
const Address = require('./models/Address');
const Content = require('./models/Content');

// MongoDB Connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nilgiris_db';

// Path to your consolidated data.json file
const dataFilePath = path.join(__dirname, 'data', 'data.json');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

// Function to read data from data.json
const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file:', err.message);
        return null;
    }
};

// Function to clear existing data
const clearData = async () => {
    console.log('Clearing existing data...');
    try {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});
        await Category.deleteMany({});
        await Brand.deleteMany({});
        await Coupon.deleteMany({});
        await Transaction.deleteMany({});
        await Address.deleteMany({});
        await Content.deleteMany({});
        console.log('All collections cleared.');
    } catch (err) {
        console.error('Error clearing data:', err.message);
    }
};

// Function to populate data
const populateData = async () => {
    const data = readData();
    if (!data) {
        console.error('No data to populate. Exiting.');
        mongoose.connection.close();
        return;
    }

    try {
        // Populate Users
        if (data.users && data.users.length > 0) {
            await User.insertMany(data.users);
            console.log(`Populated ${data.users.length} users.`);
        }

        // Populate Products
        if (data.products && data.products.length > 0) {
            // Convert price from string to number if your schema expects a Number type
            const productsToInsert = data.products.map(p => ({
                ...p,
                packageSizes: p.packageSizes.map(ps => ({
                    ...ps,
                    // Assuming price should be a Number in the DB for calculations
                    price: parseFloat(ps.price)
                }))
            }));
            await Product.insertMany(productsToInsert);
            console.log(`Populated ${data.products.length} products.`);
        }

        // Populate Orders
        if (data.orders && data.orders.length > 0) {
            await Order.insertMany(data.orders);
            console.log(`Populated ${data.orders.length} orders.`);
        }

        // Populate Categories
        if (data.categories && data.categories.length > 0) {
            await Category.insertMany(data.categories);
            console.log(`Populated ${data.categories.length} categories.`);
        }

        // Populate Brands
        if (data.brands && data.brands.length > 0) {
            await Brand.insertMany(data.brands);
            console.log(`Populated ${data.brands.length} brands.`);
        }

        // Populate Coupons
        if (data.coupons && data.coupons.length > 0) {
            await Coupon.insertMany(data.coupons);
            console.log(`Populated ${data.coupons.length} coupons.`);
        }

        // Populate Transactions
        if (data.transactions && data.transactions.length > 0) {
            await Transaction.insertMany(data.transactions);
            console.log(`Populated ${data.transactions.length} transactions.`);
        }

        // Populate Addresses
        if (data.addresses && data.addresses.length > 0) {
            await Address.insertMany(data.addresses);
            console.log(`Populated ${data.addresses.length} addresses.`);
        }

        // Populate Content (assuming there's only one content document)
        if (data.content) {
            await Content.create(data.content); // Use create for single document
            console.log('Populated content document.');
        }

        console.log('Data population complete!');
    } catch (err) {
        console.error('Error populating data:', err.message);
        // Log specific validation errors if available
        if (err.name === 'ValidationError') {
            for (field in err.errors) {
                console.error(`Validation Error for ${field}: ${err.errors[field].message}`);
            }
        } else if (err.code === 11000) {
            console.error('Duplicate key error:', err.message);
            console.error('This usually means an _id or unique field already exists.');
        }
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

// Main function to run the population script
const runPopulation = async () => {
    await connectDB();
    await clearData(); // Clear existing data before populating
    await populateData();
};

runPopulation();
