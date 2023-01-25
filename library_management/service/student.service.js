const { studentModel } = require('../schema/studentSchema');
const constant = require('../constant/constant');
const { passwordEncrypt, comparePassword } = require('../utils/student.utils');

let studentObject;
const studentSignup = async (req) => {
  const encryptedPassword = await passwordEncrypt(req.body.password);
  studentObject = new studentModel({
    roll_number: req.body.roll_number,
    name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    address: req.body.address,
    password: encryptedPassword,
    isadmin: req.body.isadmin,
  });
  const studentSave = await studentObject.save();
  return studentSave;
};

const studentLogin = async (req) => {
  studentObject = await studentModel.findOne({ email: req.body.email });
  if (studentObject == null) {
    return constant.STUDENT_NOT_EXIST_ERROR;
  }
  const compare = await comparePassword(req.body.password, studentObject.password);
  return compare;
};

const studentUpdate = async (req, res) => {
  if (res.locals.admin) {
    const encryptedUpdatePassword = await passwordEncrypt(req.body.password);
    studentObject = await studentModel.findOneAndUpdate({ email: req.body.email }, {
      $set: {
        roll_number: req.body.roll_number,
        name: req.body.name,
        contact_number: req.body.contact_number,
        email: req.body.updatedEmail,
        address: req.body.address,
        password: encryptedUpdatePassword,
      },
    });
    console.log(studentObject);
    if (studentObject == null) {
      return constant.STUDENT_NOT_EXIST_ERROR;
    }
    return constant.STUDENT_UPDATE_SUCCESS;
  }
  return constant.NOT_ADMIN;
};

const studentdelete = async (req) => {
  studentObject = await studentModel.deleteOne({ email: req.body.email });
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
