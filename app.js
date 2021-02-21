var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mapRouter = require('./routes/map');
const chargerRouter = require('./routes/chargers');

var app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();
// Setting up mongoose
const uri = process.env.mongoose;
//global.db = (global.db ? global.db : mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }));
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);
app.use('/chargers', chargerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
