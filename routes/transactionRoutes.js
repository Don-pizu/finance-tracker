// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {makeTransaction, getTransactions, 
		getTransById, updateTransaction, 
		deleteTransaction}      = require('../controllers/transactionController');


router.use(protect);

router.route('/transactions')
		.post(makeTransaction)
		.get(getTransactions);

router.route('/transactions/:id')
		.get(getTransById)
		.put(updateTransaction)
		.delete(deleteTransaction);

module.exports = router;
