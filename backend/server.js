const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection - PostgreSQL only
const pool = require('./config/postgres');

// Initialize database table on startup
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Feedback (
                id SERIAL PRIMARY KEY,
                studentName VARCHAR(100) NOT NULL,
                courseCode VARCHAR(20) NOT NULL,
                comments TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Feedback table ready');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
}

initializeDatabase();

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
    res.json({ message: 'Backend API is working!' });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', database: 'PostgreSQL' });
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
    console.log(`💾 Using PostgreSQL database`);
});