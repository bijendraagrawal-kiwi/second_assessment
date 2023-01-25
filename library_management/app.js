require('dotenv').config();
const express = require('express');
require('./connection/connection');
const bodyParser = require('body-parser');
const { userRouter } = require('./router/user.router');
const { subAdmin } = require('./router/sub.admin.router');
const { bookRouter } = require('./router/book.router');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(subAdmin);
app.use(bookRouter);
app.listen(process.env.PORT);
