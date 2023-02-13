const jwt = require('jsonwebtoken');
const subAdmin = require('../schema/studentSchema');
const { constant } = require('../constant/constant');
const { passwordEncrypt, comparePassword, findStudent } = require('../utils/student.utils');

const createSubAdmin = async (req) => {
  const {
    subadminemail, name, contact, address, password,
  } = req.body;
  const encryptedPassword = await passwordEncrypt(password);
  const isSubAdminPresent = await findStudent(subadminemail);
  if (!isSubAdminPresent) {
    const subAdminResult = new subAdmin.studentModel({
      name,
      contact,
      email: subadminemail,
      address,
      password: encryptedPassword,
      issubadmin: true,
    });
    const result = await subAdminResult.save();
    return {
      status: 200,
      message: result,
    };
  }
  if (!isSubAdminPresent.error) {
    return {
      status: 401,
      message: constant.SUB_ADMIN_ALREADY_EXIST,
    };
  }
  return {
    status: 404,
    message: isSubAdminPresent.error,
  };
};

const subAdminLogin = async (req) => {
  const { email, password } = req.body;
  const subAdminObject = await subAdmin.studentModel.findOne({ email });
  if (!subAdminObject) {
    return {
      status: 404,
      message: constant.STUDENT_NOT_EXIST_ERROR,
    };
  }
  if (subAdminObject.issubadmin) {
    const compare = await comparePassword(password, subAdminObject.password);
    if (compare) {
      return {
        status: 200,
        message: jwt.sign({ email }, constant.ADMIN_PRIVATE_KEY),
      };
    }
    return {
      status: 401,
      message: constant.PASSWORD_NOT_MATCH,
    };
  }
  return {
    status: 404,
    message: constant.NOT_SUB_ADMIN,
  };
};

module.exports = {
  createSubAdmin,
  subAdminLogin,
};
