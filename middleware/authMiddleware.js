// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Middleware to verify token generated
exports.protect = async (req, res, next) => {
	let token;

	// check for Bearer token in authorization header
	if(
		req.headers.authorization && 
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//Extract Token 
			token = req.headers.authorization.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Attach user to request (excluding password)
			req.user = await User.findById(decoded.id).select('-password');

			if(!req.user) {
				return res.status(401).json({ message: 'User not found' });
			}
			
			next();

		} catch (error) {
			return res.status(401).json({ message: 'Not authorized, token failed'});
		}
	}

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, No Token'});
	}
};