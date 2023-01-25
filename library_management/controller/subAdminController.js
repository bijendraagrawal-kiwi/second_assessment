const { createSubAdmin } = require('../service/subAdmin.service');
const constant = require('../constant/constant');

let result;
const createSubAdminController = async (req, res) => {
  try {
    if (res.locals.admin === false) {
      res.send(constant.NOT_ADMIN);
    } else {
      result = await createSubAdmin(req);
      res.send(result);
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createSubAdminController,
};
