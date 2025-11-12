const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// app.use(cors());
// Replace app.use(cors()); with this:
const corsOptions = {
  origin: 'https://graceful-sundae-d41e85.netlify.app', // Your live Netlify URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json()); // Body parser for JSON

// Connect to MongoDB with connection pooling and better error handling
const mongooseOptions = {
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 5,  // Minimum number of connections in the pool
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => console.log('MongoDB Connected with connection pooling...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if cannot connect to database
    });

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));