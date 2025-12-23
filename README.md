# Live Polling System – Backend

This repository contains the backend service for a real-time Live Polling System. It handles authentication, poll management, and live vote updates using WebSockets.

---

## 🚀 Features

- User authentication with JWT
- Secure password hashing using bcrypt
- Create, fetch, and end polls
- Real-time voting updates with Socket.IO
- MongoDB-based persistent storage
- Role-based access for poll creators

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.IO
- JSON Web Tokens (JWT)

---

## 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "crypto": "^1.0.1",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.0.2",
  "socket.io": "^4.8.1"
}
