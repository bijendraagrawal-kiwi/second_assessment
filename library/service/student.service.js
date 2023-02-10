const jwt = require('jsonwebtoken');
const { studentModel } = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const {
  passwordEncrypt,
  comparePassword,
  findStudent,
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
    return studentSave;
  }
  if (!student.error) {
    return constant.STUDENT_ALREADY_PRESENT;
  }
  return student.error;
};

const studentLogin = async (req) => {
  const { email, password } = req;
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

module.exports = {
  studentSignup,
  studentLogin,
  studentUpdate,
  studentdelete,
};
