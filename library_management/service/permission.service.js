const permission = require('../schema/permissionSchema');
const constant = require('../constant/constant');

let permissionObject;
const createPermission = async (req) => {
  permissionObject = new permission({
    email: req.body.email,
    permissionType: req.body.permissionType,
  });
  const result = await permissionObject.save();
  return result;
};

const deletePermission = async (req) => {
  permissionObject = await permission.findOneAndDelete({ email: req.body.email });
  if (permissionObject.deletedCount === 0) {
    return constant.NOTHING_FOR_DELETE;
  }
  return constant.DELETE_SUCCESSFULLY;
};

const upadtePermission = async (req) => {
  permissionObject = await permission.findByIdAndUpdate({ email: req.body.email }, {
    $set: {
      permissionType: req.body.permissionType,
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
