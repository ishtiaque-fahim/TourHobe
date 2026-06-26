const User = require('../models/User');

// POST /api/users — sync Firebase user to MongoDB
const syncUser = async (req, res) => {
    try {
        const { firebaseUID, name, email, photoURL } = req.body;

        // Check if user already exists
        let user = await User.findOne({ firebaseUID });

        if (user) {
            // User exists — return them
            return res.status(200).json({ message: 'User already exists', user });
        }

        // User doesn't exist — create them
        user = await User.create({ firebaseUID, name, email, photoURL });
        return res.status(201).json({ message: 'User created', user });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/users — admin gets all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// PATCH /api/users/:id/role — admin promotes user
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!['admin', 'owner', 'tourist'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Role updated', user });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { syncUser, getAllUsers, updateUserRole };