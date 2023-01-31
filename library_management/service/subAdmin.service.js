const jwt = require('jsonwebtoken');
const subAdmin = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const { passwordEncrypt, comparePassword, findStudent } = require('../utils/student.utils');

const createSubAdmin = async (req) => {
  const {
    email, name, contact, address, password,
  } = req.body;
  const encryptedPassword = await passwordEncrypt(password);
  const isSubAdminPresent = await findStudent(email);
  if (!isSubAdminPresent.error) {
    if (!isSubAdminPresent) {
      const subAdminResult = new subAdmin.studentModel({
        name,
        contact,
        email,
        address,
        password: encryptedPassword,
        issubadmin: true,
      });
      const result = await subAdminResult.save();
      return result;
    }
    return constant.SUB_ADMIN_ALREADY_EXIST;
  }
  return isSubAdminPresent.error;
};

const subAdminLogin = async (req) => {
  const { email, password } = req.body;
  const subAdminObject = await subAdmin.studentModel.findOne({ email });
  if (!subAdminObject) {
    if (subAdminObject.issubadmin) {
      const compare = await comparePassword(password, subAdminObject.password);
      if (compare) {
        return jwt.sign({ email }, constant.ADMIN_PRIVATE_KEY);
      }
      return constant.PASSWORD_NOT_MATCH;
    }
    return constant.NOT_SUB_ADMIN;
  }
  return constant.STUDENT_NOT_EXIST_ERROR;
};

module.exports = {
  createSubAdmin,
  subAdminLogin,
};
