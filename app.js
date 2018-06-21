const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Load User Model
require('./models/User');

// Load Routes
const index = require('./routes');
const auth = require('./routes/auth');


//  HandleBars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');


// Passport Config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUnitialized: false
}));

// Set Global variables
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));


// USE Routes
app.use('/', index);
app.use('/auth', auth);

// Routes


// SERVER

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log( `Server started on port ${port}`)
});