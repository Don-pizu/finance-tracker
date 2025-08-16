// utility/generateToken

const jwt = require ('jsonwebtoken');

//Generate JWT Token
const generateToken = (user) => {
	return jwt.sign (
		{id: user._id},
		process.env.JWT_SECRET,
		{expiresIn: '1h'}        // Token will expire in 1 hour
		);
};

module.exports = generateToken;