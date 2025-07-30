const express = require('express');
const router = express.Router();
const { getAdminProfile, updateAdminProfile } = require('../controllers/adminController');

// GET /api/admin/profile - Fetches the admin profile
router.get('/profile', getAdminProfile);

// PUT /api/admin/profile - Updates the admin profile
router.put('/profile', updateAdminProfile);

module.exports = router;
