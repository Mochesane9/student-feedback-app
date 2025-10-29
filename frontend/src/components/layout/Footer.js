import React from 'react';

function Footer() {
    return (
        <footer style={{
            backgroundColor: '#34495e',
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                    Student Feedback Management System
                </p>
                <p style={{ margin: 0, color: '#bdc3c7', fontSize: '0.9rem' }}>
                    © 2025 Faculty of Information & Communication Technology. All rights reserved.
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#95a5a6', fontSize: '0.8rem' }}>
                    Developed for BIWA2110 Web Application Development
                </p>
            </div>
        </footer>
    );
}

export default Footer;