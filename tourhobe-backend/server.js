require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'TourHobe backend is alive!', status: 'success' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ TourHobe server running on http://localhost:${PORT}`);
});