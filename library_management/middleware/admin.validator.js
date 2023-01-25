const admin = require('../schema/studentSchema');

let adminObject;
const isAdmin = async (req, res, next) => {
  adminObject = await admin.studentModel.findOne({ email: req.body.adminEmail });
  console.log(adminObject);
  if (adminObject.isadmin === true) {
    res.locals.admin = true;
    next();
  } else {
    res.locals.admin = false;
    next();
  }
};

module.exports = {
  isAdmin,
};
