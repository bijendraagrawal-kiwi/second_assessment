const express = require('express');

const userRouter = express.Router();
const {
  signup,
  login,
  assignBookToStudent,
  submitAsignbook,
  userAsignBook,
  userExpireBooks,
} = require('../controller/userController');
const {
  studentVerification,
} = require('../validation/validation');
const { uploadfile } = require('../utils/student.utils');

userRouter.post('/signup', uploadfile.single('student-file'), signup);
userRouter.get('/login', login);
userRouter.put('/asignbook', studentVerification, assignBookToStudent);
userRouter.put('/submitbook', studentVerification, submitAsignbook);
userRouter.get('/getasignbooks', studentVerification, userAsignBook);
userRouter.get('/expirebook', studentVerification, userExpireBooks);
module.exports = {
  userRouter,
};
