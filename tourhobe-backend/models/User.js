const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String, default: '' },
    role: {
        type: String,
        enum: ['admin', 'owner', 'tourist'],
        default: 'tourist'
    },
    phone: { type: String, default: '' },
    district: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);