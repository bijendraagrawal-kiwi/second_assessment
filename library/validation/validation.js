const jwt = require('jsonwebtoken');
const { constant } = require('../constant/constant');
const { findStudent, findPermission } = require('../utils/student.utils');

const studentVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(404).send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const studentObject = jwt.verify(token, constant.STUDENT_PRIVATE_KEY);
      req.body.email = studentObject.email;
      next();
    } catch (err) {
      res.status(404).send(err);
    }
  }
};

const subAdminVerification = async (req, res, next) => {
  const { admin } = req.body;
  if (admin.issubadmin) {
    const permission = await findPermission(admin._id);
    if (permission && !permission.error) {
      permission.forEach((per) => {
        if (per === req.body.task) {
          next();
        }
      });
    }
    if (permission.error) {
      res.status(404).send(permission.error);
    }
  }
  res.status(401).send('you  have not permission');
};

const adminVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(404).send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const tokenObject = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
      const admin = await findStudent(tokenObject.email);
      req.body.admin = admin;
      if (admin.isadmin) {
        next();
      } else {
        subAdminVerification(req, res, next);
      }
    } catch (err) {
      res.status(404).send(err);
    }
  }
};

module.exports = {
  studentVerification,
  adminVerification,
};
