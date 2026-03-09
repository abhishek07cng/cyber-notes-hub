# Cyber Notes Hub

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/license-Educational-lightgrey)

A MERN stack web application for documenting and organizing cybersecurity learning notes.

🔗 **Live Demo:** https://cyber-notes-hub.vercel.app  
🔗 **Backend API:** https://cyber-notes-hub-backend.onrender.com  

This platform allows structured learning by organizing notes into **categories, topics, and ordered lessons**, similar to documentation platforms like **PortSwigger Web Security Academy**.

It also provides an **admin dashboard** to create, edit, and manage notes.

---

# Features

## Learning Platform

- Organized cybersecurity notes
- Category-based navigation
- Topic-based lesson structure
- Ordered learning path
- Tags for quick filtering
- Markdown support for writing notes
- Syntax highlighting for payloads
- Sidebar navigation for lessons
- Previous / Next lesson navigation

---

## Admin Dashboard

- Secure admin login
- Create new notes
- Edit notes
- Delete notes
- Assign category and topic
- Set learning order

---

## User Experience

- Responsive layout
- Dark theme interface
- Search notes by title
- Category filtering
- Tag-based navigation

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- TailwindCSS
- React Markdown
- React Syntax Highlighter

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based session handling

## Deployment

- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

# Project Structure


cyber-notes-hub
│
├── backend
│ ├── models
│ │ ├── note.js
│ │ └── admin.js
│ │
│ ├── middleware
│ │ └── authMiddleware.js
│ │
│ └── server.js
│
├── frontend
│ ├── pages
│ │ ├── Home.jsx
│ │ ├── NoteDetails.jsx
│ │ ├── AdminDashboard.jsx
│ │ ├── AdminLogin.jsx
│ │ ├── CategoryPage.jsx
│ │ └── TagPage.jsx
│ │
│ ├── components
│ │ └── Footer.jsx
│ │
│ └── App.jsx


---

# Learning Structure

Notes are organized as:


Category → Topic → Ordered Lessons


Example:


Web Security
└ SQL Injection
1 What is SQL Injection
2 Detecting SQL Injection
3 Retrieving Hidden Data
4 Authentication Bypass


This structure helps create a **step-by-step cybersecurity learning path**.

---

# Installation

## Clone the Repository


git clone https://github.com/yourusername/cyber-notes-hub.git

cd cyber-notes-hub


---

# Backend Setup


cd backend
npm install


Create `.env` file:


MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key


Run backend server:


npm start


---

# Frontend Setup


cd frontend
npm install
npm run dev


The frontend will run on:


http://localhost:5173


---

# Admin Access

Admin authentication is required to manage notes.

Admin can:

- Create new notes
- Edit existing notes
- Delete notes
- Organize lessons by order
- Manage categories and topics

---

# Example Note Structure

Example note entry:


Title: Authentication Bypass

Category: Web Security

Topic: SQL Injection

Order: 4


Content sections include:

- Concept
- Payload
- Explanation
- Mitigation
- References

---

# Future Improvements

Possible enhancements for the platform:

- Learning progress tracker
- Full-text search
- Estimated reading time
- Auto table of contents from markdown headings
- User accounts for learners
- Bookmark system
- Note bookmarking / favorites

---

# Author

**Abhishek Kumar Singh**

Cybersecurity student documenting hands-on learning in ethical hacking, vulnerability research, and security labs.

---

# License

This project is for **educational and learning purposes**.