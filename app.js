var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ValidateRouter = require('./routes/ValidateUserCredentials');
var ProductDataRouter = require('./routes/ProductDetails');
var newUserRegistrationRouter=require('./routes/newuserSignup');
var UserAccountdeleteRouter = require('./routes/DeletingUseraccount');
var CheckUserLoginRouter = require('./routes/CheckUserLogin');
var UserLogoutRouter = require('./routes/UserLogout');
var UploadDataRouter =  require('./routes/Uploaddata');
var UpdataProductDataWithImagesRouter = require('./routes/UpdatingProductdetailswithImages');



var app = express();
var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({ secret:'kjhkjhk', cookie:{ maxAge:1000000}}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/user/login',ValidateRouter);
app.use('/get/Productdata',ProductDataRouter);
app.use('/newuser/registration',newUserRegistrationRouter);
app.use('/user/account/delete',UserAccountdeleteRouter);
app.use('/check/user/login',CheckUserLoginRouter);
app.use('/user/Logout',UserLogoutRouter);
app.use('/upload/data',UploadDataRouter);
app.use('/upload/product/data/dynamically',UpdataProductDataWithImagesRouter);

app.listen(8081,()=>{
  console.log("server is listening at 8081");
})

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
