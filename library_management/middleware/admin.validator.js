const admin = require('../schema/studentSchema');
const permission = require('../schema/permissionSchema');
const { constant } = require('../constant/constant');

const isAdminDelete = async (req, res, next) => {
  const adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
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
  const adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
  if (adminObject.isadmin) {
    next();
  } else {
    res.send(constant.NOT_ADMIN);
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.body;
  const adminObject = await admin.studentModel.findOne({ email });
  if (adminObject.isadmin) {
    next();
  } else {
    res.send(constant.NOT_ADMIN);
  }
};

module.exports = {
  isAdminDelete,
  isAdminUpdate,
  isAdmin,
};
