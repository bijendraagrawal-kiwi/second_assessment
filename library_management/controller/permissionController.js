const { createPermission, deletePermission } = require('../service/permission.service');

const permissionCreate = async (req, res) => {
  try {
    const result = await createPermission(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const permissionDelete = async (req, res) => {
  try {
    const result = await deletePermission(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  permissionCreate,
  permissionDelete,
};
