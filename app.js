const express       = require('express');
const mongoose      = require('mongoose');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');  
const bodyParser    = require('body-parser');
const config        = require('./app/config/config');
const port          = process.env.PORT || 3000;
const exphbs        = require('express-handlebars');
const session       = require('express-session');
const expressValidator = require('express-validator');
const flash         = require('connect-flash');
const passport      = require('passport');
const minify        = require('express-minify');

//Use node promises instead of mongoose
mongoose.Promise = require('bluebird');

const app = express();

// View engine setup
app.set('views', (__dirname + '/app/views'));

app.engine('handlebars', exphbs({defaultLayout: 'layout',
                                layoutsDir: __dirname + '/app/views/layouts',
                                partialsDir: __dirname + '/app/views/partials/'
                              }));

app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, './app/public')));
app.use(favicon(path.join(__dirname, './app/public/favicon.png')));
app.use(minify());

// Express sessions set secret
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Validator settings
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace  = param.split('.');
      var root       = namespace.shift();
      var formParam  = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect flash
app.use(flash());

// Set Global Vars
const setGlobals    = require('./app/helpers/global_vars')(app);

//Connecting MongoDB using mongoose to our application
//Mongoose connection
mongoose.connect(config.db);

//This callback is triggered once the connection is established with MongoDB
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

// Instantiate Routes
const router        = require('./app/router/router')(app);

// Init Passport
const passportInit  = require('./app/config/passport.js')(passport);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log('Express App Listening on port: ' + port);

module.exports = app;
