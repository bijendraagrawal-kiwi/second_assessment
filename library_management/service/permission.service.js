const permission = require('../schema/permissionSchema');
const { constant } = require('../constant/constant');
const { findPermission } = require('../utils/student.utils');

const createPermission = async (req) => {
  const { userId, permissionType } = req.body;
  const isPermissionPresent = findPermission(userId, permissionType);
  if (!isPermissionPresent.error) {
    if (!isPermissionPresent) {
      const permissionObject = new permission({
        userId,
        permissionType,
      });
      const result = await permissionObject.save();
      return result;
    }
    return constant.PERMISSION_ALREADY_GIVEN;
  }
  return isPermissionPresent.error;
};

const deletePermission = async (req) => {
  const { userId, permissionType } = req.body;
  const permissionObject = await permission.findOneAndDelete({ userId, permissionType });
  if (permissionObject.deletedCount) {
    return constant.DELETE_SUCCESSFULLY;
  }
  return constant.NOTHING_FOR_DELETE;
};

const upadtePermission = async (req) => {
  const { userId, permissionType } = req.body;
  const permissionObject = await permission.findByIdAndUpdate({ userId }, {
    $set: {
      permissionType,
    },
  });
  if (permissionObject == null) {
    return constant.PERMISSION_NOT_EXIST_ERROR;
  }
  return constant.PERMISSION_UPDATE_SUCCESS;
};

module.exports = {
  createPermission,
  deletePermission,
  upadtePermission,
};
