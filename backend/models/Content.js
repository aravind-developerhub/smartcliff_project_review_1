const mongoose = require('mongoose');

const HeroBannerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    href: { type: String, required: true },
    displayOrder: { type: Number, required: true },
    isActive: { type: Boolean, default: false }
}, { _id: false });

const CategoryFlashCardSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    href: { type: String, required: true },
    displayOrder: { type: Number, required: true },
    isActive: { type: Boolean, default: false }
}, { _id: false });

const SocialMediaLinksSchema = new mongoose.Schema({
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    whatsapp: { type: String }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
    _id: { type: String, alias: 'id' }, // Use a static ID for the single content document
    heroBanners: [HeroBannerSchema],
    categoryFlashCards: [CategoryFlashCardSchema],
    socialMediaLinks: SocialMediaLinksSchema,
    updatedAt: { type: Date, default: Date.now } // Convert from String to Date
}, { collection: 'content' });

ContentSchema.pre('save', function(next) {
    if (!this._id && this.id) {
        this._id = this.id;
    }
    next();
});

module.exports = mongoose.model('Content', ContentSchema);