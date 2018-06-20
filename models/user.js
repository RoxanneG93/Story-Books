const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const userSchema = new Schema ({
	googleID:  {
		type: String,
		// Dont make requried if using other methods of Auth
		required: true
	},
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	image: {
		type: String
	}
});

// Create collection and Add Schema
mongoose.model('users', userSchema);