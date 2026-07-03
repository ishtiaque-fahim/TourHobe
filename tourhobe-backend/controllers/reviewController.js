const Review = require('../models/Review');
const Resort = require('../models/Resort');

// POST /api/reviews — tourist submits a review
const createReview = async (req, res) => {
    try {
        const { resortId, rating, comment } = req.body;

        const resort = await Resort.findById(resortId);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        const review = await Review.create({
            resortId,
            touristId: req.user._id,
            rating,
            comment
        });

        // Update resort avgRating and totalReviews
        const allReviews = await Review.find({ resortId });
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await Resort.findByIdAndUpdate(resortId, {
            avgRating: avgRating.toFixed(1),
            totalReviews: allReviews.length
        });

        return res.status(201).json({ message: 'Review submitted', review });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/reviews/resort/:id — public, get all reviews for a resort
const getResortReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ resortId: req.params.id })
            .populate('touristId', 'name photoURL');
        return res.status(200).json(reviews);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createReview, getResortReviews };