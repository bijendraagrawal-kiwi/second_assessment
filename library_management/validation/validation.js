const jwt = require('jsonwebtoken');
const { constant, permission } = require('../constant/constant');
const { subAdminVerification } = require('../utils/student.utils');

const studentVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const studentObject = jwt.verify(token, constant.STUDENT_PRIVATE_KEY);
      req.body.email = studentObject.email;
      next();
    } catch (err) {
      res.send(err);
    }
  }
};

const updateAdminVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
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
  }
};

const deleteAdminVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      res.locals.admin = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
      next();
    } catch (err) {
      try {
        const subAdmin = await subAdminVerification(token);
        if (subAdmin.permission === permission.DELETE) {
          next();
        }
        res.status(404).send(constant.PERMISSION_NOT_EXIST_ERROR);
      } catch (error) {
        res.status(404).send(error);
      }
    }
  }
};

const adminVerification = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(404).send(constant.LOGIN_FIRST);
  } else {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const tokenObject = jwt.verify(token, constant.ADMIN_PRIVATE_KEY);
      req.body.email = tokenObject.email;
      next();
    } catch (err) {
      res.status(404).send(err);
    }
  }
};

module.exports = {
  studentVerification,
  updateAdminVerification,
  deleteAdminVerification,
  adminVerification,
};
