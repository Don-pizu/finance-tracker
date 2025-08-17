//routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register, login, getBalance } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);

//Protected Routes
router.get('/balance', protect, getBalance);

module.exports = router;