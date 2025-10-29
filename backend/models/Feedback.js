const db = require('../config/sqlite');

class Feedback {
    static async create(feedbackData) {
        const stmt = db.prepare(`
            INSERT INTO Feedback (studentName, courseCode, comments, rating) 
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(feedbackData.studentName, feedbackData.courseCode, feedbackData.comments, feedbackData.rating);
        return { insertId: result.lastInsertRowid };
    }

    static async getAll() {
        const stmt = db.prepare('SELECT * FROM Feedback ORDER BY createdAt DESC');
        return stmt.all();
    }

    static async deleteById(id) {
        const stmt = db.prepare('DELETE FROM Feedback WHERE id = ?');
        const result = stmt.run(id);
        return { affectedRows: result.changes };
    }
}

module.exports = Feedback;