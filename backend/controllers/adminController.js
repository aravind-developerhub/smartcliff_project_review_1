// const User = require('../models/User');

// /**
//  * @desc    Get admin profile
//  * @route   GET /api/admin/profile
//  * @access  Public (Not Secure)
//  * This function fetches the profile of the admin user.
//  * It finds the first user with the role 'admin'.
//  */
// const getAdminProfile = async (req, res) => {
//     try {
//         // NOTE: This is insecure. It finds the first user with the 'admin' role.
//         const admin = await User.findOne({ role: 'admin' }).select('-password');

//         if (admin) {
//             res.json(admin);
//         } else {
//             res.status(404).json({ message: 'Admin user not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching admin profile:', error);
//         res.status(500).json({ message: 'Server error while fetching profile.' });
//     }
// };

// /**
//  * @desc    Update admin profile
//  * @route   PUT /api/admin/profile
//  * @access  Public (Not Secure)
//  * This function updates the admin's name, email, or password.
//  */
// const updateAdminProfile = async (req, res) => {
//     try {
//         // NOTE: This is insecure. It finds the first user with the 'admin' role to update.
//         const admin = await User.findOne({ role: 'admin' });

//         if (admin) {
//             // Update fields if they are provided in the request body
//             admin.name = req.body.name || admin.name;
//             admin.email = req.body.email || admin.email;

//             // If a new password is provided, it will be hashed by the pre-save middleware in the User model
//             if (req.body.password) {
//                 admin.password = req.body.password;
//             }

//             const updatedAdmin = await admin.save();

//             // Return the updated admin details, excluding the password
//             res.json({
//                 _id: updatedAdmin._id,
//                 name: updatedAdmin.name,
//                 email: updatedAdmin.email,
//                 role: updatedAdmin.role,
//             });
//         } else {
//             res.status(404).json({ message: 'Admin user not found' });
//         }
//     } catch (error) {
//         console.error('Error updating admin profile:', error);
//         res.status(500).json({ message: 'Server error while updating profile.' });
//     }
// };

// module.exports = { getAdminProfile, updateAdminProfile };
const User = require('../models/User');

/**
 * @desc    Get admin profile
 * @route   GET /api/admin/profile
 * @access  Public (Not Secure)
 */
const getAdminProfile = async (req, res) => {
    // --- DEBUGGING STEP 1 ---
    // This log will appear in your backend terminal (where you run "node server.js")
    // if the API route is being hit correctly.
    console.log('--- Attempting to get admin profile ---');

    try {
        // This query looks for a document in the "users" collection
        // where the 'role' field is exactly the string 'admin'.
        const admin = await User.findOne({ role: 'admin' }).select('-password');

        // --- DEBUGGING STEP 2 ---
        // This will show us what the database returned.
        console.log('Database query result:', admin);

        if (admin) {
            console.log('Admin found. Sending data to frontend.');
            res.json(admin);
        } else {
            console.log('Admin with role "admin" NOT FOUND in the database.');
            res.status(404).json({ message: 'Admin user not found in database' });
        }
    } catch (error) {
        console.error('SERVER ERROR while fetching admin profile:', error);
        res.status(500).json({ message: 'Server error while fetching profile.' });
    }
};

/**
 * @desc    Update admin profile
 * @route   PUT /api/admin/profile
 * @access  Public (Not Secure)
 */
const updateAdminProfile = async (req, res) => {
    console.log('--- Attempting to UPDATE admin profile ---');
    try {
        const admin = await User.findOne({ role: 'admin' });

        if (admin) {
            admin.name = req.body.name || admin.name;
            admin.email = req.body.email || admin.email;
            if (req.body.password) {
                admin.password = req.body.password;
            }
            const updatedAdmin = await admin.save();
            console.log('Admin profile updated successfully.');
            res.json({
                _id: updatedAdmin._id,
                name: updatedAdmin.name,
                email: updatedAdmin.email,
                role: updatedAdmin.role,
            });
        } else {
            console.log('Update failed: Admin with role "admin" NOT FOUND.');
            res.status(404).json({ message: 'Admin user not found' });
        }
    } catch (error) {
        console.error('SERVER ERROR while updating admin profile:', error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
};

module.exports = { getAdminProfile, updateAdminProfile };
