const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST - Add new feedback
router.post('/feedback', feedbackController.createFeedback);

// GET - Retrieve all feedback
router.get('/feedback', feedbackController.getAllFeedback);

// DELETE - Delete feedback by ID
router.delete('/feedback/:id', feedbackController.deleteFeedback);

module.exports = router;