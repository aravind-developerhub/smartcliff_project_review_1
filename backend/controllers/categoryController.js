const Category = require('../models/Category');

/**
 * @desc Add a new category
 * @route POST /api/categories
 * @access Private (Admin only)
 */
exports.addCategory = async (req, res) => {
    try {
        const newCategoryData = {
            _id: req.body._id, // Use _id from frontend if provided, or let MongoDB generate
            ...req.body
        };

        const category = new Category(newCategoryData);
        await category.save();
        res.status(201).json(category); // 201 Created

    } catch (error) {
        console.error('Error adding category:', error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category with this ID or name already exists.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Update an existing category
 * @route PUT /api/categories/:id
 * @access Private (Admin only)
 */
exports.updateCategory = async (req, res) => {
    const { id } = req.params; // This 'id' is the MongoDB _id
    const updatedCategoryData = req.body;

    try {
        // Find the category by its existing name (if name is being changed)
        // Or directly by _id if that's what's passed in the URL
        // Assuming 'id' in URL is the MongoDB _id
        const category = await Category.findByIdAndUpdate(id, updatedCategoryData, { new: true, runValidators: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category updated successfully', category });

    } catch (error) {
        console.error('Error updating category:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Delete a category
 * @route DELETE /api/categories/:id
 * @access Private (Admin only)
 */
exports.deleteCategory = async (req, res) => {
    const { id } = req.params; // This 'id' is the MongoDB _id

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });

    } catch (error) {
        console.error('Error deleting category:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
