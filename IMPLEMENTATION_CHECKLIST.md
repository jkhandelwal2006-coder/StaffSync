# StaffSync — Implementation Checklist

## Reference Map

### Architecture
- [x] MERN Stack (MongoDB, Express, React, Node)
- [x] MVC pattern on backend
- [x] JWT authentication + bcrypt password hashing
- [x] Role-based access: HR, Manager, Employee

### Database Collections (from ER Diagram + Schema images)
- [x] `users` — name, email, password (bcrypt), role (HR|Employee|Manager), department, createdAt
- [x] `employees` — user(ref), name, email, department, position, salary, joinDate, phone, address, createdAt
- [x] `attendances` — user(ref), date, checkInTime, checkOutTime, status (Present|Absent|Half Day), compound unique index
- [x] `leaves` — user(ref), startDate, endDate, reason, status (Pending|Approved|Rejected), approverRole (HR|Manager), createdAt
- [x] `announcements` — title, message, createdBy(ref User), targetAudience (All|Employees|Managers), timestamps
- [x] `trainings` — title, description, date, trainer, createdBy(ref User), assignedTo([ref User]), timestamps

### Backend Routes & Controllers
- [x] Auth: POST /api/auth/register, POST /api/auth/login
- [x] Employees: GET, POST, PUT /:id, DELETE /:id (HR only)
- [x] Attendance: POST /check-in, PUT /check-out, GET /my, GET /all (HR)
- [x] Leaves: POST /apply, GET /my, GET /all (HR+Manager), PUT /:id/status
- [x] Announcements: POST, GET, DELETE /:id
- [x] Training: POST, GET, PUT /:id, DELETE /:id (Manager)

### Frontend Pages (from screenshots)
- [x] Landing Page — dark navy, hero, 4 feature cards, Login/Register button
- [x] Login Page — centered card, email+password fields, Login button, Register link
- [x] Register Page — centered card, name+email+password+role dropdown, Register button
- [x] HR Dashboard — tabs: Leave Applications | Employee Management | Announcements | Attendance
- [x] Employee Dashboard — tabs: Announcements | Leaves | Attendance | Profile
- [x] Manager Dashboard — tabs: Leave Applications | Training & Development
