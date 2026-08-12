# 🚇 Metro Operations Dashboard

A full-stack web application to manage and monitor metro train operations in real-time. Built using React, Node.js, Express, and MongoDB with secure authentication and dynamic analytics.

## 🔥 Features

- 🔐 User Authentication (JWT-based Login/Register)
- 🚆 Train Management (Add, Edit, Delete)
- 📊 Live Analytics (Total, Running, Stopped)
- 🔍 Search & Filter Trains
- 🎨 Clean UI with Tailwind CSS
- 🌐 Full-stack Deployment (Vercel + Render + MongoDB Atlas)

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 📂 Project Structure

```
metro-ops-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── context/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
```

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/metro-ops-system.git
cd metro-ops-system
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

### Backend (`.env`)

```
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

## 🚀 Deployment

- **Frontend (Vercel):** https://vercel.com
- **Backend (Render):** https://render.com
- **Database (MongoDB Atlas):** https://www.mongodb.com/atlas

## 📸 Screenshots

_Add your screenshots here_

## 💼 Resume Description

Built a full-stack Metro Operations Dashboard using React, Node.js, Express, and MongoDB with JWT authentication, real-time CRUD operations, and dynamic analytics visualization. Deployed using Vercel and Render.

## 🔮 Future Improvements

- 🔄 Real-time updates using Socket.io
- 👤 Role-based access (Admin/User)
- 📊 Advanced charts & dashboards
- 📱 Mobile responsiveness

## 👨‍💻 Author

**Subodh Kumar**
GitHub: https://github.com/YOUR_USERNAME

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
