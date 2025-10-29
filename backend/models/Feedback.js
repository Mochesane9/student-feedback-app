const db = require('../config/sqlite');

class Feedback {
    static create(feedbackData) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Feedback (studentName, courseCode, comments, rating) VALUES (?, ?, ?, ?)`;
            db.run(sql, [feedbackData.studentName, feedbackData.courseCode, feedbackData.comments, feedbackData.rating], function(err) {
                if (err) reject(err);
                else resolve({ insertId: this.lastID });
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Feedback ORDER BY createdAt DESC';
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static deleteById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Feedback WHERE id = ?';
            db.run(sql, [id], function(err) {
                if (err) reject(err);
                else resolve({ affectedRows: this.changes });
            });
        });
    }
}

module.exports = Feedback;