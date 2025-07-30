require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const dashboardRoutes = require('./routes/dashboardRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const couponRoutes = require('./routes/couponRoutes'); // Import coupon routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes
const brandRoutes = require('./routes/brandRoutes'); // Import brand routes
const contentRoutes = require('./routes/contentRoutes'); // Import content routes
const orderRoutes = require('./routes/orderRoutes'); // Corrected import
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const adminRoutes = require('./routes/adminRoutes');



const app = express();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};
connectDB();

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable CORS for all origins (for development, restrict in production)

// Add this line to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// Define API routes
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes); // Use product routes
app.use('/api/coupons', couponRoutes); // Add coupon routes here
app.use('/api/categories', categoryRoutes); // Add category routes here
app.use('/api/brands', brandRoutes); // Add brand routes here
app.use('/api/content', contentRoutes); // Add content routes here

app.use('/api/transactions', transactionRoutes); // Use transaction routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/admin', adminRoutes);


// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
