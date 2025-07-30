const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    _id: { type: String, alias: 'categoryId' }, // Use 'categoryId' from your mock data as _id
    name: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String }
}, { collection: 'categories' });

CategorySchema.pre('save', function(next) {
    if (!this._id && this.categoryId) {
        this._id = this.categoryId;
    }
    next();
});

module.exports = mongoose.model('Category', CategorySchema);