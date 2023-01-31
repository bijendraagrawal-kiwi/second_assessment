const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { studentModel } = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const {
  passwordEncrypt, comparePassword, findStudent,
} = require('../utils/student.utils');
const { findbook } = require('../utils/student.utils');

const findasignedbook = async (req) => {
  const { email, _id } = req.body;
  const studentObject = await studentModel.findOne({ email, 'asignedbook.bookId': _id });
  return studentObject;
};

const studentSignup = async (req) => {
  const {
    address, password, rollNumber, name, contact, email,
  } = req.body;
  const student = findStudent(email);
  if (!student.error) {
    if (!student) {
      const encryptedPassword = await passwordEncrypt(password);
      const studentObject = new studentModel({
        rollNumber,
        name,
        contact,
        email,
        address,
        password: encryptedPassword,
        profile: {
          data: fs.readFileSync(path.join(__dirname, '../upload/', req.file.filename)),
          contentType: 'text/image',
        },
      });
      const studentSave = await studentObject.save();
      return studentSave;
    }
    return constant.STUDENT_ALREADY_PRESENT;
  }
  return student.error;
};

const studentLogin = async (req) => {
  const { email, password } = req.body;
  const studentObject = await studentModel.findOne({ email });
  if (!studentObject) {
    const compare = await comparePassword(password, studentObject.password);
    if (compare) {
      return jwt.sign({ email }, constant.STUDENT_PRIVATE_KEY);
    }
    return constant.PASSWORD_NOT_MATCH;
  }
  return constant.STUDENT_NOT_EXIST_ERROR;
};

const studentUpdate = async (req) => {
  const {
    password, email, contact, address, rollNumber, name,
  } = req.body;
  const encryptedUpdatePassword = await passwordEncrypt(password);
  const studentObject = await studentModel.findOneAndUpdate({ email }, {
    $set: {
      rollNumber,
      name,
      contact,
      address,
      password: encryptedUpdatePassword,
    },
  });
  if (!studentObject) {
    return constant.STUDENT_UPDATE_SUCCESS;
  }
  return constant.STUDENT_NOT_EXIST_ERROR;
};

const studentdelete = async (req) => {
  const { email } = req.body;
  const studentObject = await studentModel.findOneAndDelete({ email });
  if (studentObject.deletedCount) {
    return constant.DELETE_SUCCESSFULLY;
  }
  return constant.NOTHING_FOR_DELETE;
};

const assignBook = async (req, res) => {
  const requirebook = await findbook(req);
  if (!requirebook.error) {
    if (!requirebook) {
      return constant.BOOK_NOT_FIND;
    }
    const book = {
      books: requirebook._id,
    };
    const { email } = res.locals.student;
    const isBookAsign = await findasignedbook(req, requirebook._id);
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

const submitBook = async (req, res) => {
  const { bookName, authorName } = req.body;
  const { email } = res.locals;
  const bookId = await findbook(bookName, authorName);
  if (!bookId.error) {
    const studentObject = await studentModel.findOneAndUpdate({ email, 'asignedbook.bookId': bookId }, {
      $set: {
        'asignedbook.$.submitted': true,
      },
    });
    return studentObject;
  }
  return bookId.error;
};

const showUserAssignedBook = async (req, res) => {
  const { email } = res.locals;
  const asignbooks = await studentModel.findOne({ email }).populate('asignedbook.bookId');
  if (asignbooks.asignedbook.length) {
    return asignbooks;
  }
  return constant.NO_BOOK_ASSIGN;
};

const showExpireBooks = async (req, res) => {
  const { email } = res.locals;
  const asignbooks = await studentModel.aggregate([
    { $match: { email } },
    {
      $project: {
        $filter: {
          input: '$asignedbook',
          as: 'books',
          cond: { $gte: ['$$books.returnDate', '$$books.assignedDate'] },
        },
      },
    },
  ]);
  return (asignbooks);
};

const createAdmin = async (req) => {
  const { email, name, contact } = req.body;
  const admin = findStudent(email);
  if (!admin.error) {
    if (!admin) {
      const studentObject = new studentModel({
        name,
        email,
        contact,
        isadmin: true,
      });
      const result = await studentObject.save();
      return result;
    }
    return constant.ADMIN_ALREADY_PRESENT;
  }
  return admin.error;
};

const adminLogin = async (req) => {
  const { email, password } = req.body;
  const studentObject = await studentModel.findOne({ email });
  if (!studentObject) {
    const compare = await comparePassword(password, studentObject.password);
    if (compare) {
      return jwt.sign({ email }, constant.ADMIN_PRIVATE_KEY);
    }
    return constant.PASSWORD_NOT_MATCH;
  }
  return constant.STUDENT_NOT_EXIST_ERROR;
};

const bookHistory = async (req) => {
  const { bookId } = req.body;
  const bookHistoryObject = await studentModel.findOne({ 'asignedbook.bookId': bookId }).populate('asignedbook.bookId');
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
