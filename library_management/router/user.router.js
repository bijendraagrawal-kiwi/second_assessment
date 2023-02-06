const express = require('express');

const userRouter = express.Router();
const {
  signup,
  login,
  updatestudent,
  deleteStudent,
  assignBookToStudent,
  submitAsignbook,
  userAsignBook,
  userExpireBooks,
  createLibraryAdmin,
  libraryAdminLogin,
  showHistoryOfBook,
} = require('../controller/userController');
const {
  studentVerification, updateAdminVerification, deleteAdminVerification, adminVerification,
} = require('../validation/validation');
const { uploadfile } = require('../utils/student.utils');

userRouter.post('/signup', uploadfile.single('student-file'), signup);
userRouter.get('/login', login);
userRouter.post('/admin', createLibraryAdmin);
userRouter.get('/adminlogin', libraryAdminLogin);
userRouter.put('/update', updateAdminVerification, updatestudent);
userRouter.delete('/delete', deleteAdminVerification, deleteStudent);
userRouter.put('/asignbook', studentVerification, assignBookToStudent);
userRouter.put('/submitbook', studentVerification, submitAsignbook);
userRouter.get('/getasignbooks', studentVerification, userAsignBook);
userRouter.get('/expirebook', studentVerification, userExpireBooks);
userRouter.get('/bookhistory', adminVerification, showHistoryOfBook);
module.exports = {
  userRouter,
};
