import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
    const [formData, setFormData] = useState({
        studentName: '',
        courseCode: '',
        comments: '',
        rating: 1
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentName.trim()) {
            newErrors.studentName = 'Student name is required';
        } else if (formData.studentName.trim().length < 2) {
            newErrors.studentName = 'Student name must be at least 2 characters';
        }

        if (!formData.courseCode.trim()) {
            newErrors.courseCode = 'Course code is required';
        } else if (formData.courseCode.trim().length < 3) {
            newErrors.courseCode = 'Course code must be at least 3 characters';
        }

        if (!formData.comments.trim()) {
            newErrors.comments = 'Comments are required';
        } else if (formData.comments.trim().length < 10) {
            newErrors.comments = 'Comments must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3001/api/feedback', formData);
            alert('✅ Feedback submitted successfully!');
            
            // Reset form
            setFormData({
                studentName: '',
                courseCode: '',
                comments: '',
                rating: 1
            });
            setErrors({});
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('❌ Error submitting feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: '2rem auto', 
            padding: '0 2rem' 
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    color: '#2c3e50', 
                    marginBottom: '1.5rem',
                    borderBottom: '3px solid #3498db',
                    paddingBottom: '0.5rem',
                    textAlign: 'center'
                }}>
                    Submit Course Feedback
                </h2>
                
                <p style={{
                    color: '#7f8c8d',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    lineHeight: '1.5'
                }}>
                    Share your experience and help us improve our courses. 
                    Your feedback is valuable for enhancing the learning environment.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold', 
                            color: '#34495e' 
                        }}>
                            Student Name *
                        </label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                border: errors.studentName ? '2px solid #e74c3c' : '1px solid #bdc3c7',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                            placeholder="Enter your full name"
                        />
                        {errors.studentName && (
                            <p style={{ color: '#e74c3c', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                                {errors.studentName}
                            </p>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold', 
                            color: '#34495e' 
                        }}>
                            Course Code *
                        </label>
                        <input
                            type="text"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                border: errors.courseCode ? '2px solid #e74c3c' : '1px solid #bdc3c7',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                            placeholder="e.g., BIWA2110, COMP101"
                        />
                        {errors.courseCode && (
                            <p style={{ color: '#e74c3c', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                                {errors.courseCode}
                            </p>
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold', 
                            color: '#34495e' 
                        }}>
                            Comments *
                        </label>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                border: errors.comments ? '2px solid #e74c3c' : '1px solid #bdc3c7',
                                borderRadius: '5px',
                                fontSize: '16px',
                                height: '120px',
                                resize: 'vertical'
                            }}
                            placeholder="Share your thoughts about the course, instructor, materials, etc."
                        />
                        {errors.comments && (
                            <p style={{ color: '#e74c3c', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                                {errors.comments}
                            </p>
                        )}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold', 
                            color: '#34495e' 
                        }}>
                            Rating (1-5) *
                        </label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                border: '1px solid #bdc3c7',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        >
                            <option value="1">1 - Poor (Needs significant improvement)</option>
                            <option value="2">2 - Fair (Below expectations)</option>
                            <option value="3">3 - Good (Meets expectations)</option>
                            <option value="4">4 - Very Good (Exceeds expectations)</option>
                            <option value="5">5 - Excellent (Outstanding)</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ 
                            padding: '15px 30px', 
                            backgroundColor: isSubmitting ? '#95a5a6' : '#3498db', 
                            color: 'white', 
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            width: '100%',
                            fontWeight: 'bold'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>

                <p style={{
                    color: '#7f8c8d',
                    fontSize: '0.8rem',
                    marginTop: '1rem',
                    textAlign: 'center'
                }}>
                    * Required fields
                </p>
            </div>
        </div>
    );
}

export default FeedbackForm;