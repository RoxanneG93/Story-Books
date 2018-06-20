const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Load User Model
require('./models/User');

// Passport Config
require('./config/passport')(passport);

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));


// Load Routes
const auth = require('./routes/auth');


// USE Routes
app.use('/auth', auth);

// Routes
app.get('/', (req, res) => {
	res.send('It Works!');
});


// SERVER

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log( `Server started on port ${port}`)
});