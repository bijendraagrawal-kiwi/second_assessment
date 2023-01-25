const express = require('express');

const userRouter = express.Router();
const {
  signup,
  login,
  updatestudent,
  deleteStudent,
} = require('../controller/userController');
const { isAdminUpdate, isAdminDelete } = require('../middleware/admin.validator');

userRouter.post('/signup', signup);
userRouter.get('/login', login);
userRouter.put('/update', isAdminUpdate, updatestudent);
userRouter.delete('/delete', isAdminDelete, deleteStudent);

module.exports = {
  userRouter,
};
