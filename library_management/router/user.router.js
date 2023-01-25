const express = require('express');

const userRouter = express.Router();
const { signup, login, updatestudent } = require('../controller/userController');
const { isAdmin } = require('../middleware/admin.validator');

userRouter.post('/signup', signup);
userRouter.get('/login', login);
userRouter.put('/update', isAdmin, updatestudent);

module.exports = {
  userRouter,
};
