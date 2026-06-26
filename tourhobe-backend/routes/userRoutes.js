const express = require('express');
const router = express.Router();
const { syncUser, getAllUsers, updateUserRole } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Public — sync Firebase user to MongoDB on login
router.post('/', syncUser);

// Admin only — get all users
router.get('/', verifyToken, requireRole('admin'), getAllUsers);

// Admin only — update user role
router.patch('/:id/role', verifyToken, requireRole('admin'), updateUserRole);

module.exports = router;