# SecureTask API & Task Management Dashboard

A full-stack task management application built with React, Node.js, Express, MongoDB, and JWT Authentication.

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication using HTTP-only Cookies
* Protected Routes

### Role-Based Access Control (RBAC)

#### User

* Create Tasks
* View Own Tasks
* Update Own Tasks
* Delete Own Tasks

#### Admin

* View All Tasks
* Manage All Tasks
* View Task Owners
* Delete Any Task

### Task Management

* Create Task
* View Tasks
* Update Task Status
* Delete Task

### Frontend

* Responsive Dashboard
* Authentication UI
* Admin Dashboard
* Toast Notifications

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser

---

## Project Structure

```bash
client/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── assets/

server/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
└── server.js
```

---

## Environment Variables

### Backend (.env)

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
NODE_ENV=development
CLIENT_URL=your_frontend_url
```

### Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:8080
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/securetask-api.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | /api/v1/auth/signup | Register User |
| POST   | /api/v1/auth/login  | Login User    |
| POST   | /api/v1/auth/logout | Logout User   |

### User

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/v1/user/data | Get User Profile |

### Tasks

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| POST   | /api/v1/tasks     | Create Task     |
| GET    | /api/v1/tasks     | Get Tasks       |
| GET    | /api/v1/tasks/:id | Get Single Task |
| PUT    | /api/v1/tasks/:id | Update Task     |
| DELETE | /api/v1/tasks/:id | Delete Task     |

### Admin

| Method | Endpoint                | Description    |
| ------ | ----------------------- | -------------- |
| GET    | /api/v1/admin/tasks     | View All Tasks |
| GET    | /api/v1/admin/users     | View All Users |
| DELETE | /api/v1/admin/users/:id | Delete User    |

---

## Security Features

* Password Hashing using bcryptjs
* JWT Authentication
* HTTP-only Cookies
* Protected Routes
* Role-Based Authorization
* Input Validation
* Error Handling Middleware

---

## API Documentation

Postman Collection is available in the repository:

SecureTask.postman_collection.json

Import the collection into Postman to test all APIs.

## Scalability Notes

This application can be scaled using:

### 1. Microservices

Authentication and Task Management can be separated into independent services.

### 2. Redis Caching

Frequently accessed data can be cached to reduce database load.

### 3. Load Balancing

Multiple backend instances can be deployed behind a load balancer.

### 4. Database Scaling

MongoDB Atlas clustering and replica sets can improve performance and availability.

### 5. Message Queues

RabbitMQ or Kafka can be used for asynchronous background jobs and notifications.

---

## Future Improvements

* Task Categories
* Due Dates
* File Attachments
* Email Notifications
* Activity Logs
* Team Collaboration

---

## Author

Priyanshu Kumar

Backend Developer Assignment Submission
