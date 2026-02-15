# Bellcorp Event Management Application

A full-stack Event Management Application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Register and Login securely.
- **Event Discovery**: Browse events with search and filter capabilities (Location, Category).
- **Event Registration**: Register for events, managing capacity and duplicates.
- **User Dashboard**: View your upcoming and past event registrations.
- **Responsive Design**: Built with Tailwind CSS for a premium look.

## Prerequisites

- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas URI)

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/bellcorp_events
    JWT_SECRET=your_jwt_secret_key
    ```
4.  Seed the database with mock data:
    ```bash
    node seeder.js
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1.  Open your browser and navigate to the frontend URL (usually `http://localhost:5173` or `http://localhost:3000`).
2.  Register a new account or login.
3.  Browse events on the home page.
4.  Click on an event to view details and register.
5.  Go to the Dashboard to see your registrations.

## Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
