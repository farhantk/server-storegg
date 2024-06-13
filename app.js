var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dd = require('dump-die')
var methodOverride = require('method-override')
var session = require('express-session')
var flash = require('connect-flash');
const bodyParser = require('body-parser');
var cors = require('cors')


var DashboardRouter = require('./app/Dashboard/router');
var CategoryRouter = require('./app/Category/router');
var BankRouter = require('./app/Bank/router');
var NominalRouter = require('./app/Nominal/router');
var PaymentRouter = require('./app/Payment/router');
var VoucherRouter = require('./app/Voucher/router');
var UsersRouter = require('./app/Users/router');
var TransactionRouter = require('./app/Transaction/router');

//api
var PlayerRouter = require('./app/Player/router');
var AuthRouter = require('./app/Auth/router');

var app = express();
const URL = `/api/v1`
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))
app.use(flash());
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')))

app.use('/', UsersRouter);
app.use('/dashboard', DashboardRouter);
app.use('/category', CategoryRouter);
app.use('/bank', BankRouter);
app.use('/nominal', NominalRouter);
app.use('/payment', PaymentRouter);
app.use('/voucher', VoucherRouter);
app.use('/transaction', TransactionRouter);

//api
app.use(`${URL}/auth`, AuthRouter);
app.use(`${URL}/players`, PlayerRouter);

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
