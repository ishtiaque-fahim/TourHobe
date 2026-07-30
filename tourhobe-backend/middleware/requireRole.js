const User = require('../models/User');

const requireRole = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            // Fetch user from MongoDB to get their role
            const user = await User.findOne({ firebaseUID: req.user.uid });

            if (!user) {
                return res.status(404).json({ message: 'User not found in database' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: `Access denied. Required role: ${roles.join(' or ')}` });
            }

            // Add MongoDB user info to req
            req.user._id = user._id;
            req.user.role = user.role;

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    };
};

module.exports = requireRole;