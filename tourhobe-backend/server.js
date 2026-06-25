// Step 1: Import the packages we installed
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // this loads your .env file so process.env.PORT works

// Step 2: Create the Express application
const app = express();

// Step 3: Attach "middleware" — these run on EVERY request before your routes
app.use(cors());           // allows your React frontend to call this backend
app.use(express.json());   // allows server to read JSON data sent in requests

// Step 4: Define a route
// "When someone sends a GET request to '/', send back this response"
app.get('/', (req, res) => {
    res.json({
        message: 'TourHobe backend is alive!',
        status: 'success'
    });
});

// Step 5: Start listening for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ TourHobe server running on http://localhost:${PORT}`);
});