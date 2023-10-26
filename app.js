const express = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const gymRouter = require('./routes/gymRouter');
const reqRouter = require('./routes/reqRouter');
const app = express();
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
//Middlewares
app.use(express.json()); // For req.body

// Security Mechanisms
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Routers
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/posts/', postRouter);
app.use('/api/v1/gyms/', gymRouter);
app.use('/api/v1/reqs/', reqRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Error handler middleware
app.use(globalErrorHandler);
module.exports = app;
