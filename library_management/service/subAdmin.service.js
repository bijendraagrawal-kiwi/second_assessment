const subAdmin = require('../schema/studentSchema');
const subAdminPermission = require('../schema/permissionSchema');
const constant = require('../constant/constant');
const { passwordEncrypt } = require('../utils/student.utils');

const createSubAdmin = async (req) => {
  const encryptedPassword = passwordEncrypt(req.body.password);
  const subAdminResult = new subAdmin({
    name: req.body.name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    address: req.body.address,
    password: encryptedPassword,
  });
  await subAdminResult.save();

  const subAdminPermissionResult = new subAdminPermission({
    email: req.body.email,
    permissionType: req.body.permissionType,
  });
  await subAdminPermissionResult.save();
  return constant.SUB_ADMIN_CREATED;
};
module.exports = {
  createSubAdmin,
};
