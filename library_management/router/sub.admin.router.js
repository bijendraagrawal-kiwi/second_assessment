const express = require('express');

const subAdmin = express.Router();
const { isAdmin } = require('../middleware/admin.validator');
const { createSubAdminController } = require('../controller/subAdminController');

subAdmin.post('/creatSubAdmin', isAdmin, createSubAdminController);
module.exports = {
  subAdmin,
};
