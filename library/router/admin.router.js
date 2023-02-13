const express = require('express');
const { adminVerification } = require('../validation/validation');
const {
  updateStudent,
  deleteStudent,
  createLibraryAdmin,
  libraryAdminLogin,
  showHistoryOfBook,
  addBookController,
  deleteBookController,
  permissionCreate,
  permissionDelete,

} = require('../controller/adminController');

const adminRouter = express.Router();
adminRouter.post('/admin', createLibraryAdmin);
adminRouter.get('/adminlogin', libraryAdminLogin);
adminRouter.put('/update', adminVerification, updateStudent);
adminRouter.delete('/delete', adminVerification, deleteStudent);
adminRouter.get('/bookhistory', adminVerification, showHistoryOfBook);
adminRouter.post('/addbook', adminVerification, addBookController);
adminRouter.delete('/deletebook', adminVerification, deleteBookController);
adminRouter.post('/givepermission', adminVerification, permissionCreate);
adminRouter.delete('/deletepermission', adminVerification, permissionDelete);
module.exports = {
  adminRouter,
};
