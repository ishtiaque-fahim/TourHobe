const Resort = require('../models/Resort');

// GET /api/resorts — public, list all approved resorts with search/filter
const getAllResorts = async (req, res) => {
    try {
        const { district, category, minPrice, maxPrice, search } = req.query;

        // Build filter object dynamically
        let filter = { status: 'approved' };

        if (district) filter.district = district;
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
        }
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const resorts = await Resort.find(filter).populate('ownerId', 'name email');
        return res.status(200).json(resorts);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/resorts/:id — public, single resort details
const getResortById = async (req, res) => {
    try {
        const resort = await Resort.findById(req.params.id).populate('ownerId', 'name email');

        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        return res.status(200).json(resort);

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// POST /api/resorts — owner creates a new resort
const createResort = async (req, res) => {
    try {
        const { name, district, location, description, amenities, pricePerNight, images, category } = req.body;

        const resort = await Resort.create({
            name,
            ownerId: req.user._id,
            district,
            location,
            description,
            amenities,
            pricePerNight,
            images,
            category,
            status: 'pending'
        });

        return res.status(201).json({ message: 'Resort created, pending approval', resort });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PATCH /api/resorts/:id — owner or admin updates resort
const updateResort = async (req, res) => {
    try {
        const resort = await Resort.findById(req.params.id);

        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        // Only owner or admin can update
        if (resort.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updated = await Resort.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: 'Resort updated', resort: updated });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE /api/resorts/:id — owner or admin deletes resort
const deleteResort = async (req, res) => {
    try {
        const resort = await Resort.findById(req.params.id);

        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        // Only owner or admin can delete
        if (resort.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Resort.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Resort deleted' });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PATCH /api/resorts/:id/status — admin approves or rejects resort
const updateResortStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const resort = await Resort.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        return res.status(200).json({ message: `Resort ${status}`, resort });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllResorts, getResortById, createResort, updateResort, deleteResort, updateResortStatus };