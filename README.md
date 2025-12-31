TaskFlow – Full-Stack Task Management Application

A modern, scalable task management web application built to demonstrate frontend engineering skills, secure authentication, and clean frontend–backend integration.

Author: Taranjeet Singh

🎥 Demo Video:
https://drive.google.com/file/d/1ulEhvTvoawn9RJBPvEy0-3o1ZEsfO3y4/view?usp=sharing

🚀 Live Demo (Vercel):
https://taskflow-6fv9l4fgj-taranjeet-singhs-projects-dd104821.vercel.app/

📂 GitHub Repository:
https://github.com/Taranjeet16/task-flow.git

🚀 Project Overview

TaskFlow is a full-stack web application that allows users to securely authenticate and manage tasks through a responsive, SaaS-style dashboard.
The project emphasizes:

Clean UI/UX

Secure authentication & authorization

Scalable and modular architecture

Real-world frontend–backend integration

✨ Features
Core Features

User authentication (Sign up, Login, Logout)

JWT-based session management

Protected dashboard routes

User profile display

Task management (Create, Read, Update, Delete)

Search tasks by title

Filter tasks by status

Fully responsive design (desktop & mobile)

Bonus Features

Task categories with visual indicators

Due dates with overdue highlighting

Dark / Light mode toggle

Smooth UI animations & micro-interactions

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

shadcn/ui

React Router

Axios

Backend & Database

Supabase (PostgreSQL)

JWT-based authentication

Row Level Security (RLS)

Secure password handling & authorization policies

📁 Project Structure
src/
├── components/
│   ├── dashboard/
│   └── ui/
├── context/
│   └── AuthContext.tsx
├── hooks/
├── pages/
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── services/
│   ├── profileService.ts
│   └── taskService.ts
├── integrations/
└── supabase/

🔐 Authentication Flow

User registers using name, email, and password

Credentials are validated and a JWT-based session is created

Protected routes require authentication

User-specific data access is enforced using Row Level Security

Logout clears the session and redirects to login

📋 API Overview
Authentication

signUp(email, password, name)

signIn(email, password)

signOut()

Tasks (CRUD)

getTasks()

createTask(data)

updateTask(id, data)

deleteTask(id)

Profile

getProfile()

Supabase auto-generated REST APIs are used with secure policies.

🗄 Database Schema
Profiles
Field	Type	Description
id	uuid	User ID
name	text	Display name
email	text	User email
created_at	timestamp	Created at
updated_at	timestamp	Updated at
Tasks
Field	Type	Description
id	uuid	Task ID
user_id	uuid	Owner ID
title	text	Task title
description	text	Task details
status	enum	pending / completed
category	enum	Task category
due_date	date	Optional due date
created_at	timestamp	Created at
updated_at	timestamp	Updated at
🔒 Security Practices

Secure password hashing

JWT-based authentication

Backend-enforced authorization

Row Level Security for data isolation

Protected routes & API access

📈 Scalability Notes

Modular frontend architecture with reusable components

Clear separation of UI, services, and integrations

API service layer designed for easy migration to:

Node.js (Express) or FastAPI backend

Role-based access control

Pagination & caching

Ready for production-scale deployment with minimal changes

🚀 Getting Started (Local Setup)
# Clone the repository
git clone https://github.com/Taranjeet16/task-flow.git

# Navigate into the project
cd task-flow

# Install dependencies
npm install

# Start the development server
npm run dev

✅ Assignment Alignment

This project fulfills all requirements of the Frontend Developer Intern Task:

React-based frontend

Authentication & protected dashboard

CRUD operations

Secure backend integration

Scalable architecture

Clean documentation
