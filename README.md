# 🔐 Cyber Notes Hub

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/license-Educational-lightgrey)

🚀 A **full-stack MERN cybersecurity learning platform** designed for structured knowledge management, quick revision, and practical exploitation reference.

🔗 **Live Demo:** https://cyber-notes-hub.vercel.app
🔗 **Backend API:** https://cyber-notes-hub-backend.onrender.com

---

## 🧠 Overview

Cyber Notes Hub is a **personal cybersecurity knowledge system + public learning platform** that organizes notes into:

> **Category → Topic → Ordered Lessons**

Inspired by platforms like **PortSwigger Web Security Academy**, it combines:

* 📚 Structured learning
* 💀 Practical payload usage
* ⚡ Fast knowledge retrieval

---

# ✨ Key Features

## 📚 Learning Platform

* Structured cybersecurity notes (Category → Topic → Lessons)
* Sidebar-based lesson navigation
* Previous / Next lesson flow
* Markdown-based content system
* Syntax highlighting for payloads
* Tags for filtering and discovery
* Clean dashboard UI with dark cybersecurity theme

---

## 💀 Practical Cybersecurity Features

* **Quick Payload Box** for exploit-ready payloads
* Copy-to-clipboard functionality for payloads and code
* Syntax-highlighted code blocks
* Optimized for real-world pentesting workflows

---

## ⚡ Advanced UI & UX

* Modern dashboard layout (Navbar + Sidebar + AppShell)
* Responsive design (mobile + desktop)
* Skeleton loaders (no “Loading…” UX)
* Empty state UI for better feedback
* Smooth transitions and hover interactions

---

## 🛠 Admin Dashboard (Custom CMS)

* Secure admin authentication (JWT + cookies)
* Create, edit, and delete notes
* Markdown-based note editor
* Live markdown preview (Notion-style experience)
* Tag input with pill UI
* Category dropdown (from centralized config)
* Topic suggestions (auto-filled)

---

## 🧠 Smart Learning System

* **Auto-ordering system** for lessons:

  * Automatically assigns next order
  * Supports manual override
  * Normalizes order after deletion
* Enables structured learning paths

---

## 🔍 Search & Filtering

* Search notes by:

  * Title
  * Tags
* Category-based filtering
* Tag-based navigation

---

# 🧩 Tech Stack

## Frontend

* React
* React Router
* Axios
* Tailwind CSS
* React Markdown
* React Syntax Highlighter

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie-based sessions

## Deployment

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

# 🏗 Architecture Highlights

* Component-based UI (AppShell, Navbar, Sidebar)
* Reusable components (NoteCard, EmptyState, Skeleton)
* Clean separation of concerns
* Frontend-driven enhancements without backend changes
* Scalable folder structure

---

# 📂 Project Structure

```
cyber-notes-hub
│
├── backend
│   ├── models
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── pages
│   ├── components
│   ├── data
│   └── App.jsx
```

---

# 📚 Learning Structure

```
Category → Topic → Ordered Lessons
```

Example:

```
Web Security
└── SQL Injection
    1. What is SQL Injection
    2. Detecting SQL Injection
    3. Retrieving Hidden Data
    4. Authentication Bypass
```

---

# ⚙️ Installation

## Clone the Repository

```
git clone https://github.com/abhishek07cng/cyber-notes-hub.git
cd cyber-notes-hub
```

---

## Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run server:

```
npm start
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:5173
```

---

# 🔐 Admin Access

Admin dashboard allows:

* Create notes
* Edit notes
* Delete notes
* Manage learning order
* Organize categories and topics

---

# 🧪 Example Note Structure

```
Title: Authentication Bypass
Category: Web Security
Topic: SQL Injection
Order: 4
```

Includes:

* Concept
* Payload
* Explanation
* Mitigation
* References

---

# 🚀 Future Improvements

* 🔍 Full-text global search (content-level)
* 🛠 Cybersecurity Tools Hub (centralized tool reference)
* 📊 Learning progress tracker
* ⭐ Bookmark / favorite notes
* ⏱ Estimated reading time
* 👤 User authentication system

---

# 👨‍💻 Author

**Abhishek Kumar Singh**

Cybersecurity enthusiast focused on:

* Ethical hacking
* Web security
* Vulnerability research

---

# 📜 License

This project is for **educational and learning purposes**.
