//routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { register, login, getBalance } = require('../controllers/authController');


/**
 * @swagger
 * /auth/register:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               required:
 *                  - name
 *                  - email
 *                  - accountType
 *                  - password
 *               properties:
 *                   name:
 *                      type: string
 *                   email:
 *                       type: string
 *                   accountType:
 *                       type: string
 *                   password:
 *                       type: string
 *      responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Validation error            
 * 
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - accountType
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               accountType:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */


router.post('/register', register);
router.post('/login', login);

//Protected Routes
router.get('/balance', protect, getBalance);

module.exports = router;