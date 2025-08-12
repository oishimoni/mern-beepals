# MERN BeePals

A MERN stack fitness tracking application where users can manage their profiles, track exercises, and connect with other fitness enthusiasts.

## 🏗️ Project Structure

```
mern-beepals/
├── backend/              # Node.js/Express API server
│   ├── models/          # Mongoose data models
│   │   ├── user.model.js
│   │   ├── Profile.js
│   │   └── exercise.model.js
│   ├── routes/          # Express API routes
│   │   ├── auth.js      # Authentication routes
│   │   ├── profile.js   # Profile management routes
│   │   ├── exercises.js # Exercise tracking routes
│   │   └── users.js     # User management routes
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── client/              # React frontend application
│   ├── src/
│   │   ├── pages/       # React components/pages
│   │   │   ├── Login.js
│   │   │   ├── Profile.js
│   │   │   └── Signup.js
│   │   ├── utils/       # Utility functions
│   │   │   └── axios.js # API client configuration
│   │   └── App.js       # Main React component
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
└── package.json         # Root project scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-beepals
   ```

2. **Install all dependencies**
   ```bash
   npm i
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend/` directory:
   ```env
   ATLAS_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev
   
   # Or run separately:
   npm run start #change directory to backend   # Backend only (port 5000)
   npm run start #change directory to client    # Frontend only (port 3000)
   ```

## 🔧 Available Scripts

- `npm run dev` - Run both frontend and backend concurrently
- `npm run server` - Run backend server only
- `npm run client` - Run frontend development server only
- `npm run build` - Build frontend for production
- `npm run install-deps` - Install dependencies for all projects

## 🎯 Features

- **User Authentication**: Register and login with email/password
- **Profile Management**: Create and update user profiles with bio, location, age
- **Exercise Tracking**: Log and track fitness exercises
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Create React App
- **HTTP Client**: Axios
- **Testing**: Jest & React Testing Library

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Profile Management
- `GET /api/profile` - Get user profile
- `POST /api/profile/create` - Create user profile
- `PUT /api/profile/update` - Update user profile
- `DELETE /api/profile/delete` - Delete user profile

### Exercise Tracking
- `GET /api/exercises` - Get all exercises
- `POST /api/exercises/add` - Add new exercise

### User Management
- `GET /api/users/profile` - Get current user info
- `PUT /api/users/update` - Update user information

## 🔐 Authentication Flow

1. User registers/logs in through frontend
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Protected routes require Authorization header: `Bearer <token>`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.