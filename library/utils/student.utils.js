const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const { constant } = require('../constant/constant');
const { studentModel } = require('../schema/studentSchema');
const permission = require('../schema/permissionSchema');
// const book = require('../schema/bookSchema');

const passwordEncrypt = async (userPassword) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(userPassword, salt);
    return securePassword;
  } catch (err) {
    return { error: err };
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
    return { error: err };
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

module.exports = {
  passwordEncrypt,
  comparePassword,
  findadmin,
  findStudent,
  findPermission,
};
