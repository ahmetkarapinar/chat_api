const express = require('express');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const app = express();
//Middlewares
app.use(express.json());

//Routers
app.use('/api/v1/users', userRouter);
app.use('api/v1/posts/', postRouter);
module.exports = app;
