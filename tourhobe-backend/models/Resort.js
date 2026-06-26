const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    district: {
        type: String,
        enum: ['Bandarban', 'Rangamati', 'Cox\'s Bazar'],
        required: true
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    description: { type: String, required: true },
    amenities: [String],
    pricePerNight: { type: Number, required: true, min: 0 },
    images: [String],
    category: {
        type: String,
        enum: ['resort', 'cottage', 'homestay'],
        default: 'resort'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    avgRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Resort', resortSchema);