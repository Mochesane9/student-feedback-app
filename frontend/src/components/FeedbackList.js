import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackList() {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get('https://student-feedback-sqlite.onrender.com/api/feedback');
            setFeedback(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
            alert('Error loading feedback');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                await axios.delete(`https://student-feedback-sqlite.onrender.com/api/feedback/${id}`);
                alert('Feedback deleted successfully');
                fetchFeedback();
            } catch (error) {
                console.error('Error deleting feedback:', error);
                alert('Error deleting feedback');
            }
        }
    };

    return (
        <div style={{ 
            maxWidth: '800px', 
            margin: '2rem auto', 
            padding: '0 2rem' 
        }}>
            <h1 style={{ 
                color: '#2c3e50', 
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                All Feedback Entries
            </h1>
            
            {feedback.length === 0 ? (
                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
                        No feedback submitted yet.
                    </p>
                </div>
            ) : (
                feedback.map((item) => (
                    <div key={item.id} style={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e1e1e1', 
                        padding: '1.5rem', 
                        marginBottom: '1rem', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ 
                                    color: '#2c3e50', 
                                    margin: '0 0 0.5rem 0',
                                    fontSize: '1.2rem'
                                }}>
                                    {item.courseCode} - {item.studentName}
                                </h3>
                                <div style={{ 
                                    backgroundColor: '#3498db', 
                                    color: 'white', 
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '15px',
                                    fontSize: '0.9rem',
                                    display: 'inline-block',
                                    marginBottom: '0.5rem'
                                }}>
                                    Rating: {item.rating}/5
                                </div>
                                <p style={{ 
                                    margin: '0.5rem 0', 
                                    color: '#34495e',
                                    lineHeight: '1.5'
                                }}>
                                    <strong>Comments:</strong> {item.comments}
                                </p>
                                <p style={{ 
                                    margin: '0', 
                                    color: '#7f8c8d', 
                                    fontSize: '0.9rem' 
                                }}>
                                    Submitted: {new Date(item.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    backgroundColor: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default FeedbackList;