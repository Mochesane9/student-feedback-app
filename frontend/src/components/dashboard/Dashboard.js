import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [stats, setStats] = useState({
        totalFeedback: 0,
        averageRating: 0,
        recentFeedback: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('/api/feedback');
            const feedback = response.data;
            
            const totalFeedback = feedback.length;
            const averageRating = totalFeedback > 0 
                ? (feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback).toFixed(1)
                : 0;
            
            setStats({
                totalFeedback,
                averageRating,
                recentFeedback: feedback.slice(0, 5)
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '2rem auto', 
            padding: '0 2rem' 
        }}>
            <h1 style={{ 
                color: '#2c3e50', 
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                Dashboard Overview
            </h1>
            
            {/* Statistics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#3498db', margin: '0 0 1rem 0' }}>Total Feedback</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>
                        {stats.totalFeedback}
                    </p>
                </div>
                
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#e74c3c', margin: '0 0 1rem 0' }}>Average Rating</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c3e50', margin: 0 }}>
                        {stats.averageRating}/5
                    </p>
                </div>
            </div>

            {/* Recent Feedback */}
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Recent Feedback</h2>
                {stats.recentFeedback.length === 0 ? (
                    <p style={{ color: '#7f8c8d', textAlign: 'center' }}>No feedback submitted yet.</p>
                ) : (
                    stats.recentFeedback.map((item) => (
                        <div key={item.id} style={{
                            borderBottom: '1px solid #ecf0f1',
                            padding: '1rem 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                                    {item.courseCode} - {item.studentName}
                                </h4>
                                <p style={{ margin: 0, color: '#7f8c8d' }}>{item.comments}</p>
                            </div>
                            <div style={{
                                backgroundColor: '#3498db',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontWeight: 'bold'
                            }}>
                                {item.rating}/5
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;