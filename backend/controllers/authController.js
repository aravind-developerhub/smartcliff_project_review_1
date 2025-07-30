// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model is in models/User.js
const { jwtSecret, jwtExpiration } = require('../config/jwt');

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
exports.register = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        let user = await User.findOne({ 'customerData.email': email });

        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUserId = `user-${Date.now()}`; // Generate a unique ID for new user
        user = new User({
            _id: newUserId,
            role: role || 'customer', // Default to 'customer' if not provided
            password: hashedPassword, // Store the hashed password
            customerData: {
                customerId: newUserId, // Use the same _id for customerId
                name: name,
                email: email,
                // Other customerData fields can be added here if provided in registration
            },
            // Initialize other arrays/objects as empty if your schema requires them
            orders: [],
            cartItems: [],
            wishlistItems: [],
            session: {},
        });

        await user.save();

        // Generate JWT token for immediate login after registration
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: jwtExpiration },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ message: 'User registered successfully', token, role: user.role, userId: user._id });
            }
        );

    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Authenticate user & get token (Login via OTP Simulation)
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res) => {
    // For OTP-based login, we expect email (or mobile) and the OTP itself.
    // The 'password' field from the frontend will be ignored for verification here.
    const { emailOrMobile, otp } = req.body; // Expect emailOrMobile and OTP

    try {
        // --- SIMULATED OTP VERIFICATION ---
        // In a real application, you would:
        // 1. Have a mechanism to send OTPs (e.g., Twilio, Firebase Auth).
        // 2. Store the generated OTP temporarily (e.g., in a cache, or a temporary field in the User model with an expiry).
        // 3. Compare the received 'otp' with the stored, valid OTP for the given 'emailOrMobile'.
        // For this demonstration, we'll simply check if the OTP is '123456' for any user.
        if (!otp || otp !== '123456') { // Hardcoded OTP for simulation
            return res.status(401).json({ message: 'Invalid OTP' });
        }
        // --- END SIMULATED OTP VERIFICATION ---

        // Find the user by email (assuming emailOrMobile is an email for simplicity here)
        // You might need more complex logic if it can be both email or mobile
        let user = await User.findOne({ 'customerData.email': emailOrMobile });

        if (!user) {
            return res.status(400).json({ message: 'User not found with this email/mobile.' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };
        console.log('first');
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: jwtExpiration },
            (err, token) => {
                if (err) throw err;
                // Send the token, role, and userId back to the frontend
                res.json({ message: 'Login successful', token, role: user.role, userId: user._id });
            }
        );
        console.log('second');

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};