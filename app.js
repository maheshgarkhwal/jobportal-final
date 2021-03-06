var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var upload=require("express-fileupload")
var pdffile=require("./mongodb/pdf")
const helmet = require("helmet");
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeerouter=require('./routes/employee');
var employerrouter=require('./routes/employer');
const mongoose = require('mongoose');
const { createIndexes } = require('./mongodb/jobcrud');

var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
 
var options = {
  explorer: true
};
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(upload());
mongoose.connect('mongodb://localhost/mydata', { useNewUrlParser: true ,useUnifiedTopology:true});
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection established");
})
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use('/employer',employerrouter);
app.use('/employee',employeerouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
