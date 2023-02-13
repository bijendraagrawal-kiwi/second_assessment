const { createSubAdmin, subAdminLogin } = require('../service/subAdmin.service');

const createSubAdminController = async (req, res) => {
  try {
    const result = await createSubAdmin(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(403).send(err);
  }
};

const loginSubAdmin = async (req, res) => {
  try {
    const result = await subAdminLogin(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  createSubAdminController,
  loginSubAdmin,
};
