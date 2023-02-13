const jwt = require('jsonwebtoken');
const { studentModel } = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const {
  passwordEncrypt,
  comparePassword,
  findStudent,
  findBook,
  findAsignedBook,
} = require('../utils/student.utils');

const studentSignup = async (req) => {
  const {
    address, password, rollNumber, name, contact, email,
  } = req;
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
    });
    const studentSave = await studentObject.save();
    return {
      status: 200,
      message: studentSave,
    };
  }
  if (!student.error) {
    return {
      status: 404,
      message: constant.STUDENT_ALREADY_PRESENT,
    };
  }
  console.log('bijendra');
  return {
    status: 404,
    message: student.error,
  };
};

const studentLogin = async (req) => {
  const { email, password } = req;
  const studentObject = await studentModel.findOne({ email });
  if (!studentObject) {
    return {
      status: 404,
      message: constant.STUDENT_NOT_EXIST_ERROR,
    };
  }
  const compare = await comparePassword(password, studentObject.password);
  if (compare) {
    return {
      status: 200,
      message: jwt.sign({ email }, constant.STUDENT_PRIVATE_KEY),
    };
  }
  return {
    status: 401,
    message: constant.PASSWORD_NOT_MATCH,
  };
};

const assignBook = async (req) => {
  const { bookName, authorName, email } = req.body;
  const requirebook = await findBook(bookName, authorName);
  if (!requirebook) {
    return {
      status: 404,
      message: constant.BOOK_NOT_FIND,
    };
  }
  if (!requirebook.error) {
    const book = {
      bookId: requirebook._id,
    };
    const isBookAsign = await findAsignedBook(email, requirebook._id);
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
      return {
        status: 200,
        message: studentObject,
      };
    }
    return {
      status: 403,
      message: constant.BOOK_ASIGN,
    };
  }
  return {
    status: 403,
    message: requirebook.error,
  };
};

const submitBook = async (req) => {
  const { bookName, authorName, email } = req.body;
  const bookId = await findBook(bookName, authorName);
  if (!bookId) {
    return {
      status: 404,
      message: constant.BOOK_NOT_FIND,
    };
  }
  if (!bookId.error) {
    const studentObject = await studentModel.findOneAndUpdate({ email, 'asignedbook.bookId': bookId._id }, {
      $set: {
        'asignedbook.$.submitted': true,
      },
    });
    return {
      status: 200,
      message: studentObject,
    };
  }
  return bookId.error;
};

const showUserAssignedBook = async (req) => {
  const { email } = req.body;
  const asignbooks = await studentModel.findOne({ email }).populate('asignedbook.bookId');
  if (asignbooks.asignedbook.length) {
    return {
      status: 200,
      message: asignbooks.asignedbook,
    };
  }
  return {
    status: 404,
    message: constant.NO_BOOK_ASSIGN,
  };
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
    if (asignbooks[0].books.length) {
      return {
        status: 200,
        message: asignbooks,
      };
    }
    return {
      status: 404,
      message: constant.NO_BOOK_EXPIRE,
    };
  } catch (err) {
    return {
      status: 403,
      message: err,
    };
  }
};

module.exports = {
  studentSignup,
  studentLogin,
  assignBook,
  submitBook,
  showUserAssignedBook,
  showExpireBooks,
};
