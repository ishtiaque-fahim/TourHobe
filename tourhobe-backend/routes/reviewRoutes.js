const express = require('express');
const router = express.Router();
const { createReview, getResortReviews } = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Tourist only
router.post('/', verifyToken, requireRole('tourist'), createReview);
// Tourist — get their own reviews
router.get('/my', verifyToken, requireRole('tourist', 'admin'), async (req, res) => {
    try {
        const Review = require('../models/Review');
        const reviews = await Review.find({ touristId: req.user._id })
            .populate('resortId', 'name district images');
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Public
router.get('/resort/:id', getResortReviews);

module.exports = router;