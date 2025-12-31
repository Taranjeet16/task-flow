# TaskFlow – Full-Stack Task Management Application

A modern, scalable task management application built to demonstrate frontend engineering skills, secure authentication, and clean architecture.

**Author:** Taranjeet

---

## 🚀 Project Overview

TaskFlow is a full-stack web application that allows users to securely authenticate and manage tasks through a responsive, SaaS-style dashboard. The project focuses on clean UI/UX, secure authentication, and scalable frontend-backend integration.

---

## ✨ Features

### Core Features
- User authentication (signup, login, logout)
- JWT-based session management
- Protected dashboard routes
- User profile display
- Task management (Create, Read, Update, Delete)
- Search tasks by title
- Filter tasks by status
- Responsive design for desktop and mobile

### Bonus Features
- Task categories with visual indicators
- Due dates with overdue highlighting
- Dark / Light mode toggle
- Smooth UI animations and micro-interactions

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- shadcn/ui
- React Router
- Axios

### Backend
- PostgreSQL
- JWT-based authentication
- Row Level Security (RLS)
- Secure password handling

---

## 📁 Project Structure

src/
├── components/
│ ├── dashboard/
│ └── ui/
├── context/
│ └── AuthContext.tsx
├── hooks/
├── pages/
│ ├── Auth.tsx
│ ├── Dashboard.tsx
│ ├── Index.tsx
│ └── NotFound.tsx
├── services/
│ ├── profileService.ts
│ └── taskService.ts
└── integrations/
└── supabase/

---

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. Credentials are validated and a JWT session is created
3. Protected routes require authentication
4. User data access is restricted using Row Level Security
5. Logout clears the session and redirects to login

---

## 📋 API Overview

### Authentication
- `signUp(email, password, name)`
- `signIn(email, password)`
- `signOut()`

### Tasks
- `getTasks()`
- `createTask(data)`
- `updateTask(id, data)`
- `deleteTask(id)`

### Profile
- `getProfile()`

---

## 🗄 Database Schema

### Profiles
| Field | Type | Description |
|-----|------|------------|
| id | uuid | User ID |
| name | text | Display name |
| email | text | User email |
| created_at | timestamp | Created at |
| updated_at | timestamp | Updated at |

### Tasks
| Field | Type | Description |
|------|------|-------------|
| id | uuid | Task ID |
| user_id | uuid | Owner ID |
| title | text | Task title |
| description | text | Task details |
| status | enum | pending / completed |
| category | enum | task category |
| due_date | date | Optional due date |
| created_at | timestamp | Created at |
| updated_at | timestamp | Updated at |

---

## 🔒 Security

- Secure password hashing
- JWT tokens for authentication
- Backend-enforced authorization
- Row Level Security for data isolation
- Protected API access

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Run the development server
npm run dev