// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');     //Bcrypt for password hashing

// User schema
const userSchema = new mongoose.Schema ({
	name : {
		type: String,
		required: true,       //it is needed
		unique: true,          // must be unique for each users
		trim: true
	},
	email : {
		type: String,
		required: true,       //it is needed
		unique:true,          // must be unique for each users
		lowercase: true,      // to lowercase
		trim: true
	},
	accountType: {
		type: String,
		required: true,           //it is needed
		enum: ['savings', 'current']   // it can either be savings or current account
	},
	password : {
		type: String,
		required: true,         //it is needed
		minlength: 4,           // minimum of 4 letters
	},
	balance: {
		type: Number,
		default: 0
	}
});


//Password hashing before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password'))
		return next ();           // If password id not changed

	const salt = await bcrypt.genSalt(10);     //Generate salt
	this.password = await bcrypt.hash(this.password, salt);   //Hash password
	next();
});


//Compare password 
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare( enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);