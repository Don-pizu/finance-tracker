// controllers/authController.js

const User = require('../models/User');
const generateToken = require('../utility/generateToken');

//POST    Register a new user
exports.register = async (req, res) => {
	const { name, email, accountType, password } = req.body

	if(!name || !email || !accountType || !password) 
		return res.status(400).json({ message: 'All the fields are required'});

	//check if name already exists
	const userExists = await User.findOne({ name: name});
	if (userExists)
		return res.status(400).json({message: 'Name already exists'});

	//check if email already exist 
	const eExists = await User.findOne({ email: email});
	if (eExists) 
		return res.status(400).json({ message: 'Email already exists'});

	if (userExists && eExists)
		return res.status(400).json({ message: 'Name and Email already exists'});


	const user = await User.create({
		name,
		email,
		accountType,
		password
	});

	if(user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			accountType: user.accountType,
			balance: user.balance,
			token: generateToken(user)
		})
	} else {
		res.status(400).json({message: 'Invalid user data'});
	}

}



//POST  login user
exports.login = async (req, res) => {
	const { name, email, password } = req.body

	if(!name || !email || !password)
		return res.status(400).json({message: 'Name, Email and Password are reuired'});

	// Find user by name
	const user = await User.findOne({ name: name});

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			accountType: user.accountType,
			balance: user.balance,
			token: generateToken(user)
		});
	} else {
		return res.status(401).json({ message: 'Invalid Credentials'});
	}
};


//GET  Get balance
exports.getBalance = async (req, res) => {
  try {
    res.json({ balance: req.user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


