// models/transaction.js

const mongoose = require('mongoose');

// Transaction schema
const transactionSchema = new mongoose.Schema ({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User',
		required: true,
		index: true
	},
	amount: {
		type: Number,
		required: true,
		min: 0.01     //Amount must be positive and not less than 0.01
	},
	type: {
		type: String,
		enum:['credit', 'debit'],
		required: true
	},
	description: {
		type: String,
		maxlength: 300,
		trim: true
	},
	balanceAfter: {
		type: Number,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});



module.exports = mongoose.model('Transaction', transactionSchema);