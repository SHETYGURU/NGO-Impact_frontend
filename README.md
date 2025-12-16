# NGO Impact App

A full‑stack application to manage NGO monthly reports, CSV uploads, background jobs, and dashboards.

## Live Link --> [Click Here](https://ngoimpact.netlify.app)




## 🧩 Tech Stack

### Frontend

* React
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* BullMQ + Redis (for background jobs)

---

## 📁 Project Structure

```
ngo-impact-app/
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── api/
│
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── middleware/
    │   └── server.js
    └── prisma/
        └── schema.prisma
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (>= 18)
* PostgreSQL
* Redis (for job processing)
* npm or yarn

---

## 🛠️ Backend Setup

### 1️⃣ Navigate to backend

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ngo_impact"
JWT_SECRET="your_secret_key"
REDIS_URL="redis://localhost:6379"
```

### 4️⃣ Prisma setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Start backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

Health check:

```
GET /health
```

---

## 🎨 Frontend Setup

### 1️⃣ Navigate to frontend

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Authentication

### Admin Login

```json
{
  "email": "admin@ngo.com",
  "password": "admin123"
}
```

Login endpoint:

```
POST /auth/login
```

Use returned JWT token for authorized requests:

```
Authorization: Bearer <token>
```

---

## 📝 Submitting Monthly Reports

Endpoint:

```
POST /report
```

Example body:

```json
{
  "ngoId": "NGO-001",
  "month": "2025-11",
  "peopleHelped": 120,
  "eventsConducted": 4,
  "fundsUtilized": 25000
}
```

* Month uses **calendar picker** (`YYYY-MM`)
* Existing NGO + month will be **updated**
* New NGO + month will be **created**

---

## 📤 CSV Upload & Background Jobs

* Upload CSV files via `/reports`
* Each upload creates a **Job ID**
* Processing runs in background
* Progress tracked via `/job-status/:jobId`

Frontend shows:

* Processing popup
* Live progress (e.g. `Processed 35 of 50 rows`)

---

## 📊 Dashboard

* View reports by NGO and month
* Aggregated statistics
* Month filtering supported

---

## 🖼️ Screenshots

### Login Page

![Login Screenshot](./screenshots/login.png)

### Report Submission Form

![Report Form Screenshot](./screenshots/report-form.png)

### Processing Popup

![Processing Popup Screenshot](./screenshots/processing-popup.png)

### Dashboard View

![Dashboard Screenshot](./screenshots/dashboard.png)


---

## ✅ Common Issues

### ❌ Prisma validation error

Cause: Missing required fields

Solution: Ensure all numeric fields are provided or defaults are set in schema.

---

## 🚀 Future Enhancements

* Role‑based dashboards
* Export reports to Excel
* Email notifications on job completion
* NGO‑wise analytics

---

