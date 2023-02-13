const jwt = require('jsonwebtoken');
const {
  passwordEncrypt,
  findStudent,
  comparePassword,
  findBook,
} = require('../utils/student.utils');
const { constant } = require('../constant/constant');
const { studentModel } = require('../schema/studentSchema');
const book = require('../schema/bookSchema');

const studentUpdate = async (req) => {
  const {
    password, email, contact, address, rollNumber, name,
  } = req;
  const encryptedUpdatePassword = await passwordEncrypt(password);
  const student = await studentModel.findOne({ email });
  if (!student) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  try {
    studentModel.findOneAndUpdate({ email }, {
      $set: {
        rollNumber,
        name,
        contact,
        address,
        password: encryptedUpdatePassword,
      },
    });
    return constant.STUDENT_UPDATE_SUCCESS;
  } catch (err) {
    return err;
  }
};

const studentdelete = async (req) => {
  const { email } = req;
  const studentObject = await studentModel.findOneAndDelete({ email });
  if (!studentObject) {
    return constant.NOTHING_FOR_DELETE;
  }
  return constant.DELETE_SUCCESSFULLY;
};

const createAdmin = async (req) => {
  const {
    email, name, contact, address, password,
  } = req.body;
  const admin = await findStudent(email);
  if (!admin) {
    const encryptedPassword = await passwordEncrypt(password);
    const studentObject = new studentModel({
      name,
      email,
      contact,
      address,
      password: encryptedPassword,
      isadmin: true,
    });
    return await studentObject.save();
  }
  if (!admin.error) {
    return constant.ADMIN_ALREADY_PRESENT;
  }
  return admin.error;
};

const adminLogin = async (req) => {
  const { email, password } = req.body;
  const studentObject = await studentModel.findOne({ email });
  if (!studentObject) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  if (studentObject.isadmin) {
    const compare = await comparePassword(password, studentObject.password);
    if (compare) {
      return jwt.sign({ email }, constant.ADMIN_PRIVATE_KEY);
    }
    return constant.PASSWORD_NOT_MATCH;
  }
  return constant.NOT_ADMIN;
};

const bookHistory = async (req) => {
  const { _id } = req.body;
  const bookHistoryObject = await studentModel.findOne({ 'asignedbook.bookId': _id }).populate('asignedbook.bookId');
  return bookHistoryObject;
};

const addbook = async (req) => {
  const { bookId, bookName, authorName } = req.body;
  const isBookPresent = await findBook(bookName, authorName);
  if (!isBookPresent) {
    const bookObject = new book({
      bookId,
      bookName,
      authorName,
    });
    const result = await bookObject.save();
    return result;
  }
  if (!isBookPresent.error) {
    return constant.BOOK_ALREADY_PRESENT;
  }
  return isBookPresent.error;
};

const deletebook = async (req) => {
  const { bookId, bookName } = req.body;
  const bookObject = await book.findOneAndDelete({ bookId, bookName });
  if (bookObject) {
    return constant.BOOK_DELETE_SUCCESSFULLY;
  }
  return constant.NOTHING_FOR_DELETE;
};

module.exports = {
  studentUpdate,
  studentdelete,
  createAdmin,
  adminLogin,
  bookHistory,
  addbook,
  deletebook,
};
