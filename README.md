# Bellcorp Event Management Application

A full-stack Event Management platform built with the MERN stack (MongoDB, Express, React, Node.js). Users can discover events, register for them, and manage their bookings.

## 📂 Project Structure

```
root/
├── server/            # Backend API (Node.js/Express)
│   ├── models/        # Mongoose Models
│   ├── routes/        # API Routes
│   ├── middleware/    # Auth Middleware
│   └── server.js      # Entry Point
├── client/            # Frontend App (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- pnpm (recommended) or npm

### 1. Setup Backend (`server`)

```bash
cd server
cp .env.example .env  # (Or create .env with PORT, MONGO_URI, JWT_SECRET)
npm install
npm run dev
```

### 2. Setup Frontend (`client`)

```bash
cd client
npm install
npm run dev
```

## 🎨 Features

- **Premium UI:** "Milky White" aesthetic with glassmorphism and smooth animations.
- **Authentication:** Secure JWT-based signup and login.
- **Event Discovery:** Filter events by category and location.
- **Dashboard:** Manage upcoming and past registrations.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, bcryptjs
