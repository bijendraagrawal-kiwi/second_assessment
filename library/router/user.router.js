const express = require('express');

const userRouter = express.Router();
const {
  signup,
  login,
  updatestudent,
  deleteStudent,
} = require('../controller/userController');
const {
  studentVerification, adminVerification,
} = require('../validation/validation');
const { uploadfile } = require('../utils/student.utils');

userRouter.post('/signup', uploadfile.single('student-file'), signup);
userRouter.get('/login', login);
// userRouter.post('/admin', createLibraryAdmin);
// userRouter.get('/adminlogin', libraryAdminLogin);
userRouter.put('/update', adminVerification, updatestudent);
userRouter.delete('/delete', adminVerification, deleteStudent);
userRouter.put('/asignbook', studentVerification, assignBookToStudent);
// userRouter.put('/submitbook', studentVerification, submitAsignbook);
// userRouter.get('/getasignbooks', studentVerification, userAsignBook);
// userRouter.get('/expirebook', studentVerification, userExpireBooks);
// userRouter.get('/bookhistory', adminVerification, showHistoryOfBook);
module.exports = {
  userRouter,
};
