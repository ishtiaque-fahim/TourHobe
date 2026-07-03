const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getResortBookings,
    cancelBooking
} = require('../controllers/bookingController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Tourist only
router.post('/', verifyToken, requireRole('tourist'), createBooking);
router.get('/my', verifyToken, requireRole('tourist'), getMyBookings);
router.patch('/:id/cancel', verifyToken, requireRole('tourist'), cancelBooking);

// Owner only
router.get('/resort/:id', verifyToken, requireRole('owner'), getResortBookings);

module.exports = router;