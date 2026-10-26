# StaffSync — Modern Human Resource Management Solution

A full-stack MERN application for human resource management with role-based dashboards for HR, Manager, and Employee.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB running locally (default: `mongodb://localhost:27017`)

### 1. Setup Server

```bash
cd server
npm install
# (Optional) Seed demo accounts:
node seed.js
# Start server:
node server.js
```

Server runs on: **http://localhost:8000**

### 2. Setup Client

```bash
cd client
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🔑 Demo Accounts

| Role     | Email                    | Password     |
|----------|--------------------------|--------------|
| HR       | hr@staffsync.com         | password123  |
| Manager  | manager@staffsync.com    | password123  |
| Employee | employee@staffsync.com   | password123  |

---

## 📁 Project Structure

```
StaffSync/
├── server/                    # Node.js / Express Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema (HR/Manager/Employee roles)
│   │   ├── Employee.js        # Employee records
│   │   ├── Attendance.js      # Attendance with check-in/out
│   │   ├── Leave.js           # Leave requests
│   │   ├── Announcement.js    # Company announcements
│   │   └── Training.js        # Training programs
│   ├── controllers/           # Business logic
│   ├── routes/                # Express route definitions
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT + role authorization
│   ├── seed.js                # Demo data seeder
│   ├── server.js              # Express app entry point
│   └── .env                   # Environment variables
│
└── client/                    # React / Vite Frontend
    └── src/
        ├── api/api.js          # Axios client with JWT interceptor
        ├── store/              # Redux Toolkit (auth state)
        ├── components/
        │   ├── auth/           # Login, Register
        │   ├── hr/             # HR tabs (Leave, Employee, Announcements, Attendance)
        │   ├── employee/       # Employee tabs (Announcements, Leaves, Attendance, Profile)
        │   └── manager/        # Manager tabs (Leave Applications, Training)
        ├── pages/              # Page-level components
        │   ├── LandingPage.jsx
        │   ├── HrDashboard.jsx
        │   ├── EmployeeDashboard.jsx
        │   └── ManagerDashboard.jsx
        └── index.css           # Complete dark-theme design system
```

---

## 🛠️ Tech Stack

| Layer     | Technology                                |
|-----------|-------------------------------------------|
| Frontend  | React 18, Vite, Redux Toolkit, React Router v6 |
| Backend   | Node.js, Express.js                       |
| Database  | MongoDB, Mongoose                         |
| Auth      | JWT (jsonwebtoken), bcryptjs             |
| HTTP      | Axios (with interceptors)                 |
| Styling   | Vanilla CSS (dark navy design system)     |

---

## 🌐 API Endpoints

| Method | Route                         | Access            |
|--------|-------------------------------|-------------------|
| POST   | /api/auth/register            | Public            |
| POST   | /api/auth/login               | Public            |
| GET    | /api/auth/me                  | Authenticated     |
| GET    | /api/employees                | HR only           |
| POST   | /api/employees                | HR only           |
| PUT    | /api/employees/:id            | HR only           |
| DELETE | /api/employees/:id            | HR only           |
| POST   | /api/attendance/check-in      | Authenticated     |
| PUT    | /api/attendance/check-out     | Authenticated     |
| GET    | /api/attendance/my            | Authenticated     |
| GET    | /api/attendance/all           | HR only           |
| POST   | /api/leaves/apply             | Authenticated     |
| GET    | /api/leaves/my                | Authenticated     |
| GET    | /api/leaves/all               | HR + Manager      |
| PUT    | /api/leaves/:id/status        | HR + Manager      |
| GET    | /api/announcements            | Authenticated     |
| POST   | /api/announcements            | HR + Manager      |
| DELETE | /api/announcements/:id        | HR + Manager      |
| GET    | /api/trainings                | Authenticated     |
| POST   | /api/trainings                | Manager only      |
| PUT    | /api/trainings/:id            | Manager only      |
| DELETE | /api/trainings/:id            | Manager only      |
