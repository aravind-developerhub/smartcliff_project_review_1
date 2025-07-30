const Brand = require('../models/Brand'); // Assuming you have a Brand Mongoose model

/**
 * @desc Add a new brand
 * @route POST /api/brands
 * @access Private (Admin only)
 */
exports.addBrand = async (req, res) => {
    try {
        const newBrandData = {
            _id: req.body._id, // Use _id from frontend if provided, or let MongoDB generate
            ...req.body
        };

        const brand = new Brand(newBrandData);
        await brand.save();
        res.status(201).json(brand); // 201 Created

    } catch (error) {
        console.error('Error adding brand:', error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Brand with this ID or name already exists.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Update an existing brand
 * @route PUT /api/brands/:id
 * @access Private (Admin only)
 */
exports.updateBrand = async (req, res) => {
    const { id } = req.params; // This 'id' is the MongoDB _id
    const updatedBrandData = req.body;

    try {
        const brand = await Brand.findByIdAndUpdate(id, updatedBrandData, { new: true, runValidators: true });

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.json({ message: 'Brand updated successfully', brand });

    } catch (error) {
        console.error('Error updating brand:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Delete a brand
 * @route DELETE /api/brands/:id
 * @access Private (Admin only)
 */
exports.deleteBrand = async (req, res) => {
    const { id } = req.params; // This 'id' is the MongoDB _id

    try {
        const brand = await Brand.findByIdAndDelete(id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.json({ message: 'Brand deleted successfully' });

    } catch (error) {
        console.error('Error deleting brand:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
