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

const app = express();

// view engine setup
app.set('views', (__dirname + '/app/views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout',
                                layoutsDir: __dirname + '/app/views/layouts'}));

app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, './app/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './app/public')));

//Mongoose connection
//Use node promises instead of mongoose
mongoose.Promise = global.Promise;

//Connecting MongoDB using mongoose to our application
mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

//Creating routes
var users   = require('./app/controllers/users.js');
var index = require('./app/controllers/index.js');
app.use('/users', users);
app.use('/', index);


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
console.log('Listening on port ' + port);

module.exports = app;
