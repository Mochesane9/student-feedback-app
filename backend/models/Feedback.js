const db = require('../config/database');

class Feedback {
    static async create(feedbackData) {
        const [result] = await db.execute(
            'INSERT INTO Feedback (studentName, courseCode, comments, rating) VALUES (?, ?, ?, ?)',
            [feedbackData.studentName, feedbackData.courseCode, feedbackData.comments, feedbackData.rating]
        );
        return result;
    }

    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM Feedback ORDER BY createdAt DESC');
        return rows;
    }

    static async deleteById(id) {
        const [result] = await db.execute('DELETE FROM Feedback WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Feedback;