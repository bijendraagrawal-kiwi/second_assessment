const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const multer = require('multer');
// const { constant } = require('../constant/constant');
const { studentModel } = require('../schema/studentSchema');
const permission = require('../schema/permissionSchema');
const book = require('../schema/bookSchema');

const passwordEncrypt = async (userPassword) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(userPassword, salt);
    return securePassword;
  } catch (err) {
    return {
      status: 404,
      message: err,
    };
  }
};

const comparePassword = async (userPassword, bcryptPassword) => {
  try {
    const result = await bcryptjs.compare(userPassword, bcryptPassword);
    return result;
  } catch (err) {
    return { error: err };
  }
};

const findadmin = async (email) => {
  try {
    const adminObject = await studentModel.findOne({ email });
    return adminObject;
  } catch (err) {
    return { error: err };
  }
};

const findStudent = async (email) => {
  try {
    const studentObject = await studentModel.findOne({ email });
    return studentObject;
  } catch (err) {
    return { status: 404, error: err };
  }
};

const findPermission = async (_id) => {
  try {
    const permissionObject = await permission.findOne({ userId: _id });
    if (!permissionObject) {
      return false;
    }
    return permissionObject.permissionType;
  } catch (err) {
    return { error: err };
  }
};

const findBook = async (bookName, authorName) => {
  try {
    const bookObject = await book.findOne({ bookName, authorName });
    return bookObject;
  } catch (err) {
    return {
      status: 404,
      message: err,
    };
  }
};

const findAsignedBook = async (email, _id) => {
  const studentObject = await studentModel.findOne({ email, 'asignedbook.bookId': _id });
  return studentObject;
};

const uploadfile = multer({
  storage: multer.diskStorage({

    destination: (req, file, callback) => {
      callback(null, 'upload/');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});

module.exports = {
  passwordEncrypt,
  comparePassword,
  findadmin,
  findStudent,
  findPermission,
  findBook,
  findAsignedBook,
  uploadfile,
};
