var createError = require('http-errors');
var express = require('express');
var path = require('path');
var compression = require('compression')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var {connectDB} = require("./config/db");
connectDB();
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var genresRouter = require('./routes/genres');
var subtitlesRouter = require('./routes/subtitles');
var photosRouter = require('./routes/photos');
var customersRouter = require('./routes/customers');
var sessionsRouter = require('./routes/sessions');
var managerRolesRouter = require('./routes/managerRoles');
var watchLatersRouter = require('./routes/watchLaters');
var watchHistoryRouter = require('./routes/watchHistory');
var managersRouter = require('./routes/managers');
var moviesRouter = require('./routes/movies');
var seriesRouter = require('./routes/series');
var seasonsRouter = require('./routes/seasons');
var episodesRouter = require('./routes/episodes');
var reviewsRouter = require('./routes/reviews');
var plansRouter = require('./routes/plans');
var commentsRouter = require('./routes/comments');
var subscriptionsRouter = require('./routes/subscriptions');
var momosRouter = require('./routes/momos');
var zalosRouter = require('./routes/zalos');
var paypalRouter = require('./routes/paypal');
var stripesRouter = require('./routes/stripes');
var dashboardRouter = require('./routes/dashboard');

var app = express();

app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/sessions', sessionsRouter);
app.use('/genres', genresRouter);
app.use('/subtitles', subtitlesRouter);
app.use('/photos', photosRouter);
app.use('/movies', moviesRouter);
app.use('/customers', customersRouter);
app.use('/manager-roles', managerRolesRouter);
app.use('/watch-laters', watchLatersRouter);
app.use('/watch-history', watchHistoryRouter);
app.use('/managers', managersRouter);
app.use('/series', seriesRouter);
app.use('/seasons', seasonsRouter);
app.use('/episodes', episodesRouter);
app.use('/reviews', reviewsRouter);
app.use('/momos', momosRouter);
app.use('/zalos', zalosRouter);
app.use('/paypal', paypalRouter);
app.use('/stripes', stripesRouter);
app.use('/plans', plansRouter);
app.use('/comments', commentsRouter);
app.use('/subscriptions', subscriptionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(createError);
});

module.exports = app;
