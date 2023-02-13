const { createSubAdmin, subAdminLogin } = require('../service/subAdmin.service');

const createSubAdminController = async (req, res) => {
  try {
    const result = await createSubAdmin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const loginSubAdmin = async (req, res) => {
  try {
    const result = await subAdminLogin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createSubAdminController,
  loginSubAdmin,
};
