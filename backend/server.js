const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
require('./config/database');

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', require('./routes/feedback'));

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Database: ${process.env.DB_NAME}`);
});