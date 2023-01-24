const student = require('../schema/studentSchema');
const constant = require('../constant/constant');
const { passwordEncrypt, comparePassword } = require('../utils/student.utils');

let studentObject;
const studentSignup = async (req) => {
  const encryptedPassword = passwordEncrypt(req.body.password);
  studentObject = new student({
    roll_number: req.body.roll_number,
    name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    address: req.body.address,
    password: encryptedPassword,
  });
  const studentSave = await studentObject.save();
  return studentSave;
};

const studentLogin = async (req) => {
  studentObject = await student.findOne({ email: req.body.email });
  if (studentObject == null) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  const compare = await comparePassword(req.body.password, studentObject.password);
  return compare;
};

const studentUpdate = async (req) => {
  const encryptedUpdatePassword = passwordEncrypt(req.body.password);
  studentObject = await student.findOneAndUpdate({ email: req.body.email }, {
    $set: {
      roll_number: req.body.roll_number,
      name: req.body.name,
      contact_number: req.body.contact_number,
      email: req.body.email,
      address: req.body.address,
      password: encryptedUpdatePassword,
    },
  });
  if (studentObject == null) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  return constant.STUDENT_UPDATE_SUCCESS;
};

const studentdelete = async (req) => {
  studentObject = await student.deleteOne({ email: req.body.email });
  if (studentObject.deletedCount === 0) {
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
