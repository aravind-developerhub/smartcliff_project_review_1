const Content = require('../models/Content'); // Assuming you have a Content Mongoose model

/**
 * @desc Get a specific content document by ID
 * @route GET /api/content/:id
 * @access Public (or Private if restricted)
 */
exports.getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        console.error('Error fetching content:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Update the main content document
 * @route PUT /api/content/:id
 * @access Private (Admin only)
 */
exports.updateContent = async (req, res) => {
    const { id } = req.params; // This 'id' is the MongoDB _id (likely "1")
    const updatedContentData = req.body;

    try {
        // Ensure date fields are correctly handled if they are part of the update
        // For example, if 'updatedAt' is sent from frontend, ensure it's a Date object
        if (updatedContentData.updatedAt) {
            updatedContentData.updatedAt = new Date(updatedContentData.updatedAt);
        }

        // Find and update the content document.
        // { new: true } returns the updated document.
        // { runValidators: true } runs schema validators on the update operation.
        const content = await Content.findByIdAndUpdate(id, updatedContentData, { new: true, runValidators: true });

        if (!content) {
            return res.status(404).json({ message: 'Content document not found' });
        }

        res.json({ message: 'Content updated successfully', content });

    } catch (error) {
        console.error('Error updating content:', error.message);
        // Mongoose validation errors might have a 'name' property of 'ValidationError'
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
