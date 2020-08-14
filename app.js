var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var upload=require("express-fileupload")
var pdffile=require("./mongodb/pdf")

var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeerouter=require('./routes/employee');
var employerrouter=require('./routes/employer');
const mongoose = require('mongoose');
const { createIndexes } = require('./mongodb/jobcrud');

var app = express();
app.use(upload());
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/application.html")
})
app.post("/",function(req,res){
  console.log("hello");
  if(req.files){
    console.log(req.files);
    var file=req.files.myfile;
   
    console.log(file);
   
    myfile=file.name
     
    var resume = new pdffile({
     
     
      pdf:file.name
      });
  resume.save().then(doc => res.send("applied")).catch(err => res.send(err));

  file.mv("./upload/"+myfile,function(err){
    if(err){
      res.send(404,"not valid file");

    }
   console.log("h")
  })
}
})
app.use('/', indexRouter);
app.use('/loginemployer',employerrouter);
app.use('/loginemployee',employeerouter);
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
