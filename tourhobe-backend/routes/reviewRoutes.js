const express = require('express');
const router = express.Router();
const { createReview, getResortReviews } = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Tourist only
router.post('/', verifyToken, requireRole('tourist'), createReview);

// Public
router.get('/resort/:id', getResortReviews);

module.exports = router;