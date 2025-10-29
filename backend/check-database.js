const Database = require('better-sqlite3');
const db = new Database('database.sqlite');

const feedback = db.prepare('SELECT * FROM Feedback ORDER BY id DESC').all();
console.log('📊 Feedback entries in database:');
console.table(feedback);

db.close();