const jwt = require('jsonwebtoken');
// const path = require('path');
// const fs = require('fs');
const { studentModel } = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const {
  passwordEncrypt, comparePassword, findStudent,
} = require('../utils/student.utils');
const { findBook } = require('../utils/student.utils');

const findasignedbook = async (email, _id) => {
  const studentObject = await studentModel.findOne({ email, 'asignedbook.bookId': _id });
  return studentObject;
};

const studentSignup = async (req) => {
  const {
    address, password, rollNumber, name, contact, email,
  } = req.body;
  const student = await findStudent(email);
  if (!student) {
    const encryptedPassword = await passwordEncrypt(password);
    const studentObject = new studentModel({
      rollNumber,
      name,
      contact,
      email,
      address,
      password: encryptedPassword,
      // profile: {
      //   data: fs.readFileSync(path.join(__dirname, '../upload/', req.file.filename)),
      //   contentType: 'text/image',
      // },
    });
    const studentSave = await studentObject.save();
    return studentSave;
  }
  if (!student.error) {
    return constant.STUDENT_ALREADY_PRESENT;
  }
  return student.error;
};

const studentLogin = async (req) => {
  const { email, password } = req.body;
  const studentObject = await studentModel.findOne({ email });
  if (!studentObject) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  const compare = await comparePassword(password, studentObject.password);
  if (compare) {
    return {
      token: jwt.sign({ email }, constant.STUDENT_PRIVATE_KEY),
    };
  }
  return constant.PASSWORD_NOT_MATCH;
};

const studentUpdate = async (req) => {
  const {
    password, email, contact, address, rollNumber, name,
  } = req.body;
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
  const { email } = req.body;
  const studentObject = await studentModel.findOneAndDelete({ email });
  if (!studentObject) {
    return constant.NOTHING_FOR_DELETE;
  }
  return constant.DELETE_SUCCESSFULLY;
};

const assignBook = async (req) => {
  const { bookName, authorName, email } = req.body;
  const requirebook = await findBook(bookName, authorName);
  if (!requirebook) {
    return constant.BOOK_NOT_FIND;
  }
  if (!requirebook.error) {
    const book = {
      bookId: requirebook._id,
    };
    const isBookAsign = await findasignedbook(email, requirebook._id);
    if (!isBookAsign) {
      const studentObject = await studentModel.findOneAndUpdate(
        { email },
        {
          $push:
          {
            asignedbook: book,
          },
        },
      );
      return studentObject;
    }
    return constant.BOOK_ASIGN;
  }
  return requirebook.error;
};

const submitBook = async (req) => {
  const { bookName, authorName, email } = req.body;
  const bookId = await findBook(bookName, authorName);
  if (!bookId) {
    return constant.BOOK_NOT_FIND;
  }
  if (!bookId.error) {
    const studentObject = await studentModel.findOneAndUpdate({ email, 'asignedbook.bookId': bookId._id }, {
      $set: {
        'asignedbook.$.submitted': true,
      },
    });
    return studentObject;
  }
  return bookId.error;
};

const showUserAssignedBook = async (req) => {
  const { email } = req.body;
  const asignbooks = await studentModel.findOne({ email }).populate('asignedbook.bookId');
  if (asignbooks.asignedbook.length) {
    return asignbooks;
  }
  return constant.NO_BOOK_ASSIGN;
};

const showExpireBooks = async (req) => {
  const { email } = req.body;
  try {
    const asignbooks = await studentModel.aggregate([
      { $match: { email } },
      {
        $project: {
          _id: 0,
          books: {
            $filter: {
              input: '$asignedbook',
              as: 'books',
              cond: { $lte: ['$$books.returnDate', Date.now()] },
            },
          },
        },
      },
    ]);
    return (asignbooks);
  } catch (err) {
    console.log(err);
    return (err);
  }
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

module.exports = {
  studentSignup,
  studentLogin,
  studentUpdate,
  studentdelete,
  assignBook,
  submitBook,
  showUserAssignedBook,
  showExpireBooks,
  createAdmin,
  adminLogin,
  bookHistory,
};
