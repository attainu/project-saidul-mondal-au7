const compression = require('compression');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const setting = require('./config/checkProd');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('./src/db/keys')
// const keys = require('./config/keys');

// Load routes
const users = require('./src/routes/users');
// const profile = require('./routes/api/profile');
// const courses = require('./routes/api/courses');
// const subjects = require('./routes/api/subjects');

const app = express();
const port = process.env.PORT || 8080;

// Use GZip compression
app.use(compression());
app.use(cors());
app.use(helmet());
// app.use(express.cookieParser());

// Email confirmation
const emailController = require('./src/email/email.controller');

// Normal express middleware config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.session({ secret: process.env.secretOrKey }));

// Config express-session
const sessConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sessConfig));

// Passport Config
require('./config/userAuth')(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/users', users);
// app.use('/profile', profile);
// app.use('/courses', courses);
// app.use('/subjects', subjects);
app.get('/email/confirm/:id', emailController.confirmEmail);

if (setting.isProduction) {
    sessConfig.cookie.secure = true;

    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.info(`Server started on port ${port}`));