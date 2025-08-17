// controllers/transactionController.js

const Transaction = require('../models/transaction');
const User = require('../models/User');

//POST  make transaction
exports.makeTransaction = async (req, res, next) => {
	try {
		const {amount, type, description} = req.body
		const user = req.user

		if(!amount || !type) {
			return res.status(400).json({ message: 'Amount and Type are required'});
		}

		if(typeof amount !== 'number' || amount <= 0 ){
			return res.status(400).json({ message: 'Amount must be positive number'});
		}

		if(!['credit', 'debit'].includes(type)) {
			return res.status(400).json ({ message: 'Transaction Type must be either credit or debit'});
		}

		//Fetch user data
		const dbUser = await User.findById(user._id);
		if(!dbUser) {
			return res.status(400).json({message: 'User not found'});
		}

		//Determine new balance
		let newBalance;
		if (type === 'debit') {
			if (amount > dbUser.balance) {
				return res.status(400).json({ message: 'Insufficient Balance'});
			}
			newBalance = dbUser.balance - amount;
		} else {
			newBalance = dbUser.balance + amount;
		}

		//Update user balance
		dbUser.balance = newBalance;
		await dbUser.save();


		//Create Transaction
		const createTrans = await Transaction.create({
			user: dbUser._id,
			amount,
			type,
			description: description,
			balanceAfter: newBalance
		});

		res.status(201).json({
			message: 'Transaction Successful',
			createTrans
		});

	} catch (err) {
		res.status(500).json({message: 'Internal server error'});
	}
};


//GET    get all transactons with pagination and filtering
exports.getTransactions = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip =(page - 1) * limit;

		const filter = {user: req.user._id};

		if (req.query.type) {
			filter.type = req.query.type;
		}

		if (req.query.start || req.query.end) {
			filter.date = {};
			if( req.query.start) 
				filter.date.$gte = new Date(req.query.start);
			if(req.query.end)
				filter.date.$lte = new Date(req.query.end);
		}

		const getTransaction = await Transaction.find(filter)
													.sort({ createdAt: -1 })
													.skip(skip)
													.limit(limit);

		const totalTrans = await Transaction.countDocuments(filter);
		const totalPages = Math.ceil(totalTrans / limit);

		res.json({
			getTransaction,
			total: totalTrans,
			page,
			totalPages

		});

	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


//GET     get a single transaction by id
exports.getTransById = async (req, res, next) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if(!transaction) {
			return res.status(404).json({ message: 'Transaction not found'});
		}

		res.json({
			message: 'Here is the transaction',
			transaction
		});

	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};


//PUT    Update transaction
exports.updateTransaction = async (req, res, next) => {
	try {
		const { amount, type, description} = req.body;
		const user = await User.findById(req.user._id);
		
		const transaction = await Transaction.findOne({ _id: req.params.id });
		if(!transaction){
			return res.status(404).json({ message: 'Transaction not found'});
		}

		// Roll back old transaction effect
		if (transaction.type === 'credit') {
			user.balance -= transaction.amount;
		} else {
			user.balance += transaction.amount;
		}


		//update transaction values
		 const newAmount = amount ?? transaction.amount;
    	 const newType = type ?? transaction.type;
   		 const newDescription = description ?? transaction.description;

		// Check balance validity before applying new transaction
		if (newType === 'debit' && newAmount > user.balance) {
		    return res.status(400).json({ message: 'Insufficient balance after update' });
		}

		// Apply new transaction effect
		if (newType === 'credit') {
			user.balance += newAmount;
		} else {
			user.balance -= newAmount;
		}

		// Keep balanceAfter consistent
		transaction.amount = newAmount;
	    transaction.type = newType;
	    transaction.description = newDescription;
	    transaction.balanceAfter = user.balance;


		await transaction.save();
		await user.save();

		res.status(200).json({
			message: 'Here is the updated transaction',
			transaction
		});

	} catch (err) {
		res.status(500).json({message: err.message });
	}
};


//DELETE    Delete transaction by id
exports.deleteTransaction = async (req, res, next) => {
	try {
		const trans = await Transaction.findById(req.params.id);

		if(!trans) {
			return res.status(400).json({ message: 'Transaction not found'});
		}

		//reverse the balance for transaction 
		const user = await User.findById(req.user._id);

		if(trans.type === 'credit')
			user.balance -= trans.amount;
		else
			user.balance += trans.amount;

		await user.save();
		await trans.deleteOne();

		res.status(200).json({ message: 'Transaction deleted successfully'});


	} catch (err) {
		res.status(500).json({ message: err.message});
	}
};