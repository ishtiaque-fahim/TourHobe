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
router.get('/:id', getResortById);

// Owner only
router.post('/', verifyToken, requireRole('owner', 'admin'), createResort);
router.patch('/:id', verifyToken, requireRole('owner', 'admin'), updateResort);
router.delete('/:id', verifyToken, requireRole('owner', 'admin'), deleteResort);

// Admin only
router.patch('/:id/status', verifyToken, requireRole('admin'), updateResortStatus);

module.exports = router;