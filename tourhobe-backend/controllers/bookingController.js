const Booking = require('../models/Booking');
const Resort = require('../models/Resort');

// POST /api/bookings — tourist creates a booking
const createBooking = async (req, res) => {
    try {
        const { resortId, checkIn, checkOut, guests } = req.body;

        // Check resort exists and is approved
        const resort = await Resort.findById(resortId);
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }
        if (resort.status !== 'approved') {
            return res.status(400).json({ message: 'Resort is not available for booking' });
        }

        // Calculate total price
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * resort.pricePerNight;

        const booking = await Booking.create({
            resortId,
            touristId: req.user._id,
            checkIn,
            checkOut,
            guests,
            totalPrice,
            status: 'pending'
        });

        return res.status(201).json({ message: 'Booking created', booking });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/bookings/my — tourist views their own bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ touristId: req.user._id })
            .populate('resortId', 'name district images pricePerNight');
        return res.status(200).json(bookings);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/bookings/resort/:id — owner views bookings for their resort
const getResortBookings = async (req, res) => {
    try {
        const resort = await Resort.findById(req.params.id);

        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        // Only the owner of this resort can see its bookings
        if (resort.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const bookings = await Booking.find({ resortId: req.params.id })
            .populate('touristId', 'name email phone');
        return res.status(200).json(bookings);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PATCH /api/bookings/:id/cancel — tourist cancels their own booking
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Only the tourist who made the booking can cancel it
        if (booking.touristId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({ message: 'Booking already cancelled' });
        }

        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );

        return res.status(200).json({ message: 'Booking cancelled', booking: updated });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createBooking, getMyBookings, getResortBookings, cancelBooking };