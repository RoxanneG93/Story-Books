const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);


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