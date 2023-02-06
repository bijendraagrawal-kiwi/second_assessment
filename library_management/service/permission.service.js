const permission = require('../schema/permissionSchema');
const { constant } = require('../constant/constant');
const { findPermission } = require('../utils/student.utils');

const createPermission = async (req) => {
  const { userId, permissionType } = req.body;
  const isPermissionPresent = await findPermission(userId, permissionType);
  if (!isPermissionPresent) {
    const permissionObject = new permission({
      userId,
      permissionType,
    });
    const result = await permissionObject.save();
    return result;
  }
  if (!isPermissionPresent.error) {
    return constant.PERMISSION_ALREADY_GIVEN;
  }
  return isPermissionPresent.error;
};

const deletePermission = async (req) => {
  const { userId, permissionType } = req.body;
  const permissionObject = await permission.findOneAndDelete({ userId, permissionType });
  console.log(permissionObject);
  if (!permissionObject) {
    return constant.NOTHING_FOR_DELETE;
  }
  return constant.DELETE_SUCCESSFULLY;
};

module.exports = {
  createPermission,
  deletePermission,
};
