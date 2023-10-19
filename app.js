const express = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const gymRouter = require('./routes/gymRouter');
const reqRouter = require('./routes/reqRouter');
const app = express();
const AppError = require('./utils/appError');
//Middlewares
app.use(express.json()); // For req.body

//Routers
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/posts/', postRouter);
app.use('/api/v1/gyms/', gymRouter);
app.use('/api/v1/reqs/', reqRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
