// app.js

require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');


//DB connect
connectDB();


// Middleware to parse JSON
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/auth', authRoutes);

module.exports= app;