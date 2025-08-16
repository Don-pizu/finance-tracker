# Finance Tracker

## Description
A simple app for tracking **income, expenses, and balance** with user authentication.

## Features
- 🔐 User Authentication (JWT-based)
- ✏️ CRUD Operations (Create, Read, Update, Delete)
- 🗄️ MongoDB Integration for persistent storage

## Installation & Usage

``bash
# Clone the repository
git clone https://github.com/Don-pizu/finance-tracker.git

# Navigate into the project folder
cd finance-tracker

# Install dependencies
npm install

# Start the server
node server.js

project-root/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/ 
│   └── authRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── utility/
│   └── generateToken.js
├── tests/
├── app.js
├── server.js
├── .env
├── .gitignore
└── README.md


## Technologies used
-Node.js
-Express.js
-MongoDB
-JWT Authentication
-Bcrypt.js (password hashing)
-dotenv (environment variables)


API Endpoints

Method	Endpoint	 Description	Access
POST	/register	 Register a new user	Public
POST	/login	     Login an existing user	Public


## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

``bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/finance-tracker.git
git push -u origin main

git commit -m "feat: add registration and login routes"