const Feedback = require('../models/Feedback');

const feedbackController = {
    // Create new feedback
    async createFeedback(req, res) {
        try {
            const { studentName, courseCode, comments, rating } = req.body;
            
            // Validation
            if (!studentName || !courseCode || !comments || !rating) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ error: 'Rating must be between 1 and 5' });
            }

            const result = await Feedback.create({ studentName, courseCode, comments, rating });
            res.status(201).json({
                message: 'Feedback submitted successfully',
                id: result.insertId
            });
        } catch (error) {
            console.error('Error creating feedback:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get all feedback
    async getAllFeedback(req, res) {
        try {
            const feedback = await Feedback.getAll();
            res.json(feedback);
        } catch (error) {
            console.error('Error fetching feedback:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete feedback
    async deleteFeedback(req, res) {
        try {
            const { id } = req.params;
            const result = await Feedback.deleteById(id);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Feedback not found' });
            }
            
            res.json({ message: 'Feedback deleted successfully' });
        } catch (error) {
            console.error('Error deleting feedback:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = feedbackController;