import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '1rem 2rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Student Feedback System
                </div>
                
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link 
                        to="/" 
                        style={{
                            color: location.pathname === '/' ? '#3498db' : 'white',
                            textDecoration: 'none',
                            fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/feedback" 
                        style={{
                            color: location.pathname === '/feedback' ? '#3498db' : 'white',
                            textDecoration: 'none',
                            fontWeight: location.pathname === '/feedback' ? 'bold' : 'normal',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Submit Feedback
                    </Link>
                    <Link 
                        to="/view-feedback" 
                        style={{
                            color: location.pathname === '/view-feedback' ? '#3498db' : 'white',
                            textDecoration: 'none',
                            fontWeight: location.pathname === '/view-feedback' ? 'bold' : 'normal',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        View Feedback
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;