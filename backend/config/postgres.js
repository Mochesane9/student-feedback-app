const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: false // Disable SSL for local testing
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ PostgreSQL connection failed:', err.message);
    } else {
        console.log('✅ Connected to PostgreSQL database');
    }
});

module.exports = pool;