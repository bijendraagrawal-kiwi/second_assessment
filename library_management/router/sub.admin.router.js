const express = require('express');

const subAdmin = express.Router();
const { isAdmin } = require('../middleware/admin.validator');
const { createSubAdminController, loginSubAdmin } = require('../controller/subAdminController');

subAdmin.post('/creatSubAdmin', isAdmin, createSubAdminController);
subAdmin.get('/loginsubadmin', loginSubAdmin);
module.exports = {
  subAdmin,
};
