const express = require('express');
const router = express.Router();
const {
    getAllResorts,
    getResortById,
    createResort,
    updateResort,
    deleteResort,
    updateResortStatus
} = require('../controllers/resortController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Public routes
router.get('/', getAllResorts);

// Admin only — get ALL resorts regardless of status
router.get('/admin/all', verifyToken, requireRole('admin'), async (req, res) => {
    try {
        const Resort = require('../models/Resort');
        const resorts = await Resort.find().populate('ownerId', 'name email');
        return res.status(200).json(resorts);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', getResortById);

// Owner only
router.post('/', verifyToken, requireRole('owner', 'admin'), createResort);
router.patch('/:id', verifyToken, requireRole('owner', 'admin'), updateResort);
router.delete('/:id', verifyToken, requireRole('owner', 'admin'), deleteResort);

// Admin only
router.patch('/:id/status', verifyToken, requireRole('admin'), updateResortStatus);

module.exports = router;