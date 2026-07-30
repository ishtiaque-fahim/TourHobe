const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Tourist and admin can get recommendations
router.get('/', verifyToken, requireRole('tourist', 'admin'), getRecommendations);

module.exports = router;