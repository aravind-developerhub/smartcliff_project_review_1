const Product = require('../models/Product');
const Category = require('../models/Category'); // Needed to get category description
const Brand = require('../models/Brand'); // Needed to get brand details

/**
 * @desc Update stock for a specific package size of a product
 * @route PUT /api/products/:productId/package-size/:packageSizeId
 * @access Private (Admin only)
 */
exports.updateProductStock = async (req, res) => {
    const { productId, packageSizeId } = req.params;
    const { availableQuantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const packageSize = product.packageSizes.find(
            (size) => size.packageSizeId === packageSizeId
        );

        if (!packageSize) {
            return res.status(404).json({ message: 'Package size not found for this product' });
        }

        packageSize.availableQuantity = availableQuantity;

        await product.save();

        res.json({ message: 'Stock updated successfully', product });

    } catch (error) {
        console.error('Error updating product stock:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Add a new product
 * @route POST /api/products
 * @access Private (Admin only)
 */
exports.addProduct = async (req, res) => {
    try {
        // Ensure the _id is set from productId before creating
        const newProductData = {
            _id: req.body.productId, // Use productId as _id
            ...req.body
        };
        delete newProductData.productId; // Remove productId as it's now _id

        // Convert price in packageSizes to Number if needed, or ensure schema handles string
        if (newProductData.packageSizes && Array.isArray(newProductData.packageSizes)) {
            newProductData.packageSizes = newProductData.packageSizes.map(size => ({
                ...size,
                price: parseFloat(size.price.replace(/[^0-9.]/g, '')) // Remove '₹' and convert to number
            }));
        }

        const product = new Product(newProductData);
        await product.save();
        res.status(201).json(product); // 201 Created

    } catch (error) {
        console.error('Error adding product:', error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Update an existing product
 * @route PUT /api/products/:id
 * @access Private (Admin only)
 */
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    try {
        // Convert price in packageSizes to Number if needed, or ensure schema handles string
        if (updatedProductData.packageSizes && Array.isArray(updatedProductData.packageSizes)) {
            updatedProductData.packageSizes = updatedProductData.packageSizes.map(size => ({
                ...size,
                price: parseFloat(size.price.replace(/[^0-9.]/g, '')) // Remove '₹' and convert to number
            }));
        }

        const product = await Product.findByIdAndUpdate(id, updatedProductData, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });

    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access Private (Admin only)
 */
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * Helper to get Category Description (from Category model)
 */
exports.getCategoryDescription = async (categoryName) => {
    try {
        const category = await Category.findOne({ name: categoryName });
        return category ? category.description : '';
    } catch (error) {
        console.error('Error fetching category description:', error.message);
        return '';
    }
};

/**
 * Helper to get Brand ID by Name (from Brand model)
 */
exports.getBrandIdByName = async (brandName) => {
    try {
        const brand = await Brand.findOne({ name: brandName });
        return brand ? brand._id : null; // Return _id if found, null otherwise
    } catch (error) {
        console.error('Error fetching brand ID by name:', error.message);
        return null;
    }
};
