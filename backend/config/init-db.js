const pool = require('./postgres');

async function initDatabase() {
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
        console.log('✅ Feedback table created/verified');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
}

initDatabase();