const admin = require('../schema/studentSchema');
const permission = require('../schema/permissionSchema');

let adminObject;
const isAdminDelete = async (req, res, next) => {
  adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
  if (adminObject.isadmin === true) {
    res.locals.admin = true;
    next();
  } else {
    const subAdminObject = await permission.findOne({
      email: req.body.adminEmail,
      permissionType: req.body.permissionType,
    });
    if (subAdminObject.permissionType === 'delete') {
      res.locals.admin = true;
      next();
    } else {
      res.locals.admin = false;
      next();
    }
  }
};

const isAdminUpdate = async (req, res, next) => {
  adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
  if (adminObject.isadmin === true) {
    res.locals.admin = true;
    next();
  } else {
    const subAdminObject = await permission.findOne({
      email: req.body.adminEmail,
      permissionType: req.body.permissionType,
    });
    if (subAdminObject.permissionType === 'update') {
      res.locals.admin = true;
      next();
    } else {
      res.locals.admin = false;
      next();
    }
  }
};

const isAdmin = async (req, res, next) => {
  adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
  if (adminObject.isadmin === true) {
    res.locals.admin = true;
    next();
  } else {
    res.locals.admin = false;
    next();
  }
};

module.exports = {
  isAdminDelete,
  isAdminUpdate,
  isAdmin,
};
