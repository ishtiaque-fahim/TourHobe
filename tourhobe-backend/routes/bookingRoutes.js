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

// Owner — update booking status
router.patch('/:id/status', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const { status } = req.body;

        if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        return res.status(200).json({ message: `Booking ${status}`, booking });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});