# Finance Tracker

## Description
A simple app for tracking **income, expenses, and balance** with user authentication.

## Features
-  User Authentication (JWT-based)
-  CRUD Operations for Transactions (Create, Read, Update, Delete)
- Balance auto-updates with credit/debit
-  Pagination & Filtering for transactions
-  MongoDB Integration for persistent storage
-  Basic security (Helmet, XSS-clean, Mongo-sanitize, Rate limiting)

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
|   |__ transactionController.js
├── models/
│   └── User.js
|   |__ transaction.js
├── routes/ 
│   └── authRoutes.js
|   |__ transactionRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── utility/
│   └── generateToken.js
├── tests/
    |-- auth.test.js
    |-- transaction.test.js
    |-- setup.js
├── app.js
├── server.js
|__ swagger
|-- jest.comfig.js
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
-Helmet, Express-rate-limit, Mongo-sanitize, XSS-clean
-Jest
-Swagger


API Endpoints

Auth Routes
Method	   Endpoint	             Description	       Access
POST	api/auth/register	 Register a new user	    Public
POST	api/auth/login	     Login an existing user	    Public
GET     api/auth/balance     Get user balance           Private


Transaction Routes

(All require JWT authentication)

Method   	Endpoint	    	Description												Access
POST	  /api/transactions		Create a new transaction 								Private
GET		  /api/transactions		Get all transactions (with pagination + filtering)		Private
GET		  /api/transactions/:id	Get single transaction by ID							Private
PUT	   	 /api/transactions/:id	Update transaction (amount/type/description)			Private
DELETE	 /api/transactions/:id	Delete a transaction	                                Private


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

git commit -m "feat: add transaction CRUD and balance update"

git commit -m "feat: add swagger and jest for testing, updated README"

git commit -m "feat: add transaction CRUD and balance update"