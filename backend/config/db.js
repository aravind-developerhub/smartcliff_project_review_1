const mongoose = require('mongoose');

// Replace with your MongoDB connection string
// Example: 'mongodb://localhost:27017/nilgiris_db'
// Or for Atlas: 'mongodb+srv://<username>:<password>@<cluster-url>/nilgiris_db?retryWrites=true&w=majority'
const dbURI = 'YOUR_MONGODB_CONNECTION_STRING_HERE'; // !!! IMPORTANT: REPLACE THIS !!!

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Deprecated in Mongoose 6.x
            // useFindAndModify: false // Deprecated in Mongoose 6.x
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
