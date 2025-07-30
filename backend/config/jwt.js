// backend/config/jwt.js

// This file defines the JWT secret and expiration time.
// It's crucial to keep your jwtSecret secure and ideally load it from environment variables.

module.exports = {
    // The secret key used to sign and verify JWTs.
    // Changed from JWT_SECRET to jwtSecret to match the import in authController.js
    // For production, this should be loaded from environment variables (e.g., process.env.JWT_SECRET).
    jwtSecret: '5b9e7d2a1c8f4e6b0a3d5c7f9e1b8a0d4c6e2f8a7b9c1d0e3f5a7b9c1d0e3f5a', // <-- CHANGE THIS LINE

    // The expiration time for the JWT.
    // '1h' means 1 hour, '7d' means 7 days, etc.
    // This determines how long a user's session remains valid without re-logging in.
    jwtExpiration: '1h' // <-- Also changed for consistency, though JWT_EXPIRES_IN would also work if imported as such
};
