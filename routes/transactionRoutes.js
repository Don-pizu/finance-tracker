// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {makeTransaction, getTransactions, 
		getTransById, updateTransaction, 
		deleteTransaction}      = require('../controllers/transactionController');



/**
 * @swagger
 * /transactions:
 *    post:
 *      summary: Make transaction
 *      tags: [Transactions]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               required:
 *                  - amount
 *                  - type
 *               properties:
 *                   amount:
 *                      type: number
 *                   type:
 *                       type: string
 *                       enum: [credit, debit]
 *                   description:
 *                       type: string
 *      responses:
 *         201:
 *           description: Transaction created successfully
 *         400:
 *           description: Validation error 
 *         401:
 *           description: Unauthorized           
 * 
 */


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions with pagination and filters
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of transactions per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [credit, debit]
 *         description: Filter by transaction type
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a single transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to retrieve
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */



/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update Transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *               description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */





/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction to delete
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */








router.use(protect);

router.route('/transactions')
		.post(makeTransaction)
		.get(getTransactions);

router.route('/transactions/:id')
		.get(getTransById)
		.put(updateTransaction)
		.delete(deleteTransaction);

module.exports = router;
