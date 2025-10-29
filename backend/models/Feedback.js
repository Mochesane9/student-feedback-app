const pool = require('../config/postgres');

class Feedback {
    static async create(feedbackData) {
        const query = `
            INSERT INTO Feedback (studentName, courseCode, comments, rating) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id
        `;
        const values = [feedbackData.studentName, feedbackData.courseCode, feedbackData.comments, feedbackData.rating];
        const result = await pool.query(query, values);
        return { insertId: result.rows[0].id };
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM Feedback ORDER BY createdAt DESC');
        return result.rows;
    }

    static async deleteById(id) {
        const result = await pool.query('DELETE FROM Feedback WHERE id = $1', [id]);
        return { affectedRows: result.rowCount };
    }
}

module.exports = Feedback;