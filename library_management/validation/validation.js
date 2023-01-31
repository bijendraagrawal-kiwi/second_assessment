const jwt = require('jsonwebtoken');
const { constant, permission } = require('../constant/constant');
const { subAdminVerification } = require('../utils/student.utils');

const studentVerification = async (req, res, next) => {
  const { token } = req.body;
  try {
    const studentObject = jwt.verify(token, constant.STUDENT_PRIVATE_KEY);
    res.locals.student = studentObject;
    next();
  } catch (err) {
    res.send(err);
  }
};

const updateAdminVerification = async (req, res, next) => {
  const { token } = req.body;
  try {
    res.locals.admin = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
    next();
  } catch (err) {
    try {
      const subAdmin = await subAdminVerification(token);
      if (subAdmin.permission === permission.UPDATE) {
        next();
      }
      res.send(constant.PERMISSION_NOT_EXIST_ERROR);
    } catch (error) {
      res.send(error);
    }
  }
};

const deleteAdminVerification = async (req, res, next) => {
  const { token } = req.body;
  try {
    res.locals.admin = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
    next();
  } catch (err) {
    try {
      const subAdmin = await subAdminVerification(token);
      if (subAdmin.permission === permission.DELETE) {
        next();
      }
      res.send(constant.PERMISSION_NOT_EXIST_ERROR);
    } catch (error) {
      res.send(error);
    }
  }
};

const adminVerification = async (req, res, next) => {
  const { token } = req.body;
  try {
    res.locals.admin = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  studentVerification,
  updateAdminVerification,
  deleteAdminVerification,
  adminVerification,
};
