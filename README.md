# Student Feedback Application

A full-stack web application for submitting and managing student course feedback, built with React frontend and Node.js/Express backend with MySQL database.

## Features

- ✅ Submit course feedback with validation
- ✅ View all feedback entries with delete functionality  
- ✅ Dashboard with statistics
- ✅ Professional responsive design
- ✅ Form validation with error messages
- ✅ Delete feedback entries
- ✅ Environment variables for database configuration

## Tech Stack

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express, MySQL
- **Database**: MySQL with proper schema

## Setup Instructions

### Backend Setup
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with database configuration
4. Start server: `npm run dev`

### Frontend Setup  
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start application: `npm start`

## API Endpoints

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Get all feedback
- `DELETE /api/feedback/:id` - Delete feedback by ID

## Database Schema

```sql
CREATE TABLE Feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentName VARCHAR(100) NOT NULL,
    courseCode VARCHAR(20) NOT NULL, 
    comments TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);