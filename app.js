require("dotenv").config();

const   express         = require('express'),
        app             = express(),
        path            = require('path'),
        favicon         = require('serve-favicon'),
        logger          = require('morgan'),
        cookieParser    = require('cookie-parser'),
        bodyParser      = require('body-parser');


const   errorHandler    =  require('./handlers/error');
const   appRoutes       = require('./routes/app'),
        userRoutes      = require('./routes/user'),
        messageRoutes   = require('./routes/messages');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

app.use(errorHandler);

module.exports = app;
