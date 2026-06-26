const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    resortId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resort', required: true },
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);